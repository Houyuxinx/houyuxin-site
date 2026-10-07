(function () {
  var archive = document.getElementById('poetryArchive');
  var yearsNav = document.getElementById('poetryYears');
  var stage = document.getElementById('poetryStage');
  var entry = document.getElementById('poetryEntry');
  var directory = document.getElementById('poetryDirectory');
  var status = document.querySelector('.poetry-status');
  var back = document.querySelector('.site-head').querySelector('.back-link');
  var homeHref = back ? back.getAttribute('href') : 'index.html';
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
  function finalDateOrder(poem) {
    var value = formatDate(poem.querySelector('.poem-date').textContent);
    var dates = value.match(/\d{4}(?:\.\d{1,2}){0,2}/g);
    if (!dates) return Infinity;
    var parts = dates[dates.length - 1].split('.').map(Number);
    // Preserve partial-date precision and use the end of a date range.
    return parts[0] * 10000 + (parts[1] || 0) * 100 + (parts[2] || 0);
  }
  archive.querySelectorAll('.poem-list').forEach(function (list) {
    Array.from(list.querySelectorAll('.poem')).map(function (poem, index) {
      return {poem: poem, order: finalDateOrder(poem), index: index};
    }).sort(function (a, b) {
      return a.order - b.order || a.index - b.index;
    }).forEach(function (item) { list.appendChild(item.poem); });
  });
  var poems = Array.from(archive.querySelectorAll('.poem'));
  var selectedYear = null;
  var active = null;
  var opener = null;
  var returnY = null;
  var entryY = history.state && typeof history.state.poetryEntryScroll === 'number' ? history.state.poetryEntryScroll : 0;
  var closeTimer = null;
  var stageTimer = null;
  var contentTimer = null;
  var closing = false;
  var closeRequested = false;
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  var years = Array.from(archive.querySelectorAll('.year-group')).map(function (group) {
    var label = group.querySelector('.year-label');
    var year = label.textContent.trim();
    var count = group.querySelectorAll('.poem').length;
    group.id = 'poetry-year-' + year;
    label.id = group.id + '-label';
    group.setAttribute('aria-labelledby', label.id);
    group.querySelector('.year-count').textContent = count + ' 首';
    if (count <= 2) group.classList.add('is-sparse');
    return {year: year, group: group, count: count, button: null};
  });
  if (!years.length) return;

  function yearInfo(year) {
    return years.find(function (item) { return item.year === year; }) || null;
  }

  function yearForPoem(poem) {
    var group = poem.closest('.year-group');
    return years.find(function (item) { return item.group === group; }).year;
  }

  function yearFromURL() {
    var year = new URL(location.href).searchParams.get('year');
    return yearInfo(year) ? year : null;
  }

  function poemFromURL() {
    var id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch (_) { return null; }
    var poem = document.getElementById(id);
    return poem && poem.classList.contains('poem') ? poem : null;
  }

  function stateURL(year, poemId) {
    var url = new URL(location.href);
    if (year) url.searchParams.set('year', year);
    else url.searchParams.delete('year');
    url.hash = poemId || '';
    return url.pathname + url.search + url.hash;
  }

  function cleanReaderState() {
    var state = Object.assign({}, history.state);
    delete state.poemReaderEntry;
    delete state.poemReturnId;
    delete state.poemListScroll;
    delete state.poetryArchiveYear;
    return state;
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

  function animateStage(animate) {
    clearTimeout(stageTimer);
    stageTimer = null;
    stage.classList.remove('is-changing');
    if (!animate || reducedMotion.matches) return;
    void stage.offsetWidth;
    stage.classList.add('is-changing');
    stageTimer = setTimeout(function () { stage.classList.remove('is-changing'); }, 360);
  }

  function renderYear(year, animate) {
    var changed = year !== selectedYear;
    selectedYear = year;
    var info = yearInfo(year);
    entry.hidden = !!info;
    directory.hidden = !info;
    years.forEach(function (item) {
      var selected = item === info;
      item.group.hidden = !selected;
      item.button.setAttribute('aria-pressed', selected ? 'true' : 'false');
      if (selected) {
        item.group.querySelectorAll('.poem').forEach(function (poem) { poem.classList.add('is-visible'); });
      }
    });
    if (info) directory.setAttribute('aria-label', year + '年诗歌目录，' + info.count + '首');
    status.textContent = info ? '已显示' + year + '年的' + info.count + '首诗' : '诗歌扉页，可选择年份阅读';
    if (back) {
      back.setAttribute('href', info ? stateURL(null) : homeHref);
      back.setAttribute('aria-label', info ? '回到来处：返回诗歌扉页' : '回到来处：返回首页');
      back.title = info ? '返回诗歌扉页' : '返回首页';
    }
    if (changed) animateStage(animate);
  }

  function selectYear(year) {
    if (dialog.open || selectedYear === year) return;
    var oldYear = selectedYear;
    var headerHeight = document.querySelector('.site-head').getBoundingClientRect().height;
    var stageTop = stage.getBoundingClientRect().top;
    var shouldScroll = stageTop < headerHeight + yearsNav.offsetHeight + 16;
    var destination = window.scrollY + stageTop - headerHeight - yearsNav.offsetHeight - 16;
    var state = cleanReaderState();
    if (!state.poetryYearEntry) {
      entryY = window.scrollY;
      state.poetryEntryScroll = entryY;
      state.poetryYearEntry = true;
      history.pushState(state, '', stateURL(year));
    } else history.replaceState(state, '', stateURL(year));
    renderYear(year, true);
    if (oldYear && shouldScroll) window.scrollTo({top: Math.max(0, destination), behavior: 'instant'});
  }

  function returnToEntry() {
    if (!selectedYear || dialog.open) return;
    if (history.state && history.state.poetryYearEntry) history.back();
    else {
      var state = cleanReaderState();
      state.poetryYearEntry = false;
      history.replaceState(state, '', stateURL(null));
      renderYear(null, true);
      window.scrollTo({top: entryY, behavior: 'instant'});
      if (back) back.focus({preventScroll: true});
    }
  }

  yearsNav.style.setProperty('--year-count', years.length);
  years.forEach(function (item) {
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'poetry-year';
    button.textContent = item.year;
    button.setAttribute('aria-label', '阅读' + item.year + '年的诗歌');
    button.setAttribute('aria-controls', 'poetryDirectory');
    button.setAttribute('aria-pressed', 'false');
    button.addEventListener('click', function () { selectYear(item.year); });
    item.button = button;
    yearsNav.appendChild(button);
  });
  if (back) {
    back.addEventListener('click', function (event) {
      if (!selectedYear || event.button !== 0 || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      event.preventDefault();
      returnToEntry();
    });
  }

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
      renderYear(yearFromURL(), false);
      if (returnY !== null) window.scrollTo({top: returnY, behavior: 'instant'});
      if (opener && document.contains(opener) && !opener.closest('.year-group').hidden) opener.focus({preventScroll: true});
      else {
        var info = yearInfo(selectedYear);
        if (info) info.button.focus({preventScroll: true});
      }
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
    renderYear(yearForPoem(poem), false);
    title.textContent = poem.querySelector('.poem-title').textContent;
    date.textContent = poem.querySelector('.poem-date').textContent;
    var draftDate = poem.getAttribute('data-draft-date');
    if (draftDate) {
      var draftScope = poem.getAttribute('data-draft-scope') || '';
      date.textContent += '（' + draftScope + '初稿：' + formatDate(draftDate) + '）';
    }
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

  function restore(animate) {
    var poem = poemFromURL();
    if (poem) {
      if (!dialog.open || closing || active !== poem.id) show(poem);
    } else {
      var previousYear = selectedYear;
      var readerWasOpen = dialog.open;
      var year = yearFromURL();
      renderYear(year, animate && !readerWasOpen);
      hide();
      if (previousYear && !year && !readerWasOpen) {
        window.scrollTo({top: entryY, behavior: 'instant'});
        if (back) back.focus({preventScroll: true});
      }
    }
  }

  function requestClose() {
    if (!dialog.open || closing || closeRequested) return;
    closeRequested = true;
    if (history.state && history.state.poemReaderEntry) history.back();
    else {
      history.replaceState(cleanReaderState(), '', stateURL(selectedYear));
      restore(false);
    }
  }

  function turnPoem(direction) {
    var index = poems.findIndex(function (poem) { return poem.id === active; }) + direction;
    if (index < 0 || index >= poems.length || closing) return;
    // Keep one reader history entry: Back always returns to the year directory.
    history.replaceState(history.state, '', stateURL(yearForPoem(poems[index]), poems[index].id));
    show(poems[index]);
  }

  poems.forEach(function (poem) {
    poem.querySelector('.poem-open').addEventListener('click', function () {
      if (dialog.open || selectedYear !== yearForPoem(poem)) return;
      var state = cleanReaderState();
      history.replaceState(state, '', stateURL(selectedYear));
      history.pushState(Object.assign({}, state, {
        poemReaderEntry: true, poemReturnId: poem.id, poemListScroll: window.scrollY
      }), '', stateURL(selectedYear, poem.id));
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

  window.addEventListener('popstate', function () { restore(true); });
  window.addEventListener('hashchange', function () { restore(true); });
  window.addEventListener('pageshow', function () {
    animateStage(false);
    restore(false);
  });
  window.addEventListener('pagehide', function () {
    animateStage(false);
    clearTimeout(contentTimer);
    content.classList.remove('is-changing');
    finishClose(false);
  });

  function updateMotionPreference() {
    if (!reducedMotion.matches) return;
    animateStage(false);
    clearTimeout(contentTimer);
    content.classList.remove('is-changing');
    if (closing) finishClose();
  }
  if (reducedMotion.addEventListener) reducedMotion.addEventListener('change', updateMotionPreference);
  else if (reducedMotion.addListener) reducedMotion.addListener(updateMotionPreference);

  var initialPoem = poemFromURL();
  var initialYear = initialPoem ? yearForPoem(initialPoem) : yearFromURL();
  var initialState = Object.assign({}, history.state);
  if (!initialYear) initialState.poetryYearEntry = false;
  history.replaceState(initialState, '', initialPoem ? stateURL(initialYear, initialPoem.id) : location.href);
  yearsNav.hidden = false;
  restore(false);
})();

