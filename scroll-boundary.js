/* ECHYOX: a viewport boundary for the existing document scroll.
   The gradient is static; only one clipping edge follows scroll/viewport
   changes. Do not change individual reveal animations, audio or dialogs. */
(function () {
  'use strict';
  var header = document.querySelector('.site-head');
  var main = document.querySelector('main');
  if (!header || !main) return;

  var years = document.getElementById('poetryYears');
  var fade = document.createElement('div');
  fade.className = 'nav-fade';
  fade.setAttribute('aria-hidden', 'true');
  main.appendChild(fade);
  main.classList.add('has-scroll-boundary');

  var frame = null;
  var lastClip = '';
  var lastFade = '';
  var lastStrength = '';
  function update() {
    frame = null;
    var headerBottom = header.getBoundingClientRect().bottom;
    var mainTop = main.getBoundingClientRect().top;
    // Clip in the main element's coordinates. This also prevents content
    // above the navigation from painting into Safari's upper browser area.
    var clipTop = Math.max(0, Math.ceil(headerBottom - mainTop)) + 'px';
    var fadeTop = headerBottom;
    if (years && !years.hidden && years.getClientRects().length) {
      var rail = years.getBoundingClientRect();
      // The year rail stays readable above the gradient (z-index 5).
      // Once pinned, place the content fade below the rail instead.
      if (rail.top <= headerBottom + 1 && rail.bottom > headerBottom) {
        fadeTop = rail.bottom;
      }
    }
    var fadeValue = Math.round(fadeTop * 100) / 100 + 'px';
    // Preserve the untouched first frame (notably the homepage card border).
    // The strip reaches full strength during the first short scroll distance.
    var fadeHeight = fade.getBoundingClientRect().height || 32;
    var strength = Math.min(1, Math.max(0, -mainTop / fadeHeight)).toFixed(3);
    if (clipTop !== lastClip) {
      main.style.setProperty('--content-clip-top', clipTop);
      lastClip = clipTop;
    }
    if (fadeValue !== lastFade) {
      main.style.setProperty('--nav-fade-top', fadeValue);
      lastFade = fadeValue;
    }
    if (strength !== lastStrength) {
      main.style.setProperty('--nav-fade-strength', strength);
      lastStrength = strength;
    }
  }
  function schedule() {
    if (frame === null) frame = window.requestAnimationFrame(update);
  }
  update();
  window.addEventListener('scroll', schedule, {passive: true});
  window.addEventListener('resize', schedule, {passive: true});
  window.addEventListener('orientationchange', schedule, {passive: true});
  window.addEventListener('pageshow', schedule);
  window.addEventListener('load', schedule);
  window.addEventListener('pagehide', function () {
    if (frame !== null) window.cancelAnimationFrame(frame);
    frame = null;
  });
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', schedule, {passive: true});
    window.visualViewport.addEventListener('scroll', schedule, {passive: true});
  }
  if (window.ResizeObserver) {
    var sizes = new window.ResizeObserver(schedule);
    sizes.observe(header);
    sizes.observe(main);
    if (years) sizes.observe(years);
  }
  // Poetry reveals its rail after site.js; refresh when it becomes visible.
  if (years && window.MutationObserver) {
    var railVisibility = new window.MutationObserver(schedule);
    railVisibility.observe(years, {attributes: true, attributeFilter: ['hidden']});
  }
})();
