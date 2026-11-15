/* ECHYOX / PR #6 — dynamic literary orbit, homepage entrance.
   No assets or full manuscripts. The already-curated 90 spans supply the words.
   The display remains usable if animation cannot run or is reduced. */
(function () {
  'use strict';
  var gate = document.getElementById('entryGate');
  var enter = document.getElementById('entryEnter');
  var home = document.querySelector('main.home');
  var header = document.querySelector('.site-head');
  if (!gate || !enter || !home) return;

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  // Optional local Safari performance readout: ?entry=1&perf=1
  // Never visible on the ordinary site without that query parameter.
  var perfMode = new URLSearchParams(window.location.search).get('perf') === '1';
  var perfPanel = null, perfStart = 0, perfFrames = 0;
  var perfCost = 0, perfMaxGap = 0, perfPreviousPaint = 0;
  if (perfMode) {
    perfPanel = document.createElement('div');
    perfPanel.setAttribute('aria-label', '主视觉流畅度检测');
    perfPanel.style.cssText = 'position:fixed;left:12px;bottom:12px;z-index:20;' +
      'pointer-events:none;padding:10px 12px;border:1px solid #555;' +
      'border-radius:8px;background:rgba(8,9,11,.93);color:#d9d5cf;' +
      'font:12px/1.6 monospace;white-space:pre;';
    perfPanel.textContent = '流畅度检测中…';
    gate.appendChild(perfPanel);
  }
  // A direct visit or reload of the homepage always starts at the literary gate.
  // Internal Home / Back links explicitly use #entry-revealed to skip the gate.
  // The brand's ?entry=1 link still opens the gate as before.
  var opening = false;
  var entered = false;
  var finishTimer = null;
  var cleanupTimer = null;
  var frameId = null;
  var lastPaint = 0;
  var startedAt = 0;
  var elapsed = 0;
  var canvas = null;
  var context = null;
  var cachedSpriteMode = '';
  var lastAvoidAt = null;
  var paintScale = 1; // Actual screen pixel ratio used by the canvas.
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
  // Rasterize Chinese strings once. Drawing cached sprites costs much less
  // than recomputing font shaping/layout for 90 texts every animation frame.
  function prepareSprites() {
    var small = viewportW < 700;
    // Use device-pixel-native glyphs on 3x phones; the former 1.75x
    // sprites were blurry when Safari resampled them to the screen.
    var scale = Math.min(window.devicePixelRatio || 1, small ? 3 : 2);
    var mode = (small ? 'mobile' : 'desktop') + '-' + scale;
    if (cachedSpriteMode === mode) return;
    cachedSpriteMode = mode;
    var fontFamily = '-apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif';
    bits.forEach(function (bit) {
      var size = small ? Math.max(15, Math.min(18, bit.size)) : bit.size;
      var spriteCanvas = document.createElement('canvas');
      var spriteContext = spriteCanvas.getContext && spriteCanvas.getContext('2d');
      if (!spriteContext) { bit.sprite = null; return; }
      spriteContext.font = '400 ' + size + 'px ' + fontFamily;
      var width = Math.ceil(spriteContext.measureText(bit.text).width + 10);
      var height = Math.ceil(size * 2.15 + 8);
      // Prevent pathologically large backing stores on small devices.
      width = Math.min(width, 1800);
      spriteCanvas.width = Math.ceil(width * scale);
      spriteCanvas.height = Math.ceil(height * scale);
      spriteContext.setTransform(scale, 0, 0, scale, 0, 0);
      spriteContext.font = '400 ' + size + 'px ' + fontFamily;
      spriteContext.fillStyle = bit.source === '诗歌' ? '#e0dacf' :
        bit.source === '剧本' ? '#d0c8bc' : '#c5c1b9';
      spriteContext.textAlign = 'center';
      spriteContext.textBaseline = 'middle';
      var glyph = spriteContext.measureText(bit.text);
      var glyphH = Number.isFinite(glyph.actualBoundingBoxAscent) &&
        Number.isFinite(glyph.actualBoundingBoxDescent) ?
        Math.max(size * 1.4, 2 * Math.max(Math.abs(glyph.actualBoundingBoxAscent),
          Math.abs(glyph.actualBoundingBoxDescent)) + 4) : height;
      spriteContext.fillText(bit.text, width * .5, height * .5, width - 8);
      bit.sprite = {canvas:spriteCanvas, width:width, height:height, size:size,
        glyphH:Math.min(height,glyphH)};
    });
  }

  function avoidOverlaps(items, smallScreen, dt, reset) {
    var limit = smallScreen ? 13 : 20, comfort = smallScreen ? 15 : 22;
    var gap = smallScreen ? 5 : 7, blend = reset ? 1 : 1 - Math.exp(-dt * 3.5);
    var i, k, a, b, dx, dy, force, sign;
    for (i=0;i<items.length;i++) items[i].push=0;
    // A small vertical drift, rather than hard position snaps or a rigid grid.
    for (i=0;i<items.length;i++) {
      a=items[i];
      if (a.alpha<.025) continue;
      for (k=i+1;k<items.length;k++) {
        b=items[k];
        if (b.alpha<.025) continue;
        dx=Math.abs(a.x-b.x)-(a.w+b.w)*.5;
        dy=Math.abs(a.y-b.y)-(a.h+b.h)*.5;
        if (dx>=comfort || dy>=comfort) continue;
        force=Math.min(limit,Math.max(0,(comfort-dy)*.27)) *
          smoothstep(comfort,0,dx);
        sign=a.y<b.y || (a.y===b.y && a.bit.index<b.bit.index) ? -1 : 1;
        a.push+=sign*force;
        b.push-=sign*force;
      }
    }
    for (i=0;i<items.length;i++) {
      a=items[i];
      var target=Math.max(-limit,Math.min(limit,a.push));
      a.bit.avoidY=(a.bit.avoidY||0)+(target-(a.bit.avoidY||0))*blend;
      a.y+=a.bit.avoidY;
    }
    // Fixed, well-distributed priority avoids alternating winners each frame.
    // The softer outer band fades approaching phrases before their glyph boxes meet.
    items.sort(function(a,b){return a.bit.index*37%97-b.bit.index*37%97;});
    var accepted=[];
    for (i=0;i<items.length;i++) {
      a=items[i];
      var factor=1;
      for(k=0;k<accepted.length;k++) {
        b=accepted[k];
        dx=Math.abs(a.x-b.x)-(a.w+b.w)*.5;
        dy=Math.abs(a.y-b.y)-(a.h+b.h)*.5;
        factor=Math.min(factor,smoothstep(gap,comfort,Math.max(dx,dy)));
        if(factor===0) break;
      }
      // Suppress immediately if necessary; recover gently when space returns.
      var previous=reset ? factor : (a.bit.avoidAlpha==null ? 0 : a.bit.avoidAlpha);
      a.bit.avoidAlpha=Math.min(factor,previous+dt*1.5);
      a.alpha*=a.bit.avoidAlpha;
      // Reserve faint emerging phrases too, before the ordinary draw threshold.
      if(a.alpha>=.003) accepted.push(a);
    }
    return accepted;
  }

  // The reduced-motion / canvas-unavailable composition gets a single measured
  // non-overlapping layout too. Never delete the underlying literary spans.
  function layoutStillField() {
    var occupied = [];
    var center = gate.querySelector('.entry-content');
    if (center) occupied.push(center.getBoundingClientRect());
    var controls = gate.querySelector('.entry-theme-controls');
    if (controls) occupied.push(controls.getBoundingClientRect());
    bits.forEach(function(bit){bit.el.style.removeProperty('visibility');});
    var entries = bits.map(function(bit){
      var rect = bit.el.getBoundingClientRect();
      if (!rect.width || !rect.height) return null;
      // Include the actual unwrapped text (which can exceed max-width).
      var range = document.createRange();
      range.selectNodeContents(bit.el);
      var glyph = range.getBoundingClientRect();
      return {bit:bit,rect:glyph.width ? glyph : rect};
    });
    entries.forEach(function(item){
      if (!item) return;
      var r=item.rect, pad=6;
      if(r.right<=0 || r.bottom<=0 || r.left>=viewportW || r.top>=viewportH) return;
      if(occupied.some(function(o){
        return r.left<o.right+pad && r.right>o.left-pad &&
          r.top<o.bottom+pad && r.bottom>o.top-pad;
      })) item.bit.el.style.visibility='hidden';
      else occupied.push(r);
    });
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
    var candidates = [], reset = lastAvoidAt === null;
    var dt = reset ? 0 : Math.max(0, Math.min(.11, seconds - lastAvoidAt));
    lastAvoidAt = seconds;
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
      if (alpha < .003) { bit.avoidAlpha=0; return; }
      var w, h;
      if (bit.sprite) { w=bit.sprite.width; h=bit.sprite.glyphH; }
      else {
        context.font='400 '+bit.size+'px sans-serif';
        w=Math.min(viewportW*.9,context.measureText(bit.text).width)+10;
        h=bit.size*2.15+8;
      }
      // Ignore completely offscreen candidates, not just their center points.
      if(x+w*.5<0 || x-w*.5>viewportW || y+h*.5<0 || y-h*.5>viewportH) {
        bit.avoidAlpha=0; return;
      }
      candidates.push({bit:bit,x:x,y:y,w:w,h:h,alpha:alpha});
    });
    avoidOverlaps(candidates,smallScreen,dt,reset).forEach(function(item){
      var bit=item.bit, x=item.x, y=item.y, alpha=item.alpha;
      if(alpha<.018) return;
      context.globalAlpha = alpha;
      context.save();
      // Snap animated glyphs to physical mobile pixels; subpixel sprite
      // resampling made otherwise high-resolution Chinese text look soft.
      if (smallScreen) {
        x = Math.round(x * paintScale) / paintScale;
        y = Math.round(y * paintScale) / paintScale;
      }
      context.translate(x, y);
      // Rotating and re-scaling already rasterized Chinese glyphs blurred
      // their edges. Breathe with opacity instead, preserving crisp outlines.
      if (bit.sprite) {
        context.drawImage(bit.sprite.canvas, -bit.sprite.width * .5,
          -bit.sprite.height * .5, bit.sprite.width, bit.sprite.height);
      } else {
        // Support browsers that don't allow offscreen sprite creation.
        context.fillStyle = '#d0c8bc';
        context.font = '400 ' + bit.size + 'px sans-serif';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(bit.text, 0, 0, viewportW * .9);
      }
      context.restore();
    });
    context.globalAlpha = 1;
  }

  function resizeCanvas() {
    viewportW = Math.max(1, window.innerWidth);
    viewportH = Math.max(1, window.innerHeight);
    lastAvoidAt = null;
    bits.forEach(function(bit){bit.avoidY=0; bit.avoidAlpha=null;});
    if (!canvas || !context || reduced.matches) layoutStillField();
    if (!canvas || !context) return;
    // Match 3x mobile Retina when supported. Keep the existing 2x desktop
    // cap; do not change animation cadence or entrance transitions.
    var scale = Math.min(window.devicePixelRatio || 1, viewportW < 700 ? 3 : 2);
    paintScale = scale;
    canvas.width = Math.round(viewportW * scale);
    canvas.height = Math.round(viewportH * scale);
    canvas.style.width = viewportW + 'px';
    canvas.style.height = viewportH + 'px';
    context.setTransform(scale, 0, 0, scale, 0, 0);
    prepareSprites();
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
    // Avoid the artificial 30fps stutter on a 60/120Hz desktop display.
    // Draw in sync with the monitor (capped near 60fps on desktop);
    // keep a gentler ~30fps cap on phones for battery/performance.
    var minGap = viewportW < 700 ? 32 : 15;
    if (!lastPaint || now - lastPaint >= minGap) {
      var clock = window.performance && window.performance.now ?
        function () { return window.performance.now(); } : function () { return now; };
      var started = perfMode ? clock() : 0;
      paint(elapsed);
      if (perfMode) {
        var cost = Math.max(0, clock() - started);
        if (!perfStart) perfStart = now;
        if (perfPreviousPaint) perfMaxGap = Math.max(perfMaxGap, now - perfPreviousPaint);
        perfPreviousPaint = now;
        perfFrames++;
        perfCost += cost;
        if (now - perfStart >= 1600) {
          var fps = Math.round(perfFrames * 1000 / (now - perfStart));
          perfPanel.textContent = '主视觉 FPS: ' + fps +
            '\n绘制耗时: ' + (perfCost / perfFrames).toFixed(1) + ' ms/帧' +
            '\n最长帧间隔: ' + Math.round(perfMaxGap) + ' ms';
          perfFrames = 0; perfCost = 0;
          perfMaxGap = 0; perfStart = now;
        }
      }
      lastPaint = now;
    }
    frameId = requestAnimationFrame(tick);
  }
  function startMotion() {
    if (entered || gate.hidden || document.hidden || opening || reduced.matches) return;
    prepareCanvas();
    if (!context) { layoutStillField(); return; } // Static HTML field remains visible.
    if (canvas) canvas.hidden = false;
    gate.classList.add('entry-motion-ready');
    paint(elapsed);
    if (frameId === null) {
      startedAt = 0;
      frameId = requestAnimationFrame(tick);
    }
  }
  function finishGateCleanup() {
    if (gate.hidden) return;
    // By this point the visitor has had time to see and interact with the
    // four sections. Retire the large Retina canvas outside the reveal frame.
    gate.hidden = true;
    gate.classList.remove('is-entering');
    document.body.classList.add('entry-passed');
    gate.style.removeProperty('pointer-events');
  }
  function scheduleGateCleanup() {
    if (cleanupTimer !== null) clearTimeout(cleanupTimer);
    // Wait beyond the 2.35s fade, then release the full-screen texture only
    // when the browser has spare time; never block the final transition frame.
    cleanupTimer = setTimeout(function () {
      cleanupTimer = null;
      if (window.requestIdleCallback) {
        window.requestIdleCallback(finishGateCleanup, { timeout: 3000 });
      } else {
        setTimeout(finishGateCleanup, 300);
      }
    }, 750);
  }
  function reveal(moveFocus, fromAnimation) {
    if (entered) return;
    if (finishTimer !== null) clearTimeout(finishTimer);
    finishTimer = null;
    var deferHeavyCleanup = Boolean(fromAnimation && opening && !reduced.matches);
    entered = true;
    opening = false;
    stopMotion();
    // The entry's 2.35s home fade has finished. Prevent iPhone Safari
    // from starting the global 800ms arrival animation again when the
    // entry-opening class is removed (which briefly flashes the cards).
    if (deferHeavyCleanup) document.body.classList.add('entry-gate-finished');
    // Make the main content interactive without simultaneously tearing down
    // the full-screen Canvas. The invisible curtain stays composited briefly.
    behindGate(false);
    document.body.classList.remove('entry-opening');
    gate.inert = true;
    gate.setAttribute('aria-hidden', 'true');
    if (deferHeavyCleanup) scheduleGateCleanup();
    else finishGateCleanup();
    if (moveFocus) {
      // Move focus to the page landmark, never auto-select Theatre.
      home.focus({ preventScroll: true });
    }
  }

  if (location.hash === '#entry-revealed') {
    reveal(false);
  } else {
    behindGate(true);
    if (reduced.matches) layoutStillField();
    else startMotion();
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
    finishTimer = setTimeout(function () { reveal(true, true); }, 2750);
  });
  gate.addEventListener('animationend', function (event) {
    if (opening && event.target === gate && event.animationName === 'entry-gate-leave') reveal(true, true);
  });
  gate.addEventListener('animationcancel', function (event) {
    if (opening && event.target === gate) reveal(true, true);
  });
  window.addEventListener('hashchange', function () {
    if (location.hash === '#entry-revealed') reveal(false);
  });
  window.addEventListener('pageshow', function () {
    if (location.hash === '#entry-revealed') reveal(false);
    else if (!entered && !gate.hidden) startMotion();
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
        layoutStillField();
      }
    } else if (!gate.hidden) {
      if (canvas) canvas.hidden = false;
      lastAvoidAt = null;
      startMotion();
    }
  }
  if (reduced.addEventListener) reduced.addEventListener('change', updateMotion);
  else if (reduced.addListener) reduced.addListener(updateMotion);
})();
