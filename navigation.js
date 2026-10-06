/* One light-field transition for links and browser history; navigation stays native. */
(function () {
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var field = null;
  var cleanupTimer = null;
  var queuedFrame = null;
  var activeTransition = null;
  var revealed = false;

  function clearLegacyState() {
    if (document.body) document.body.classList.remove('is-leaving', 'spot-on');
  }

  function stopField() {
    if (cleanupTimer !== null) clearTimeout(cleanupTimer);
    cleanupTimer = null;
    if (field && field.parentNode) field.parentNode.removeChild(field);
    field = null;
  }

  function cancelQueuedFrame() {
    if (queuedFrame !== null) cancelAnimationFrame(queuedFrame);
    queuedFrame = null;
  }

  function finishNative(transition) {
    if (activeTransition !== transition) return;
    activeTransition = null;
    document.documentElement.classList.remove('stage-native');
  }

  function cancelNative() {
    var transition = activeTransition;
    if (!transition) return;
    activeTransition = null;
    document.documentElement.classList.remove('stage-native');
    transition.skipTransition();
  }

  function playField() {
    if (revealed || !document.body || document.visibilityState === 'hidden') return;
    revealed = true;
    clearLegacyState();
    if (reducedMotion.matches) return;
    stopField();
    var currentField = document.createElement('div');
    currentField.className = 'stage-transition';
    currentField.setAttribute('aria-hidden', 'true');
    field = currentField;
    document.body.appendChild(currentField);
    function finish() {
      if (field === currentField) stopField();
    }
    currentField.addEventListener('animationend', finish);
    currentField.addEventListener('animationcancel', finish);
    // Cleanup is independent of animation events, including interrupted or disabled CSS.
    cleanupTimer = setTimeout(finish, 900);
  }

  function queueField() {
    if (revealed || queuedFrame !== null) return;
    queuedFrame = requestAnimationFrame(function () {
      queuedFrame = null;
      playField();
    });
  }

  function resetCycle() {
    cancelQueuedFrame();
    stopField();
    cancelNative();
    clearLegacyState();
    revealed = false;
  }

  window.addEventListener('pagereveal', function (event) {
    clearLegacyState();
    if (!event.viewTransition) {
      if (!revealed) playField();
      return;
    }
    cancelQueuedFrame();
    stopField();
    cancelNative();
    revealed = true;
    var transition = event.viewTransition;
    if (reducedMotion.matches) {
      transition.skipTransition();
      return;
    }
    activeTransition = transition;
    document.documentElement.classList.add('stage-native');
    // Make the visible content ready for the incoming snapshot; retain scroll reveals below.
    document.querySelectorAll('.reveal').forEach(function (element) {
      var box = element.getBoundingClientRect();
      if (box.bottom > 0 && box.top < innerHeight) element.classList.add('is-visible');
    });
    transition.finished.then(function () {
      finishNative(transition);
    }, function () {
      finishNative(transition);
    });
  });

  window.addEventListener('pageshow', function () {
    clearLegacyState();
    queueField();
  });
  window.addEventListener('pageswap', resetCycle);
  window.addEventListener('pagehide', resetCycle);
  document.addEventListener('DOMContentLoaded', queueField, {once: true});
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState !== 'hidden') return;
    cancelQueuedFrame();
    stopField();
    cancelNative();
  });

  function updateMotionPreference() {
    if (!reducedMotion.matches) return;
    cancelQueuedFrame();
    stopField();
    cancelNative();
    clearLegacyState();
  }
  if (reducedMotion.addEventListener) reducedMotion.addEventListener('change', updateMotionPreference);
  else if (reducedMotion.addListener) reducedMotion.addListener(updateMotionPreference);

  // Register from the head before the first paint and before pagereveal.
  queueField();
})();
