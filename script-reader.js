(function () {
  var previews = {
    'all-at-once': {title: '她一瞬过载', pages: 8},
    'expressers': {title: '海边有一栋倾斜的房子', pages: 8},
    'labyrinth': {title: '迷宫', pages: 13},
    'mammoth': {title: '猛犸', pages: 18},
    'narrow-gate': {title: '面向自我的陈述', pages: 6}
  };
  var links = document.querySelectorAll('[data-script-preview]');
  if (!links.length) return;
  var dialog = document.createElement('dialog');
  dialog.className = 'script-reader';
  dialog.id = 'scriptReader';
  dialog.setAttribute('aria-labelledby', 'scriptReaderTitle');
  dialog.innerHTML = '<header class="script-reader-head"><h2 id="scriptReaderTitle" class="script-reader-title"></h2><button type="button" class="script-reader-close" aria-label="收起试读，返回作品页面">收起试读 <span aria-hidden="true">×</span></button></header><div class="script-reader-pages" tabindex="0" aria-label="剧本试读页面，可滚动"><img class="script-reader-image" alt="" draggable="false"></div><footer class="script-reader-foot"><button type="button" class="script-reader-control" data-read-step="-1" aria-label="上一页">←</button><span class="script-reader-counter" aria-live="polite" aria-atomic="true"></span><button type="button" class="script-reader-control" data-read-step="1" aria-label="下一页">→</button><button type="button" class="script-reader-control script-reader-zoom" aria-pressed="false">放大</button><a class="script-reader-download" download>下载 PDF ↗</a></footer>';
  document.body.appendChild(dialog);
  var heading = dialog.querySelector('.script-reader-title');
  var viewport = dialog.querySelector('.script-reader-pages');
  var image = dialog.querySelector('.script-reader-image');
  var counter = dialog.querySelector('.script-reader-counter');
  var previous = dialog.querySelector('[data-read-step="-1"]');
  var next = dialog.querySelector('[data-read-step="1"]');
  var zoom = dialog.querySelector('.script-reader-zoom');
  var download = dialog.querySelector('.script-reader-download');
  var active = null;
  var opener = null;
  var page = 1;
  var closing = false;
  var closeRequested = false;
  var closeTimer = null;
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function keyFromURL() {
    var key = new URLSearchParams(location.hash.slice(1)).get('read');
    if (!key || !Object.prototype.hasOwnProperty.call(previews, key)) return null;
    return document.querySelector('[data-script-preview="' + key + '"]') ? key : null;
  }

  function showPage(value) {
    var preview = previews[active];
    page = Math.max(1, Math.min(preview.pages, value));
    image.src = 'assets/readings/' + active + '/' + String(page).padStart(2, '0') + '.webp';
    image.alt = preview.title + ' · 试读第 ' + page + ' 页';
    counter.textContent = page + ' / ' + preview.pages;
    previous.disabled = page === 1;
    next.disabled = page === preview.pages;
    viewport.scrollTop = 0;
    viewport.scrollLeft = 0;
  }

  function finishClose() {
    clearTimeout(closeTimer);
    closeTimer = null;
    closing = false;
    closeRequested = false;
    active = null;
    if (dialog.open) dialog.close();
    dialog.classList.remove('is-closing');
    document.documentElement.classList.remove('reader-open');
    if (opener && document.contains(opener)) opener.focus({preventScroll: true});
  }

  function hide() {
    if (!dialog.open || closing) return;
    closing = true;
    if (reducedMotion.matches) { finishClose(); return; }
    dialog.classList.add('is-closing');
    closeTimer = setTimeout(finishClose, 220);
  }

  function show(key) {
    clearTimeout(closeTimer);
    closeTimer = null;
    closing = false;
    closeRequested = false;
    dialog.classList.remove('is-closing');
    active = key;
    opener = document.querySelector('[data-script-preview="' + key + '"]');
    heading.textContent = previews[key].title + ' / 剧本试读';
    download.href = opener.getAttribute('data-script-pdf');
    viewport.classList.remove('is-zoomed');
    zoom.setAttribute('aria-pressed', 'false');
    zoom.textContent = '放大';
    showPage(1);
    document.documentElement.classList.add('reader-open');
    if (!dialog.open) dialog.showModal();
    dialog.querySelector('.script-reader-close').focus({preventScroll: true});
  }

  function restore() {
    var key = keyFromURL();
    if (key) {
      if (!dialog.open || closing || active !== key) show(key);
    } else hide();
  }

  function requestClose() {
    if (!dialog.open || closing || closeRequested) return;
    closeRequested = true;
    if (history.state && history.state.scriptReaderEntry) history.back();
    else {
      history.replaceState(history.state, '', location.pathname + location.search);
      hide();
    }
  }

  links.forEach(function (link) {
    link.addEventListener('click', function (event) {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (typeof dialog.showModal !== 'function') return;
      event.preventDefault();
      var key = link.getAttribute('data-script-preview');
      if (!Object.prototype.hasOwnProperty.call(previews, key)) return;
      history.pushState(Object.assign({}, history.state, {scriptReaderEntry: true}), '', '#read=' + encodeURIComponent(key));
      show(key);
    });
  });
  dialog.querySelector('.script-reader-close').addEventListener('click', requestClose);
  dialog.addEventListener('cancel', function (event) { event.preventDefault(); requestClose(); });
  dialog.addEventListener('click', function (event) {
    if (event.target !== dialog) return;
    var rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) requestClose();
  });
  dialog.addEventListener('animationend', function (event) {
    if (event.target === dialog && event.animationName === 'script-reader-out' && closing) finishClose();
  });
  previous.addEventListener('click', function () { if (active) showPage(page - 1); });
  next.addEventListener('click', function () { if (active) showPage(page + 1); });
  zoom.addEventListener('click', function () {
    var enlarged = viewport.classList.toggle('is-zoomed');
    zoom.setAttribute('aria-pressed', String(enlarged));
    zoom.textContent = enlarged ? '适宽' : '放大';
  });
  dialog.addEventListener('keydown', function (event) {
    if (!active || event.ctrlKey || event.metaKey || event.altKey) return;
    if (event.key === 'ArrowLeft') { event.preventDefault(); showPage(page - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); showPage(page + 1); }
  });
  window.addEventListener('popstate', restore);
  window.addEventListener('hashchange', restore);
  window.addEventListener('pageshow', restore);
  window.addEventListener('pagehide', finishClose);
  restore();
})();
