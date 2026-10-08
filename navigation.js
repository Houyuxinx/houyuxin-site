/* ECHYOX: a single, dark cross-page fade instead of the old stage-light sweep.
   1.12s outgoing + 1.23s incoming = approx. 2.35s in normal loading.
   Native navigation remains the fallback for non-HTML links / failed scripts. */
(function () {
  'use strict';
  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var active = false;
  var arriveStarted = false;
  var navigationTimer = null;
  root.classList.add('site-fade-enabled', 'site-fade-initial');

  function beginArrival(force) {
    if (reduce.matches) {
      root.classList.remove('site-fade-initial','site-fade-arriving','site-fade-leaving');
      active = false;
      arriveStarted = true;
      return;
    }
    if (arriveStarted && !force) return;
    active = false;
    arriveStarted = true;
    root.removeAttribute('data-page-destination');
    if (navigationTimer !== null) clearTimeout(navigationTimer);
    navigationTimer = null;
    root.classList.remove('site-fade-leaving','site-fade-arriving');
    root.classList.add('site-fade-initial');
    // Separate the new document's initial opaque frame from its soft reveal.
    requestAnimationFrame(function () {
      root.classList.remove('site-fade-initial');
      root.classList.add('site-fade-arriving');
    });
  }

  // HEAD: set up the opaque arrival curtain before BODY is parsed.
  document.addEventListener('DOMContentLoaded', function () {
    beginArrival(false);
  }, {once:true});

  window.addEventListener('pageshow', function (event) {
    if (event.persisted) beginArrival(true); // back-forward cache restoration
    else beginArrival(false);
  });

  function localDocumentLink(link) {
    if (link.hasAttribute('download')) return null;
    var target = link.getAttribute('target');
    if (target && target !== '_self') return null;
    var href = link.getAttribute('href');
    if (!href || /^\s*(?:#|javascript:|mailto:|tel:|data:)/i.test(href)) return null;
    var url;
    try { url = new URL(link.href, window.location.href); }
    catch (err) { return null; }
    var here = window.location;
    if (url.protocol !== here.protocol) return null;
    // For file:// ZIP previews, URLs are local. In published HTTPS, require same origin.
    if (url.protocol !== 'file:' && url.origin !== here.origin) return null;
    if (!(/\.html?$/i.test(url.pathname) || /\/$/.test(url.pathname))) return null;
    if (url.pathname === here.pathname && url.search === here.search && url.hash) return null;
    if (url.href === here.href) return null;
    return url;
  }

  document.addEventListener('click', function (event) {
    if (event.defaultPrevented || active || reduce.matches) return;
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    var target = event.target && (event.target.closest ? event.target : event.target.parentElement);
    var link = target && target.closest ? target.closest('a[href]') : null;
    if (!link || link.hasAttribute('data-no-page-fade')) return;
    var url = localDocumentLink(link);
    if (!url) return;
    event.preventDefault();
    active = true;
    root.classList.remove('site-fade-arriving','site-fade-initial');
    root.classList.add('site-fade-leaving');
    root.setAttribute('data-page-destination',url.href);
    // Navigation doesn't depend on animationend or CSS being supported.
    navigationTimer = setTimeout(function () {
      window.location.assign(url.href);
    }, 1120);
  });

  window.addEventListener('pagehide', function () {
    if (navigationTimer !== null) clearTimeout(navigationTimer);
    navigationTimer = null;
  });

  function changedPreference() {
    if (!reduce.matches) return;
    if (active && navigationTimer !== null) {
      // Disabling effects during a leave should not swallow the requested navigation.
      clearTimeout(navigationTimer);
      navigationTimer = null;
      var outgoing = root.getAttribute('data-page-destination');
      if (outgoing) window.location.assign(outgoing);
    }
    root.classList.remove('site-fade-initial','site-fade-arriving','site-fade-leaving');
  }
  if (reduce.addEventListener) reduce.addEventListener('change', changedPreference);
  else if (reduce.addListener) reduce.addListener(changedPreference);
})();