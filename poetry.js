(function () {
  'use strict';

  var archive = document.querySelector('.poetry-archive');
  var transitions = window.SiteTransitions;
  var dialogSupport = window.HTMLDialogElement &&
    typeof window.HTMLDialogElement.prototype.showModal === 'function';

  // The native details elements remain the complete no-JavaScript fallback.
  if (!archive || archive.classList.contains('is-reader-enhanced') || document.getElementById('poetry-reader') ||
      !dialogSupport || !transitions || typeof transitions.runLayer !== 'function') return;

  var root = document.documentElement;
  var dialog = document.createElement('dialog');
  var panel = document.createElement('div');
  var closeButton = document.createElement('button');
  var heading = document.createElement('h2');
  var date = document.createElement('p');
  var text = document.createElement('div');
  var phase = 'closed';
  var activeSummary = null;
  var closeRequested = false;
  var operation = 0;
  var lockedScrollY = 0;

  dialog.className = 'poetry-reader';
  dialog.id = 'poetry-reader';
  dialog.setAttribute('aria-labelledby', 'poetry-reader-title');
  dialog.setAttribute('aria-modal', 'true');

  panel.className = 'poetry-reader__panel';
  closeButton.className = 'poetry-reader__close';
  closeButton.type = 'button';
  closeButton.textContent = '← 返回诗歌列表';
  heading.className = 'poetry-reader__title';
  heading.id = 'poetry-reader-title';
  date.className = 'poetry-reader__date';
  text.className = 'poetry-reader__text';

  panel.appendChild(closeButton);
  panel.appendChild(heading);
  panel.appendChild(date);
  panel.appendChild(text);
  dialog.appendChild(panel);
  document.body.appendChild(dialog);

  function poemFor(summary) {
    if (!summary || !summary.parentElement || !summary.parentElement.matches('details.poem')) return null;
    var titleNode = summary.querySelector('.poem-title');
    var dateNode = summary.querySelector('.poem-date');
    var textNode = summary.parentElement.querySelector('.poem-text');
    if (!titleNode || !dateNode || !textNode) return null;
    return {
      details: summary.parentElement,
      title: titleNode.textContent,
      date: dateNode.textContent,
      text: textNode.textContent
    };
  }

  function setDialogState(summary, expanded) {
    if (!summary) return;
    if (expanded) {
      summary.setAttribute('aria-controls', dialog.id);
      summary.setAttribute('aria-expanded', 'true');
      return;
    }
    summary.removeAttribute('aria-controls');
    summary.removeAttribute('aria-expanded');
  }

  function focusCloseButton() {
    try {
      closeButton.focus({preventScroll: true});
    } catch (error) {
      closeButton.focus();
    }
  }

  function focusSummary(summary) {
    if (!summary || !summary.isConnected || document.visibilityState === 'hidden') return;
    try {
      summary.focus({preventScroll: true});
    } catch (error) {
      summary.focus();
    }
  }

  function restoreScrollPosition() {
    if (Math.abs(window.scrollY - lockedScrollY) < 1) return;
    var previousBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    window.scrollTo(0, lockedScrollY);
    root.style.scrollBehavior = previousBehavior;
  }

  function finishClose(restoreFocus, restoreScroll) {
    var summary = activeSummary;
    operation += 1;
    phase = 'closed';
    closeRequested = false;
    activeSummary = null;
    root.classList.remove('poetry-reader-visible', 'poetry-reader-active');
    setDialogState(summary, false);
    if (dialog.open) dialog.close();
    if (restoreScroll) restoreScrollPosition();
    if (restoreFocus) focusSummary(summary);
  }

  function useNativeFallback(summary, details) {
    var wasLocked = root.classList.contains('poetry-reader-active');
    finishClose(false, wasLocked);
    if (details && details.isConnected) details.open = true;
    focusSummary(summary);
  }

  function openReader(summary) {
    if (phase !== 'closed') return;
    var poem = poemFor(summary);
    if (!poem) return;

    heading.textContent = poem.title;
    date.textContent = poem.date;
    text.textContent = poem.text;
    activeSummary = summary;
    closeRequested = false;
    phase = 'opening';
    var token = ++operation;

    Promise.resolve(transitions.runLayer({
      kind: 'poetry-reader-open',
      element: panel,
      opening: true,
      before: function () {
        if (token !== operation) return;
        lockedScrollY = window.scrollY;
        poem.details.open = false;
        dialog.scrollTop = 0;
        dialog.showModal();
        root.classList.add('poetry-reader-active', 'poetry-reader-visible');
        setDialogState(summary, true);
        focusCloseButton();
      },
      after: function () {
        if (token === operation) phase = 'open';
      }
    })).then(function (started) {
      if (token !== operation) return;
      if (!started) {
        useNativeFallback(summary, poem.details);
        return;
      }
      if (closeRequested) {
        closeRequested = false;
        closeReader(true);
      }
    }, function () {
      if (token === operation) useNativeFallback(summary, poem.details);
    });
  }

  function closeReader(restoreFocus) {
    if (phase === 'opening') {
      closeRequested = true;
      return;
    }
    if (phase !== 'open') return;

    phase = 'closing';
    var token = ++operation;
    Promise.resolve(transitions.runLayer({
      kind: 'poetry-reader-close',
      element: panel,
      opening: false,
      before: function () {
        if (token === operation) root.classList.remove('poetry-reader-visible');
      },
      after: function () {
        if (token === operation) finishClose(restoreFocus, true);
      }
    })).then(function (started) {
      if (token !== operation) return;
      if (!started) finishClose(restoreFocus, true);
    }, function () {
      if (token === operation) finishClose(restoreFocus, true);
    });
  }

  archive.addEventListener('click', function (event) {
    var summary = event.target.closest('details.poem > summary');
    if (!summary || !archive.contains(summary) || !poemFor(summary)) return;
    event.preventDefault();
    openReader(summary);
  });

  closeButton.addEventListener('click', function () {
    closeReader(true);
  });

  dialog.addEventListener('cancel', function (event) {
    event.preventDefault();
    closeReader(true);
  });

  dialog.addEventListener('click', function (event) {
    if (event.target === dialog) closeReader(true);
  });

  // Clean up unexpected native closes as well as history/page lifecycle exits.
  dialog.addEventListener('close', function () {
    if (phase !== 'closed') finishClose(true, true);
  });
  window.addEventListener('pagehide', function () {
    if (phase !== 'closed' || dialog.open) finishClose(false, false);
  });

  archive.querySelectorAll('details.poem > summary').forEach(function (summary) {
    summary.setAttribute('aria-haspopup', 'dialog');
  });
  archive.classList.add('is-reader-enhanced');
})();
