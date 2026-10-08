/* ECHYOX / PR #6 — dynamic literary orbit, homepage entrance.
   No assets or full manuscripts. The already-curated 70 spans supply the words.
   The display remains usable if animation cannot run or is reduced. */
(function () {
  'use strict';
  var gate = document.getElementById('entryGate');
  var enter = document.getElementById('entryEnter');
  var home = document.querySelector('main.home');
  var header = document.querySelector('.site-head');
  if (!gate || !enter || !home) return;

  var key = 'echyox-entry-opened-v1';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  // The brand wordmark uses this query to *deliberately* revisit the opening,
  // even after someone has entered during the same browser session.
  var forceIntro = new URLSearchParams(window.location.search).get('entry') === '1';
  var opening = false;
  var finishTimer = null;
  var frameId = null;
  var previousFrame = 0;
  var lastPaint = 0;
  var elapsed = 0;
  var viewportW = Math.max(1, window.innerWidth);
  var viewportH = Math.max(1, window.innerHeight);
  var bits = Array.prototype.map.call(gate.querySelectorAll('.entry-bit'), function (el) {
    return {
      el: el,
      radius: Number(el.dataset.radius) || .6,
      angle: Number(el.dataset.angle) || 0,
      ecc: Number(el.dataset.ecc) || 1,
      cycle: Number(el.dataset.cycle) || 160,
      phase: Number(el.dataset.phase) || 0,
      wave: Number(el.dataset.wave) || 0,
      direction: el.dataset.dir === 'ccw' ? -1 : 1,
      alpha: Number(el.style.getPropertyValue('--alpha')) || .48
    };
  });

  function remember() {
    try { return window.sessionStorage.getItem(key) === 'yes'; }
    catch (error) { return false; }
  }
  function save() {
    try { window.sessionStorage.setItem(key, 'yes'); }
    catch (error) { /* Session storage may be disabled. The link still works. */ }
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
  function smoothstep(a, b, n) {
    var x = Math.max(0, Math.min(1, (n - a) / (b - a)));
    return x * x * (3 - 2 * x);
  }
  function render(seconds) {
    // One full-screen elliptical galaxy; each word has its own direction,
    // orbital period, eccentricity and radius/angle oscillations.
    var cx = viewportW * .5;
    var cy = viewportH * .5;
    // Expand the galaxy beyond the old central cluster; text may visit the edges.
    // On small phones leave room for the central title while retaining broad paths.
    var xScale = viewportW * (viewportW < 700 ? .45 : .475);
    var yScale = viewportH * (viewportW < 700 ? .46 : .52);
    var outerX = Math.max(1, viewportW * .49);
    var outerY = Math.max(1, viewportH * .49);
    bits.forEach(function (bit) {
      var a = bit.angle + bit.direction * (seconds * Math.PI * 2 / bit.cycle)
        + .095 * Math.sin(seconds / 9.8 + bit.phase)
        + .045 * Math.cos(seconds / 5.6 + bit.wave);
      var r = bit.radius * (1 + .053 * Math.sin(seconds / 12.3 + bit.phase)
        + .035 * Math.sin(seconds / 22.8 + bit.wave));
      var eccentricity = bit.ecc + .055 * Math.sin(seconds / 18 + bit.wave);
      var x = cx + Math.cos(a) * xScale * r * eccentricity;
      var y = cy + Math.sin(a) * yScale * r / eccentricity;
      var d = Math.hypot((x - cx) / outerX, (y - cy) / outerY);

      // Brightest in the orbital belt; dim at screen edges and at the central sun.
      // Unlike a fixed vignette this changes as each individual word moves.
      var innerLight = smoothstep(.43, .70, d);
      var outerLight = 1 - smoothstep(.76, 1.26, d);
      // Separate slow light breathing from orbital travel, not a generic flash.
      var breathing = .84 + .16 * Math.sin(seconds / 5.2 + bit.phase);
      var opacity = bit.alpha * innerLight * outerLight * breathing;
      var tilt = 2.8 * Math.sin(seconds / 15 + bit.wave);
      var scale = 1 + .045 * Math.sin(seconds / 6.7 + bit.phase);

      // Center the *word*, not just its left edge, on the computed orbit.
      // This keeps long phrases out of the sun/core when rotating past it.
      bit.el.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' +
        y.toFixed(1) + 'px,0) translate(-50%,-50%) rotate(' + tilt.toFixed(2) +
        'deg) scale(' + scale.toFixed(3) + ')';
      bit.el.style.opacity = Math.max(0, Math.min(.72, opacity)).toFixed(3);
    });
  }

  function stopMotion() {
    if (frameId !== null) cancelAnimationFrame(frameId);
    frameId = null;
    previousFrame = 0;
    lastPaint = 0;
  }
  function tick(now) {
    frameId = null;
    if (gate.hidden || reduced.matches || document.hidden) return;
    if (previousFrame) elapsed += Math.min((now - previousFrame) / 1000, .1);
    previousFrame = now;
    // Orbit movement is deliberately slow; cap DOM paint updates near 30fps.
    if (!lastPaint || now - lastPaint >= 32) {
      render(elapsed);
      lastPaint = now;
    }
    frameId = requestAnimationFrame(tick);
  }
  function startMotion() {
    if (gate.hidden || document.hidden) return;
    gate.classList.add('entry-motion-ready');
    render(reduced.matches ? 0 : elapsed);
    if (!reduced.matches && frameId === null) {
      previousFrame = 0;
      frameId = requestAnimationFrame(tick);
    }
  }
  function reveal(moveFocus) {
    if (finishTimer !== null) clearTimeout(finishTimer);
    finishTimer = null;
    opening = false;
    stopMotion();
    document.body.classList.add('entry-passed');
    document.body.classList.remove('entry-opening');
    gate.classList.remove('is-entering');
    gate.hidden = true;
    behindGate(false);
    save();
    if (moveFocus) {
      // Focus the region, not the Theatre card (which caused Safari's blue outline).
      home.focus({ preventScroll: true });
    }
  }

  if (location.hash === '#entry-revealed' || (!forceIntro && remember())) {
    reveal(false);
  } else {
    behindGate(true);
    startMotion();
  }

  enter.addEventListener('click', function (event) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (opening || gate.hidden) return;
    if (reduced.matches) { reveal(true); return; }
    opening = true;
    gate.classList.add('is-entering');
    document.body.classList.add('entry-opening');
    // Works even when CSS animations are blocked, cancelled or interrupted.
    finishTimer = setTimeout(function () { reveal(true); }, 2750);
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
    if (!forceIntro && remember()) reveal(false);
    else if (!gate.hidden) startMotion();
  });
  window.addEventListener('resize', function () {
    viewportW = Math.max(1, window.innerWidth);
    viewportH = Math.max(1, window.innerHeight);
    if (!gate.hidden) render(reduced.matches ? 0 : elapsed);
  }, { passive: true });
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) stopMotion();
    else if (!gate.hidden) startMotion();
  });
  function updateMotion() {
    if (reduced.matches) {
      stopMotion();
      if (opening) reveal(true);
      else if (!gate.hidden) render(0);
    } else if (!gate.hidden) {
      startMotion();
    }
  }
  if (reduced.addEventListener) reduced.addEventListener('change', updateMotion);
  else if (reduced.addListener) reduced.addListener(updateMotion);
})();
