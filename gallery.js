(function () {
  'use strict';
  var galleries = document.querySelectorAll('[data-stills]');
  if (!galleries.length) return;
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var dialog = document.createElement('dialog');
  dialog.className = 'stills-lightbox';
  dialog.setAttribute('aria-labelledby', 'stills-viewer-title');
  dialog.innerHTML = '<div class="stills-lightbox-head"><h2 class="stills-lightbox-title" id="stills-viewer-title"></h2><button type="button" class="stills-close" autofocus aria-label="关闭剧照浏览">关闭 ×</button></div><img class="stills-lightbox-image" alt=""><div class="stills-lightbox-foot"><button type="button" class="stills-arrow" data-view-step="-1" aria-label="上一张剧照">←</button><span class="stills-lightbox-help">← → 切换 · Esc 关闭</span><span class="stills-counter" aria-live="polite" aria-atomic="true"></span><button type="button" class="stills-arrow" data-view-step="1" aria-label="下一张剧照">→</button></div>';
  document.body.appendChild(dialog);
  var viewer = null;
  var viewerIndex = 0;
  var savedOverflow = '';
  var opener = null;
  function number(n) { return String(n + 1).padStart(2, '0'); }
  function behavior(instant) { return instant || reducedMotion.matches ? 'auto' : 'smooth'; }
  function updateCounter(el, index, count, unit) {
    unit = unit || '张';
    el.textContent = number(index) + ' / ' + String(count).padStart(2, '0') + (unit === '组' ? ' 组' : '');
    el.setAttribute('aria-label', '第' + (index + 1) + unit + '，共' + count + unit);
  }
  function showViewer(index) {
    viewerIndex = (index + viewer.photos.length) % viewer.photos.length;
    var photo = viewer.photos[viewerIndex];
    var image = dialog.querySelector('.stills-lightbox-image');
    image.src = photo.href;
    image.alt = photo.querySelector('img').alt;
    updateCounter(dialog.querySelector('.stills-counter'), viewerIndex, viewer.photos.length);
  }
  dialog.querySelector('.stills-close').addEventListener('click', function () { dialog.close(); });
  dialog.querySelectorAll('[data-view-step]').forEach(function (button) {
    button.addEventListener('click', function () { showViewer(viewerIndex + Number(button.dataset.viewStep)); });
  });
  dialog.addEventListener('keydown', function (event) {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    event.stopPropagation();
    showViewer(viewerIndex + (event.key === 'ArrowRight' ? 1 : -1));
  });
  dialog.addEventListener('click', function (event) { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', function () {
    document.body.style.overflow = savedOverflow;
    if (viewer) viewer.select(viewerIndex, true);
    if (opener && !opener.hidden) opener.focus({ preventScroll: true });
    else if (viewer) viewer.photos[viewerIndex].focus({ preventScroll: true });
    dialog.querySelector('.stills-lightbox-image').removeAttribute('src');
    viewer = null;
  });
  function openViewer(gallery, index, source) {
    if (typeof dialog.showModal !== 'function') return false;
    viewer = gallery;
    opener = source;
    savedOverflow = document.body.style.overflow;
    dialog.querySelector('.stills-lightbox-title').textContent = gallery.title + ' · 剧照';
    showViewer(index);
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return true;
  }
  // Only horizontal, intentional gestures change a frame; vertical page scroll remains native.
  function swipe(element, previous, next) {
    var start = null;
    var suppressClickUntil = 0;
    element.addEventListener('touchstart', function (event) {
      start = event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null;
    }, { passive: true });
    element.addEventListener('touchend', function (event) {
      if (!start || !event.changedTouches.length) return;
      var dx = event.changedTouches[0].clientX - start.x;
      var dy = event.changedTouches[0].clientY - start.y;
      start = null;
      if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy) * 1.4) return;
      suppressClickUntil = Date.now() + 400;
      if (dx < 0) next(); else previous();
    }, { passive: true });
    element.addEventListener('touchcancel', function () { start = null; }, { passive: true });
    element.addEventListener('click', function (event) {
      if (Date.now() >= suppressClickUntil) return;
      event.preventDefault();
      event.stopPropagation();
    }, true);
  }
  swipe(dialog.querySelector('.stills-lightbox-image'), function () { if (viewer) showViewer(viewerIndex - 1); }, function () { if (viewer) showViewer(viewerIndex + 1); });
  dialog.querySelector('.stills-lightbox-image').style.touchAction = 'pan-y pinch-zoom';
  galleries.forEach(function (root) {
    var photos = Array.from(root.querySelectorAll('[data-photo]'));
    if (!photos.length) return;
    var current = 0;
    var mode = root.dataset.stills;
    var track = root.querySelector('[data-track]');
    var stage = root.querySelector('.stills-stage');
    var thumbs = Array.from(root.querySelectorAll('[data-select]'));
    var counter = root.querySelector('[data-counter]');
    var previous = root.querySelector('[data-step="-1"]');
    var next = root.querySelector('[data-step="1"]');
    var items = mode === 'stage' ? photos : Array.from(track.children);
    var gallery = { photos: photos, title: root.dataset.title, select: select };
    function controls() {
      if (counter) updateCounter(counter, current, mode === 'rooms' ? items.length : photos.length, mode === 'rooms' ? '组' : '张');
      if (previous) previous.disabled = current === 0;
      if (next) next.disabled = current === items.length - 1;
    }
    function alignThumb(index, instant) {
      var thumb = thumbs[index];
      if (!thumb) return;
      var parent = thumb.parentElement;
      if (parent.scrollWidth > parent.clientWidth) parent.scrollTo({ left: thumb.offsetLeft - parent.offsetLeft - (parent.clientWidth - thumb.offsetWidth) / 2, behavior: behavior(instant) });
    }
    function stageSelect(index, instant) {
      current = Math.max(0, Math.min(photos.length - 1, index));
      var refocus = photos.some(function (photo) { return photo === document.activeElement; });
      photos.forEach(function (photo, i) { photo.hidden = i !== current; });
      photos[current].querySelector('img').loading = 'eager';
      thumbs.forEach(function (thumb, i) { thumb.setAttribute('aria-pressed', String(i === current)); });
      alignThumb(current, instant);
      controls();
      if (refocus) photos[current].focus({ preventScroll: true });
    }
    function scrollSelect(index, instant) {
      current = Math.max(0, Math.min(items.length - 1, index));
      track.scrollTo({ left: items[current].offsetLeft - items[0].offsetLeft, behavior: behavior(instant) });
      controls();
    }
    function select(index, instant) {
      if (mode === 'stage') stageSelect(index, instant);
      else scrollSelect(mode === 'rooms' ? Math.floor(index / 2) : index, instant);
    }
    photos.forEach(function (photo, i) {
      photo.addEventListener('click', function (event) { if (openViewer(gallery, i, photo)) event.preventDefault(); });
    });
    root.querySelectorAll('.stills-tools').forEach(function (tools) { tools.hidden = false; });
    if (mode === 'stage') {
      stage.classList.add('is-enhanced');
      thumbs.forEach(function (thumb) { thumb.addEventListener('click', function () { stageSelect(Number(thumb.dataset.select), false); }); });
      root.querySelector('.stills-thumbs').hidden = false;
      stageSelect(0, true);
      swipe(stage, function () { stageSelect(current - 1, false); }, function () { stageSelect(current + 1, false); });
    } else {
      // Near the end, scrollLeft clamps before the last frame's start.
      function readPosition() {
        if (track.scrollWidth <= track.clientWidth + 1) current = 0;
        else if (track.scrollLeft >= track.scrollWidth - track.clientWidth - 2) current = items.length - 1;
        else {
          var closest = 0;
          var distance = Infinity;
          items.forEach(function (item, i) { var d = Math.abs(item.offsetLeft - items[0].offsetLeft - track.scrollLeft); if (d < distance) { closest = i; distance = d; } });
          current = closest;
        }
        controls();
      }
      var queued = false;
      track.addEventListener('scroll', function () {
        if (queued) return;
        queued = true;
        requestAnimationFrame(function () { queued = false; readPosition(); });
      }, { passive: true });
      window.addEventListener('resize', readPosition, { passive: true });
      readPosition();
    }
    function step(delta) {
      if (mode === 'stage') stageSelect(current + delta, false);
      else scrollSelect(current + delta, false);
    }
    if (previous) previous.addEventListener('click', function () { step(-1); });
    if (next) next.addEventListener('click', function () { step(1); });
    root.addEventListener('keydown', function (event) {
      if (event.altKey || event.ctrlKey || event.metaKey || (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight')) return;
      event.preventDefault();
      step(event.key === 'ArrowRight' ? 1 : -1);
    });
  });
})();
