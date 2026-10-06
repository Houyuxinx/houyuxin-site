/* Route-aware stage transitions: dim, change scene, then bring the next space up. */
(function () {
  'use strict';

  var root = document.documentElement;
  var motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var intentKey = 'echyox:scene-intent';
  var theatreScrollKey = 'echyox:theatre-scroll';
  var intentTTL = 12000;
  var sections = ['theatre', 'poetry', 'music', 'searching'];
  var navigationLocked = false;
  var navigationWatchdog = null;
  var localBusy = false;
  var entryStarted = false;
  var pendingIntent = readIntent(location.href) || inferIncomingIntent() || directIntent();

  root.classList.add('scene-transitions');
  stageEntry(pendingIntent, 'pending');

  function safeURL(value) {
    try { return new URL(value, location.href); }
    catch (_) { return null; }
  }

  function route(value) {
    var url = safeURL(value);
    var path = url ? url.pathname : '/';
    var name = path.split('/').pop() || 'index.html';
    if (name === 'index.html') return { type: 'home', name: 'home', room: -1 };
    if (/^work-[^/]+\.html$/.test(name)) return { type: 'work', name: name, room: 0 };
    var section = name.replace(/\.html$/, '');
    var room = sections.indexOf(section);
    if (room !== -1) return { type: 'section', name: section, room: room };
    return { type: 'other', name: name, room: -1 };
  }

  function sameDocument(a, b) {
    var first = safeURL(a);
    var second = safeURL(b);
    return !!first && !!second && first.origin === second.origin && first.pathname === second.pathname && first.search === second.search;
  }

  function classify(fromValue, toValue, navigationTypeValue) {
    var from = route(fromValue);
    var to = route(toValue);
    var kind = 'stage-change';
    var direction = 'forward';

    if (sameDocument(fromValue, toValue)) kind = 'direct';
    else if (from.type === 'home' && to.type === 'section' && to.name === 'theatre') kind = 'home-theatre';
    else if (from.type === 'section' && from.name === 'theatre' && to.type === 'work') kind = 'work-open';
    else if (from.type === 'work' && to.type === 'section' && to.name === 'theatre') kind = 'work-back';
    else if (from.type === 'home' || to.type === 'home') kind = 'home-section';
    else if (from.room !== -1 && to.room !== -1 && from.room !== to.room) {
      kind = 'section-shift';
      direction = to.room > from.room ? 'forward' : 'backward';
    }

    return {
      source: normalizeURL(fromValue),
      target: normalizeURL(toValue),
      kind: kind,
      direction: direction,
      navigationType: navigationTypeValue || 'push',
      createdAt: Date.now()
    };
  }

  function directIntent() {
    return {
      source: '',
      target: normalizeURL(location.href),
      kind: 'direct',
      direction: 'forward',
      navigationType: navigationType(),
      createdAt: Date.now()
    };
  }

  function navigationType() {
    var entry = performance.getEntriesByType && performance.getEntriesByType('navigation')[0];
    return entry && entry.type ? entry.type : 'navigate';
  }

  function inferIncomingIntent() {
    try {
      if (!window.navigation || !window.navigation.activation || !window.navigation.activation.from) return null;
      var from = window.navigation.activation.from.url;
      if (!from || sameDocument(from, location.href)) return null;
      return classify(from, location.href, window.navigation.activation.navigationType || 'traverse');
    } catch (_) {
      return null;
    }
  }

  function normalizeURL(value) {
    var url = safeURL(value);
    return url ? url.origin + url.pathname + url.search : '';
  }

  function saveIntent(intent) {
    try { sessionStorage.setItem(intentKey, JSON.stringify(intent)); }
    catch (_) {}
  }

  function readIntent(target) {
    var raw;
    try {
      raw = sessionStorage.getItem(intentKey);
      if (!raw) return null;
      sessionStorage.removeItem(intentKey);
    } catch (_) {
      return null;
    }
    try {
      var intent = JSON.parse(raw);
      if (!intent || intent.target !== normalizeURL(target)) return null;
      if (!intent.createdAt || Date.now() - intent.createdAt > intentTTL) return null;
      return intent;
    } catch (_) {
      return null;
    }
  }

  function stageEntry(intent, mode) {
    pendingIntent = intent || directIntent();
    root.dataset.transitionKind = pendingIntent.kind;
    root.dataset.transitionDirection = pendingIntent.direction || 'forward';
    root.dataset.transitionMode = mode;
    root.dataset.transitionPhase = 'entering';
  }

  function stageExit(intent, mode) {
    root.dataset.transitionKind = intent.kind;
    root.dataset.transitionDirection = intent.direction || 'forward';
    root.dataset.transitionMode = mode;
    root.dataset.transitionPhase = 'leaving';
    root.dataset.navigationLock = 'true';
    root.setAttribute('aria-busy', 'true');
  }

  function prepareSceneParts() {
    if (!document.body) return;
    document.querySelectorAll('[data-scene-role]').forEach(function (element) {
      element.removeAttribute('data-scene-role');
      element.style.removeProperty('--scene-delay');
    });

    var title = document.querySelector('.page-title, .work h1');
    var kicker = document.querySelector('.page > .eyebrow, #trackList > .eyebrow, .work-hero .eyebrow');
    var subtitle = document.querySelector('.page > .page-intro, #trackList > .page-intro, .work-hero .slogan');
    var meta = document.querySelector('.work-hero .work-en');
    if (title) title.dataset.sceneRole = 'title';
    if (kicker) kicker.dataset.sceneRole = 'kicker';
    if (subtitle) subtitle.dataset.sceneRole = 'subtitle';
    if (meta) meta.dataset.sceneRole = 'meta';

    var bodyParts = [];
    var page = document.querySelector('main.page');
    var work = document.querySelector('main.work');
    var home = document.querySelector('main.home');
    var trackList = document.getElementById('trackList');
    if (page && !trackList) {
      Array.from(page.children).forEach(function (element) {
        if (!element.dataset.sceneRole) bodyParts.push(element);
      });
    }
    if (trackList) {
      Array.from(trackList.children).forEach(function (element) {
        if (!element.dataset.sceneRole) bodyParts.push(element);
      });
    }
    if (work) {
      Array.from(work.children).forEach(function (element) {
        if (!element.classList.contains('work-hero')) bodyParts.push(element);
      });
    }
    if (home) bodyParts = Array.from(home.querySelectorAll('.door'));
    bodyParts.forEach(function (element, index) {
      element.dataset.sceneRole = 'body';
      element.style.setProperty('--scene-delay', Math.min(140 + index * 38, 250) + 'ms');
    });

    document.querySelectorAll('.reveal').forEach(function (element) {
      var box = element.getBoundingClientRect();
      if (box.bottom > 0 && box.top < innerHeight) element.classList.add('is-visible');
    });
  }

  function markWorkFocus(target) {
    document.querySelectorAll('.play-row.is-transition-target').forEach(function (row) {
      row.classList.remove('is-transition-target');
    });
    if (route(location.href).name !== 'theatre') return;
    var targetURL = safeURL(target);
    if (!targetURL) return;
    var targetName = targetURL.pathname.split('/').pop();
    document.querySelectorAll('.play-row[href]').forEach(function (row) {
      var rowURL = safeURL(row.getAttribute('href'));
      if (rowURL && rowURL.pathname.split('/').pop() === targetName) row.classList.add('is-transition-target');
    });
  }

  function rememberTheatreScroll(intent) {
    if (intent.kind !== 'work-open') return;
    try {
      sessionStorage.setItem(theatreScrollKey, JSON.stringify({ top: window.scrollY, createdAt: Date.now() }));
    } catch (_) {}
  }

  function restoreTheatreScroll(intent) {
    if (!intent || intent.kind !== 'work-back' || route(location.href).name !== 'theatre') return;
    var stored;
    try { stored = JSON.parse(sessionStorage.getItem(theatreScrollKey) || 'null'); }
    catch (_) { stored = null; }
    if (!stored || typeof stored.top !== 'number' || Date.now() - stored.createdAt > 30 * 60 * 1000) return;
    requestAnimationFrame(function () {
      var previousBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = 'auto';
      window.scrollTo(0, stored.top);
      root.style.scrollBehavior = previousBehavior;
    });
  }

  function settleEntry() {
    entryStarted = false;
    root.dataset.transitionPhase = 'idle';
    delete root.dataset.transitionMode;
    delete root.dataset.transitionKind;
    delete root.dataset.transitionDirection;
    delete root.dataset.navigationLock;
    root.removeAttribute('aria-busy');
    document.querySelectorAll('.play-row.is-transition-target').forEach(function (row) {
      row.classList.remove('is-transition-target');
    });
  }

  function activateLiveEntry() {
    if (entryStarted || root.dataset.transitionPhase === 'idle') return;
    entryStarted = true;
    prepareSceneParts();
    root.dataset.transitionMode = 'live';
    root.dataset.transitionPhase = 'entering';
    restoreTheatreScroll(pendingIntent);
    waitForMotion(document.body, motion.matches ? 160 : 900).then(settleEntry);
  }

  function activateNativeEntry(transition) {
    if (entryStarted) return;
    entryStarted = true;
    prepareSceneParts();
    root.dataset.transitionMode = 'native';
    root.dataset.transitionPhase = 'entering';
    restoreTheatreScroll(pendingIntent);
    transition.finished.then(settleEntry, settleEntry);
  }

  function refreshIncomingIntent() {
    var intent = readIntent(location.href) || inferIncomingIntent();
    var currentTarget = normalizeURL(location.href);
    if (!intent && root.dataset.transitionPhase === 'entering' && pendingIntent && pendingIntent.target === currentTarget) {
      intent = pendingIntent;
    }
    if (!intent) intent = directIntent();
    stageEntry(intent, 'pending');
    return intent;
  }

  function nextFrame() {
    return new Promise(function (resolve) {
      requestAnimationFrame(function () { requestAnimationFrame(resolve); });
    });
  }

  function waitForMotion(element, maximum) {
    return new Promise(function (resolve) {
      var settled = false;
      var timer = setTimeout(done, maximum);
      function hidden() {
        if (document.visibilityState === 'hidden') done();
      }
      function done() {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        document.removeEventListener('visibilitychange', hidden);
        resolve();
      }
      nextFrame().then(function () {
        if (settled) return;
        if (!element || typeof element.getAnimations !== 'function') { done(); return; }
        var animations = element.getAnimations({ subtree: true }).filter(function (animation) {
          return animation.playState !== 'finished' && animation.playState !== 'idle';
        });
        if (!animations.length) { done(); return; }
        Promise.allSettled(animations.map(function (animation) { return animation.finished; })).then(done);
      });
      document.addEventListener('visibilitychange', hidden);
    });
  }

  function blackoutDelay(kind) {
    if (motion.matches) return 0;
    if (kind === 'home-theatre') return 140;
    return kind === 'home-section' ? 95 : (kind === 'work-open' || kind === 'work-back' || kind === 'stage-change' ? 85 : 0);
  }

  function exitMaximum(kind) {
    if (motion.matches) return 130;
    if (kind === 'home-theatre') return 420;
    if (kind === 'work-open') return 360;
    if (kind === 'work-back') return 300;
    if (kind === 'home-section' || kind === 'stage-change') return 310;
    return 250;
  }

  function fallbackNavigate(intent, target) {
    stageExit(intent, 'live');
    prepareSceneParts();
    markWorkFocus(target);
    waitForMotion(document.body, exitMaximum(intent.kind)).then(function () {
      var gap = blackoutDelay(intent.kind);
      if (!gap) { location.assign(target); return; }
      root.dataset.transitionPhase = 'blackout';
      setTimeout(function () { location.assign(target); }, gap);
    });
  }

  function supportsNativeNavigationTransition() {
    return !motion.matches && 'onpageswap' in window && 'onpagereveal' in window && CSS.supports('view-transition-name: root');
  }

  function eligibleLink(event) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return null;
    var link = event.target.closest && event.target.closest('a[href]');
    if (!link || link.hasAttribute('download')) return null;
    if (link.target && link.target.toLowerCase() !== '_self') return null;
    var target = safeURL(link.href);
    if (!target || target.origin !== location.origin) return null;
    if (target.protocol !== 'http:' && target.protocol !== 'https:') return null;
    if (sameDocument(target.href, location.href)) return null;
    return { link: link, target: target.href };
  }

  document.addEventListener('click', function (event) {
    var candidate = eligibleLink(event);
    if (!candidate) return;
    if (localBusy) { event.preventDefault(); return; }
    if (navigationLocked) { event.preventDefault(); return; }

    var intent = classify(location.href, candidate.target, 'push');
    navigationLocked = true;
    saveIntent(intent);
    rememberTheatreScroll(intent);
    markWorkFocus(candidate.target);
    root.dataset.navigationLock = 'true';
    root.setAttribute('aria-busy', 'true');

    clearTimeout(navigationWatchdog);
    navigationWatchdog = setTimeout(function () {
      if (document.visibilityState === 'hidden') return;
      navigationLocked = false;
      delete root.dataset.navigationLock;
      root.removeAttribute('aria-busy');
    }, 1800);

    if (supportsNativeNavigationTransition()) return;
    event.preventDefault();
    fallbackNavigate(intent, candidate.target);
  }, true);

  window.addEventListener('pageswap', function (event) {
    var target = null;
    var type = 'push';
    try {
      target = event.activation && event.activation.entry && event.activation.entry.url;
      type = event.activation && event.activation.navigationType || type;
    } catch (_) {}
    if (!target) return;
    var intent = classify(location.href, target, type);
    saveIntent(intent);
    rememberTheatreScroll(intent);
    prepareSceneParts();
    markWorkFocus(target);
    stageExit(intent, event.viewTransition && !motion.matches ? 'native' : 'live');
    if (event.viewTransition && motion.matches) event.viewTransition.skipTransition();
  });

  window.addEventListener('pagereveal', function (event) {
    if (entryStarted && root.dataset.transitionMode === 'live') {
      if (event.viewTransition) event.viewTransition.skipTransition();
      return;
    }
    // A document restored from BFCache begins a new reveal cycle with its old
    // JavaScript state, so do not carry the previous cycle's guard forward.
    entryStarted = false;
    refreshIncomingIntent();
    if (event.viewTransition && !motion.matches) activateNativeEntry(event.viewTransition);
    else {
      if (event.viewTransition) event.viewTransition.skipTransition();
      activateLiveEntry();
    }
  });

  document.addEventListener('DOMContentLoaded', function () {
    prepareSceneParts();
    if (!supportsNativeNavigationTransition()) activateLiveEntry();
  }, { once: true });

  window.addEventListener('pageshow', function (event) {
    navigationLocked = false;
    clearTimeout(navigationWatchdog);
    if (event.persisted && !('onpagereveal' in window)) {
      entryStarted = false;
      refreshIncomingIntent();
      prepareSceneParts();
    }
    if (!supportsNativeNavigationTransition()) {
      requestAnimationFrame(function () {
        if (root.dataset.transitionMode === 'pending') activateLiveEntry();
      });
    }
  });

  function setLocalState(kind, phase, element, part) {
    root.dataset.localTransition = kind;
    root.dataset.localPhase = phase;
    root.setAttribute('aria-busy', 'true');
    element.dataset.localPart = part;
    element.setAttribute('aria-busy', 'true');
  }

  function clearLocalState(elements) {
    (elements || []).forEach(function (element) {
      if (!element) return;
      element.removeAttribute('data-local-part');
      element.removeAttribute('aria-busy');
    });
    delete root.dataset.localTransition;
    delete root.dataset.localPhase;
    if (!navigationLocked) root.removeAttribute('aria-busy');
    localBusy = false;
  }

  function swapLocal(options) {
    if (localBusy || navigationLocked || !options || !options.outgoing || !options.incoming || typeof options.swap !== 'function') return Promise.resolve(false);
    localBusy = true;
    var outgoing = options.outgoing;
    var incoming = options.incoming;
    try {
      if (typeof options.beforeExit === 'function') options.beforeExit();
      setLocalState(options.kind, 'exiting', outgoing, 'outgoing');
    } catch (error) {
      clearLocalState([outgoing, incoming]);
      return Promise.reject(error);
    }
    return waitForMotion(outgoing, motion.matches ? 150 : 520).then(function () {
      options.swap();
      outgoing.removeAttribute('data-local-part');
      outgoing.removeAttribute('aria-busy');
      setLocalState(options.kind, 'entering', incoming, 'incoming');
      return waitForMotion(incoming, motion.matches ? 150 : 560);
    }).then(function () {
      if (typeof options.afterEnter === 'function') options.afterEnter();
      clearLocalState([outgoing, incoming]);
      return true;
    }, function (error) {
      clearLocalState([outgoing, incoming]);
      throw error;
    });
  }

  function runLayer(options) {
    if (localBusy || navigationLocked || !options || !options.element) return Promise.resolve(false);
    localBusy = true;
    var element = options.element;
    try {
      setLocalState(options.kind, options.opening ? 'entering' : 'exiting', element, options.opening ? 'incoming' : 'outgoing');
      if (typeof options.before === 'function') options.before();
    } catch (error) {
      clearLocalState([element]);
      return Promise.reject(error);
    }
    return waitForMotion(element, motion.matches ? 150 : 520).then(function () {
      if (typeof options.after === 'function') options.after();
      clearLocalState([element]);
      return true;
    }, function (error) {
      clearLocalState([element]);
      throw error;
    });
  }

  window.SiteTransitions = {
    swapLocal: swapLocal,
    runLayer: runLayer,
    waitForMotion: waitForMotion,
    reducedMotion: motion
  };

  motion.addEventListener && motion.addEventListener('change', function () {
    if (!motion.matches) return;
    if (root.dataset.transitionMode === 'native') root.dataset.transitionMode = 'live';
  });
})();
