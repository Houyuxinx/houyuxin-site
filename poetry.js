(function () {
  var dialog = document.getElementById('poemReader');
  var scroll = dialog.querySelector('.poem-reader-scroll');
  var title = document.getElementById('poemReaderTitle');
  var date = document.getElementById('poemReaderDate');
  var text = document.getElementById('poemReaderText');
  var close = dialog.querySelector('.poem-reader-close');
  var active = null;
  var opener = null;
  var closeTimer = null;
  var closing = false;
  var closeRequested = false;
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function poemFromURL() {
    var id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch (_) { return null; }
    var poem = document.getElementById(id);
    return poem && poem.classList.contains('poem') ? poem : null;
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

  function show(poem) {
    clearTimeout(closeTimer);
    closeTimer = null;
    closing = false;
    closeRequested = false;
    dialog.classList.remove('is-closing');
    title.textContent = poem.querySelector('.poem-title').textContent;
    date.textContent = poem.querySelector('.poem-date').textContent;
    text.textContent = poem.querySelector('.poem-text').textContent;
    active = poem.id;
    opener = poem.querySelector('.poem-open');
    document.documentElement.classList.add('reader-open');
    if (!dialog.open) dialog.showModal();
    scroll.scrollTop = 0;
    close.focus({preventScroll: true});
  }

  function restore() {
    var poem = poemFromURL();
    if (poem) {
      if (!dialog.open || closing || active !== poem.id) show(poem);
    } else hide();
  }

  function requestClose() {
    if (!dialog.open || closing || closeRequested) return;
    closeRequested = true;
    if (history.state && history.state.poemReaderEntry) history.back();
    else {
      history.replaceState(history.state, '', location.pathname + location.search);
      hide();
    }
  }

  document.querySelectorAll('.poem-open').forEach(function (button) {
    button.addEventListener('click', function () {
      var poem = button.closest('.poem');
      history.pushState(Object.assign({}, history.state, {poemReaderEntry: true}), '', '#' + poem.id);
      show(poem);
    });
  });
  close.addEventListener('click', requestClose);
  dialog.addEventListener('cancel', function (event) { event.preventDefault(); requestClose(); });
  dialog.addEventListener('click', function (event) {
    if (event.target !== dialog) return;
    var rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) requestClose();
  });
  dialog.addEventListener('animationend', function (event) {
    if (event.target === dialog && event.animationName === 'poem-page-out' && closing) finishClose();
  });
  window.addEventListener('popstate', restore);
  window.addEventListener('hashchange', restore);
  window.addEventListener('pageshow', restore);
  window.addEventListener('pagehide', finishClose);
  restore();
})();

