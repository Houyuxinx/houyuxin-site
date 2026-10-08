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
  var lastPaint = 0;
  var startedAt = 0;
  var elapsed = 0;
  var canvas = null;
  var context = null;
  var viewportW = Math.max(1, window.innerWidth);
  var viewportH = Math.max(1, window.innerHeight);
  var bits = Array.prototype.map.call(gate.querySelectorAll('.entry-bit'), function (el, index) {
    function variable(name, fallback) {
      var n = parseFloat(el.style.getPropertyValue(name));
      return Number.isFinite(n) ? n : fallback;
    }
    return {
      el: el,
      text: el.textContent || '',
      source: el.dataset.source || '',
      index: index,
      x: variable('--x', 50) / 100,
      y: variable('--y', 50) / 100,
      size: variable('--size', 16),
      alpha: variable('--alpha', .45),
      phase: variable('--x', 5) * .17 + index * 1.618,
      wave: variable('--y', 3) * .11 + index * 2.3999,
      rangeX: (58 + (index * 37 % 107)),
      rangeY: (29 + (index * 23 % 72))
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
  function paint(seconds) {
    if (!context || !canvas) return;
    // A single Canvas paint avoids transforming and changing opacity on 90 DOM
    // elements every frame. These spans remain the accessible, static fallback.
    context.clearRect(0, 0, viewportW, viewportH);
    var cx = viewportW * .5, cy = viewportH * .5;
    var outerX = Math.max(1, viewportW * .49);
    var outerY = Math.max(1, viewportH * .49);
    var smallScreen = viewportW < 700;
    var font = '-apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif';
    bits.forEach(function (bit) {
      if (smallScreen && bit.index % 3 === 0) return;
      var p = bit.phase, q = bit.wave, t = seconds;
      // Quasiperiodic motion: independent bent currents, not a closed orbit.
      // Each text changes direction gently as the different waves intersect.
      var x = bit.x * viewportW
        + bit.rangeX * (Math.sin(t / 30 + p) - Math.sin(p))
        + bit.rangeX * .36 * (Math.sin(t / 12.4 + q) - Math.sin(q))
        + 13 * (Math.sin(t / 7.9 + bit.index) - Math.sin(bit.index));
      var y = bit.y * viewportH
        + bit.rangeY * (Math.sin(t / 23.3 + q) - Math.sin(q))
        + bit.rangeY * .44 * (Math.cos(t / 13.8 + p) - Math.cos(p))
        + 11 * (Math.sin(t / 9.1 + bit.index * 1.3) - Math.sin(bit.index * 1.3));
      var d = Math.hypot((x - cx) / outerX, (y - cy) / outerY);
      var nearCore = smoothstep(.42, .71, d);
      var outerFade = 1 - smoothstep(.75, 1.24, d);
      var edge = Math.min(x / viewportW, 1 - x / viewportW, y / viewportH, 1 - y / viewportH);
      var edgeFade = smoothstep(-.10, .21, edge);
      var breathing = .81 + .19 * Math.sin(t / 5.8 + p);
      var alpha = Math.max(0, Math.min(.74, bit.alpha * nearCore * outerFade * edgeFade * breathing));
      if (alpha < .018) return;
      var size = (smallScreen ? Math.min(15, bit.size * .78) : bit.size)
        * (1 + .034 * Math.sin(t / 6.1 + q));
      context.globalAlpha = alpha;
      context.fillStyle = bit.source === '诗歌' ? '#e0dacf' :
        bit.source === '剧本' ? '#d0c8bc' : '#c5c1b9';
      context.font = '400 ' + size.toFixed(2) + 'px ' + font;
      context.save();
      context.translate(x, y);
      context.rotate(.025 * Math.sin(t / 17 + p));
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(bit.text, 0, 0, viewportW * .9);
      context.restore();
    });
    context.globalAlpha = 1;
  }

  function resizeCanvas() {
    viewportW = Math.max(1, window.innerWidth);
    viewportH = Math.max(1, window.innerHeight);
    if (!canvas || !context) return;
    var scale = Math.min(window.devicePixelRatio || 1, viewportW < 700 ? 1.1 : 1.4);
    canvas.width = Math.round(viewportW * scale);
    canvas.height = Math.round(viewportH * scale);
    canvas.style.width = viewportW + 'px';
    canvas.style.height = viewportH + 'px';
    context.setTransform(scale, 0, 0, scale, 0, 0);
    if (!gate.hidden && reduced.matches === false) paint(elapsed);
  }

  function prepareCanvas() {
    if (reduced.matches || canvas) return;
    var art = gate.querySelector('.entry-art');
    if (!art || !document.createElement) return;
    var candidate = document.createElement('canvas');
    if (!candidate.getContext) return;
    var ctx = candidate.getContext('2d', { alpha:true, desynchronized:true });
    if (!ctx) return;
    candidate.className = 'entry-canvas';
    candidate.setAttribute('aria-hidden', 'true');
    art.appendChild(candidate);
    canvas = candidate;
    context = ctx;
    resizeCanvas();
    gate.classList.add('entry-motion-ready');
  }

  function stopMotion() {
    if (frameId !== null) cancelAnimationFrame(frameId);
    frameId = null;
    startedAt = 0;
    lastPaint = 0;
  }
  function tick(now) {
    frameId = null;
    if (gate.hidden || reduced.matches || document.hidden || opening) return;
    if (startedAt) elapsed += Math.min((now - startedAt) / 1000, .11);
    startedAt = now;
    // Limit canvas paints to ~24fps; the movement itself is deliberately slow.
    if (!lastPaint || now - lastPaint >= 42) {
      paint(elapsed);
      lastPaint = now;
    }
    frameId = requestAnimationFrame(tick);
  }
  function startMotion() {
    if (gate.hidden || document.hidden || opening || reduced.matches) return;
    prepareCanvas();
    if (!context) return; // Static HTML field remains visible.
    paint(elapsed);
    if (frameId === null) {
      startedAt = 0;
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
    stopMotion(); // Freeze the text before the full-screen exit to avoid two paint loops.
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
    resizeCanvas();
  }, { passive: true });
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) stopMotion();
    else if (!gate.hidden) startMotion();
  });
  function updateMotion() {
    if (reduced.matches) {
      stopMotion();
      if (opening) reveal(true);
      else if (!gate.hidden) {
        gate.classList.remove('entry-motion-ready');
        if (canvas) canvas.hidden = true;
      }
    } else if (!gate.hidden) {
      if (canvas) canvas.hidden = false;
      startMotion();
    }
  }
  if (reduced.addEventListener) reduced.addEventListener('change', updateMotion);
  else if (reduced.addListener) reduced.addListener(updateMotion);
})();
