/* PR #6: preserve the existing gate, anchor fallback and session continuity.
   The text itself is static HTML; only three CSS layers drift slowly. */
(function () {
  'use strict';
  var gate = document.getElementById('entryGate');
  var enter = document.getElementById('entryEnter');
  var home = document.querySelector('main.home');
  var header = document.querySelector('.site-head');
  if (!gate || !enter || !home) return;
  var key = 'echyox-entry-opened-v1';
  var motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var opening = false;
  var finishTimer = null;

  function remembered() {
    try { return window.sessionStorage.getItem(key) === 'yes'; }
    catch (error) { return false; }
  }
  function save() {
    try { window.sessionStorage.setItem(key, 'yes'); }
    catch (error) { /* Session storage can be blocked. The link still works. */ }
  }
  function behindGate(blocked) {
    home.inert = blocked;
    if (header) header.inert = blocked;
    document.body.classList.toggle('entry-active', blocked);
    document.documentElement.classList.toggle('entry-active', blocked);
    if (blocked) {
      home.setAttribute('aria-hidden', 'true');
      if (header) header.setAttribute('aria-hidden', 'true');
    } else {
      home.removeAttribute('aria-hidden');
      if (header) header.removeAttribute('aria-hidden');
    }
  }
  function reveal(moveFocus) {
    if (finishTimer !== null) clearTimeout(finishTimer);
    finishTimer = null;
    opening = false;
    document.body.classList.add('entry-passed');
    document.body.classList.remove('entry-opening', 'entry-paused');
    gate.classList.remove('is-entering');
    gate.hidden = true;
    behindGate(false);
    save();
    if (moveFocus) {
      // Focus the landmark, not the Theatre link. Safari's default focus ring
      // otherwise looked like a blue "selected" border on the first card.
      home.focus({ preventScroll: true });
    }
  }
  if (location.hash === '#entry-revealed' || remembered()) {
    reveal(false);
  } else {
    behindGate(true);
  }
  enter.addEventListener('click', function (event) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (opening || gate.hidden) return;
    if (motion.matches) { reveal(true); return; }
    opening = true;
    gate.classList.add('is-entering');
    document.body.classList.add('entry-opening');
    // Disabled/interrupted CSS or a hidden tab must never leave the home inert.
    finishTimer = setTimeout(function () { reveal(true); }, 2250);
  });
  gate.addEventListener('animationend', function (event) {
    if (opening && event.target === gate && event.animationName === 'entry-gate-leave') reveal(true);
  });
  gate.addEventListener('animationcancel', function (event) {
    if (opening && event.target === gate) reveal(true);
  });
  window.addEventListener('hashchange', function () {
    if (location.hash === '#entry-revealed') reveal(false);
  });
  window.addEventListener('pageshow', function () {
    if (remembered()) reveal(false);
  });
  document.addEventListener('visibilitychange', function () {
    document.body.classList.toggle('entry-paused', document.visibilityState === 'hidden' && !gate.hidden);
  });
  function updateMotion() {
    if (motion.matches && opening) reveal(true);
  }
  if (motion.addEventListener) motion.addEventListener('change', updateMotion);
  else if (motion.addListener) motion.addListener(updateMotion);
})();
