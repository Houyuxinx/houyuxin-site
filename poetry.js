(function () {
  var archive = document.querySelector('.poetry-archive');
  var toolbar = document.querySelector('.archive-toolbar');
  var yearsNav = document.querySelector('.archive-years');
  var previousPages = document.querySelectorAll('.archive-prev');
  var nextPages = document.querySelectorAll('.archive-next');
  var pageCount = document.querySelector('.archive-page-count');
  var pageRange = document.querySelector('.archive-range');
  var archiveStatus = document.querySelector('.archive-status');
  var footer = document.querySelector('.archive-footer');
  var dialog = document.getElementById('poemReader');
  var scroll = dialog.querySelector('.poem-reader-scroll');
  var content = dialog.querySelector('.poem-reader-content');
  var title = document.getElementById('poemReaderTitle');
  var date = document.getElementById('poemReaderDate');
  var text = document.getElementById('poemReaderText');
  var close = dialog.querySelector('.poem-reader-close');
  var previousPoem = dialog.querySelector('.poem-reader-prev');
  var nextPoem = dialog.querySelector('.poem-reader-next');
  var poemPosition = dialog.querySelector('.poem-reader-position');
  var poems = Array.from(archive.querySelectorAll('.poem'));
  var active = null;
  var opener = null;
  var returnY = null;
  var closeTimer = null;
  var turnTimer = null;
  var contentTimer = null;
  var closing = false;
  var closeRequested = false;
  var gesture = null;
  var suppressClick = false;
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // Keep future poems in four consecutive calendar years, without empty placeholder years.
  function buildYearPages(years) {
    if (!years.length) return [];
    var firstYear = Math.min.apply(null, years.map(function (entry) { return entry.year; }));
    var buckets = {};
    years.forEach(function (entry) {
      var start = firstYear + Math.floor((entry.year - firstYear) / 4) * 4;
      if (!buckets[start]) buckets[start] = {start: start, groups: []};
      buckets[start].groups.push(entry);
    });
    return Object.keys(buckets).sort(function (a, b) { return Number(a) - Number(b); }).map(function (key) {
      var page = buckets[key];
      page.groups.sort(function (a, b) { return a.year - b.year; });
      var first = page.groups[0].year;
      var last = page.groups[page.groups.length - 1].year;
      page.label = first === last ? String(first) : first + ' — ' + last;
      return page;
    });
  }

  var yearGroups = Array.from(archive.querySelectorAll('.year-group')).map(function (group) {
    var label = group.querySelector('.year-label');
    var year = Number(label.textContent.trim());
    group.id = 'poetry-year-' + year;
    label.id = group.id + '-label';
    group.setAttribute('aria-labelledby', label.id);
    return {year: year, group: group};
  });
  var pages = buildYearPages(yearGroups);
  if (!pages.length) return;
  var currentPage = 0;

  function pageForPoem(poem) {
    var group = poem.closest('.year-group');
    return pages.findIndex(function (page) {
      return page.groups.some(function (entry) { return entry.group === group; });
    });
  }

  function pageFromState() {
    var start = history.state && history.state.poetryArchiveYear;
    var index = pages.findIndex(function (page) { return page.start === start; });
    return index < 0 ? 0 : index;
  }

  function archiveState() {
    var state = Object.assign({}, history.state, {poetryArchiveYear: pages[currentPage].start});
    delete state.poemReaderEntry;
    delete state.poemReturnId;
    delete state.poemListScroll;
    return state;
  }

  function poemFromURL() {
    var id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch (_) { return null; }
    var poem = document.getElementById(id);
    return poem && poem.classList.contains('poem') ? poem : null;
  }

  function formatDate(value) {
    return value.replace(/．/g, '.')
      .replace(/(\d{4})年(\d{1,2})月(?:(\d{1,2})日)?/g, function (_, year, month, day) {
        return year + '.' + month + (day ? '.' + day : '');
      })
      .replace(/(\d)\s*[-—]\s*(?=\d)/g, '$1 — ');
  }
  document.querySelectorAll('.poem-date').forEach(function (element) {
    element.textContent = formatDate(element.textContent);
  });

  function animateTurn(direction) {
    clearTimeout(turnTimer);
    archive.classList.remove('is-turning-next', 'is-turning-prev');
    if (!direction || reducedMotion.matches) return;
    void archive.offsetWidth;
    archive.classList.add(direction > 0 ? 'is-turning-next' : 'is-turning-prev');
    turnTimer = setTimeout(function () {
      archive.classList.remove('is-turning-next', 'is-turning-prev');
    }, 320);
  }

  function renderPage(index, direction) {
    currentPage = Math.max(0, Math.min(index, pages.length - 1));
    var page = pages[currentPage];
    yearGroups.forEach(function (entry) {
      entry.group.hidden = !page.groups.some(function (visible) { return visible === entry; });
    });
    yearsNav.replaceChildren();
    page.groups.forEach(function (entry) {
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'archive-year';
      button.textContent = entry.year;
      button.setAttribute('aria-label', '跳至' + entry.year + '年的诗歌');
      button.addEventListener('click', function () {
        entry.group.scrollIntoView({block: 'start', behavior: reducedMotion.matches ? 'instant' : 'smooth'});
      });
      yearsNav.appendChild(button);
    });
    previousPages.forEach(function (button) {
      button.disabled = currentPage === 0;
      button.setAttribute('aria-label', currentPage === 0 ? '已是第一页' : '上一页：' + pages[currentPage - 1].label);
    });
    nextPages.forEach(function (button) {
      button.disabled = currentPage === pages.length - 1;
      button.setAttribute('aria-label', button.disabled ? '已是最后一页' : '下一页：' + pages[currentPage + 1].label);
    });
    pageCount.textContent = (currentPage + 1) + ' / ' + pages.length;
    pageRange.textContent = page.label;
    archiveStatus.textContent = page.label + '，第' + (currentPage + 1) + '页，共' + pages.length + '页';
    animateTurn(direction);
  }

  function turnPage(direction) {
    if (dialog.open) return;
    var next = currentPage + direction;
    if (next < 0 || next >= pages.length) return;
    var headerHeight = document.querySelector('.site-head').getBoundingClientRect().height;
    var archiveTop = archive.getBoundingClientRect().top;
    var returnToStart = archiveTop < headerHeight + toolbar.offsetHeight + 16;
    var destination = window.scrollY + archiveTop - headerHeight - toolbar.offsetHeight - 16;
    renderPage(next, direction);
    history.replaceState(archiveState(), '', location.pathname + location.search);
    if (returnToStart) window.scrollTo({top: Math.max(0, destination), behavior: 'instant'});
  }

  previousPages.forEach(function (button) { button.addEventListener('click', function () { turnPage(-1); }); });
  nextPages.forEach(function (button) { button.addEventListener('click', function () { turnPage(1); }); });

  // Horizontal intent only; ordinary vertical scrolling and poem clicks remain native.
  archive.addEventListener('pointerdown', function (event) {
    if (!event.isPrimary || event.button !== 0 || dialog.open) return;
    gesture = {id: event.pointerId, x: event.clientX, y: event.clientY, horizontal: false};
    suppressClick = false;
  });
  archive.addEventListener('pointermove', function (event) {
    if (!gesture || event.pointerId !== gesture.id) return;
    var dx = event.clientX - gesture.x;
    var dy = event.clientY - gesture.y;
    if (!gesture.horizontal && Math.abs(dx) > 18 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      gesture.horizontal = true;
      archive.setPointerCapture(event.pointerId);
    }
  });
  archive.addEventListener('pointerup', function (event) {
    if (!gesture || event.pointerId !== gesture.id) return;
    var dx = event.clientX - gesture.x;
    var dy = event.clientY - gesture.y;
    var horizontal = gesture.horizontal;
    gesture = null;
    if (!horizontal) return;
    suppressClick = true;
    if (Math.abs(dx) >= 64 && Math.abs(dx) > Math.abs(dy) * 1.5) turnPage(dx < 0 ? 1 : -1);
    setTimeout(function () { suppressClick = false; }, 400);
  });
  archive.addEventListener('pointercancel', function () { gesture = null; suppressClick = false; });
  archive.addEventListener('lostpointercapture', function () { gesture = null; });
  archive.addEventListener('click', function (event) {
    if (!suppressClick) return;
    if (event.detail === 0) { suppressClick = false; return; }
    event.preventDefault();
    event.stopPropagation();
    suppressClick = false;
  }, true);

  function finishClose(restorePosition) {
    clearTimeout(closeTimer);
    closeTimer = null;
    closing = false;
    closeRequested = false;
    active = null;
    if (dialog.open) dialog.close();
    dialog.classList.remove('is-closing');
    document.documentElement.classList.remove('reader-open');
    if (restorePosition !== false) {
      if (!poemFromURL()) renderPage(pageFromState());
      if (returnY !== null) window.scrollTo({top: returnY, behavior: 'instant'});
      if (opener && document.contains(opener) && !opener.closest('.year-group').hidden) opener.focus({preventScroll: true});
    }
    opener = null;
    returnY = null;
  }

  function hide() {
    if (!dialog.open || closing) return;
    closing = true;
    if (reducedMotion.matches) { finishClose(); return; }
    dialog.classList.add('is-closing');
    closeTimer = setTimeout(finishClose, 220);
  }

  function show(poem) {
    var wasOpen = dialog.open;
    clearTimeout(closeTimer);
    closeTimer = null;
    closing = false;
    closeRequested = false;
    dialog.classList.remove('is-closing');
    if (!wasOpen) {
      var state = history.state || {};
      var returnPoem = document.getElementById(state.poemReturnId) || poem;
      opener = returnPoem.querySelector('.poem-open');
      returnY = typeof state.poemListScroll === 'number' ? state.poemListScroll : window.scrollY;
    }
    renderPage(pageForPoem(poem));
    title.textContent = poem.querySelector('.poem-title').textContent;
    date.textContent = poem.querySelector('.poem-date').textContent;
    text.textContent = poem.querySelector('.poem-text').textContent;
    active = poem.id;
    var index = poems.indexOf(poem);
    previousPoem.disabled = index === 0;
    nextPoem.disabled = index === poems.length - 1;
    previousPoem.setAttribute('aria-label', previousPoem.disabled ? '已是第一首诗' : '上一首：' + poems[index - 1].querySelector('.poem-title').textContent);
    nextPoem.setAttribute('aria-label', nextPoem.disabled ? '已是最后一首诗' : '下一首：' + poems[index + 1].querySelector('.poem-title').textContent);
    poemPosition.textContent = (index + 1) + ' / ' + poems.length;
    clearTimeout(contentTimer);
    content.classList.remove('is-changing');
    if (wasOpen && !reducedMotion.matches) {
      void content.offsetWidth;
      content.classList.add('is-changing');
      contentTimer = setTimeout(function () { content.classList.remove('is-changing'); }, 280);
    }
    document.documentElement.classList.add('reader-open');
    if (!wasOpen) dialog.showModal();
    scroll.scrollTop = 0;
    if (!wasOpen) close.focus({preventScroll: true});
  }

  function restore() {
    var poem = poemFromURL();
    if (poem) {
      if (!dialog.open || closing || active !== poem.id) show(poem);
    } else {
      renderPage(pageFromState());
      hide();
    }
  }

  function requestClose() {
    if (!dialog.open || closing || closeRequested) return;
    closeRequested = true;
    if (history.state && history.state.poemReaderEntry) history.back();
    else {
      history.replaceState(archiveState(), '', location.pathname + location.search);
      restore();
    }
  }

  function turnPoem(direction) {
    var index = poems.findIndex(function (poem) { return poem.id === active; }) + direction;
    if (index < 0 || index >= poems.length || closing) return;
    // Reader navigation shares one history entry, so browser Back still returns to the list.
    history.replaceState(history.state, '', '#' + poems[index].id);
    show(poems[index]);
  }

  poems.forEach(function (poem) {
    poem.querySelector('.poem-open').addEventListener('click', function () {
      if (suppressClick) return;
      var state = archiveState();
      history.replaceState(state, '', location.pathname + location.search);
      history.pushState(Object.assign({}, state, {
        poemReaderEntry: true, poemReturnId: poem.id, poemListScroll: window.scrollY
      }), '', '#' + poem.id);
      show(poem);
    });
  });
  previousPoem.addEventListener('click', function () { turnPoem(-1); });
  nextPoem.addEventListener('click', function () { turnPoem(1); });
  dialog.addEventListener('keydown', function (event) {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      turnPoem(event.key === 'ArrowLeft' ? -1 : 1);
    }
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
  window.addEventListener('pagehide', function () {
    gesture = null;
    suppressClick = false;
    clearTimeout(turnTimer);
    clearTimeout(contentTimer);
    archive.classList.remove('is-turning-next', 'is-turning-prev');
    content.classList.remove('is-changing');
    finishClose(false);
  });

  var initialPoem = poemFromURL();
  var initialPage = initialPoem ? pageForPoem(initialPoem) : pageFromState();
  var initialState = Object.assign({}, history.state);
  if (!(initialState.poemReaderEntry && typeof initialState.poetryArchiveYear === 'number')) {
    initialState.poetryArchiveYear = pages[initialPage].start;
  }
  history.replaceState(initialState, '', location.href);
  toolbar.hidden = false;
  footer.hidden = false;
  renderPage(initialPage);
  restore();
})();
