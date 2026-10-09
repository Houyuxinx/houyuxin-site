/* Space toggles the current audio player, including focused native controls.
   Release mouse focus after a click/seek; keep deliberate keyboard focus. */
(function () {
  'use strict';
  var players = Array.from(document.querySelectorAll('audio'));
  if (!players.length) return;

  var ownControls = 'a[href],button,input,textarea,select,summary,audio,video,' +
    '[role="button"],[role="link"],[role="textbox"],[role="slider"],' +
    '[role="combobox"],[role="listbox"],[role="tab"],[role="menuitem"]';
  var nativeSpaceHeld = false;
  var pointerAudio = null;
  var pointerId = null;
  var pointerBlurTimer = null;

  function eventPath(event) {
    return event.composedPath ? event.composedPath() : [event.target];
  }

  function audioFromEvent(event) {
    var path = eventPath(event);
    for (var i = 0; i < path.length; i++) {
      var node = path[i];
      var audio = node && node.nodeType === 1 && node.closest ? node.closest('audio') : null;
      if (players.indexOf(audio) !== -1) return audio;
    }
    return null;
  }

  function controlOwnsSpace(event) {
    return eventPath(event).some(function (node) {
      return node && node.nodeType === 1 &&
        (node.isContentEditable || (node.closest && node.closest(ownControls)));
    });
  }

  function currentPlayer() {
    var visible = players.filter(function (audio) {
      if (!audio.getAttribute('src') && !audio.querySelector('source[src]')) return false;
      if (audio.closest('[hidden],[inert]') || !audio.getClientRects().length) return false;
      var style = window.getComputedStyle(audio);
      return style.visibility !== 'hidden' && style.visibility !== 'collapse';
    });
    return visible.length === 1 ? visible[0] : null;
  }

  function isSpace(event) {
    return event.key === ' ' || event.key === 'Spacebar';
  }

  function cancelPointerBlur() {
    if (pointerBlurTimer !== null) clearTimeout(pointerBlurTimer);
    pointerBlurTimer = null;
  }

  function finishPointerUse() {
    var audio = pointerAudio;
    pointerAudio = null;
    pointerId = null;
    if (!audio) return;
    cancelPointerBlur();
    // Run after the native click/seek finishes, including a release outside audio.
    // blur() removes the leftover native focus ring without moving the viewport.
    pointerBlurTimer = setTimeout(function () {
      pointerBlurTimer = null;
      if (document.activeElement === audio && !document.querySelector('dialog[open]')) {
        audio.blur();
      }
    }, 0);
  }

  function startPointerUse(event) {
    cancelPointerBlur();
    pointerAudio = null;
    pointerId = null;
    if (event.button !== 0 || event.pointerType === 'touch') return;
    pointerAudio = audioFromEvent(event);
    if (pointerAudio) pointerId = event.pointerId;
  }

  if (window.PointerEvent) {
    document.addEventListener('pointerdown', startPointerUse, true);
    document.addEventListener('pointerup', function (event) {
      if (pointerAudio && event.pointerId === pointerId) finishPointerUse();
    }, true);
    document.addEventListener('pointercancel', function () {
      pointerAudio = null;
      pointerId = null;
    }, true);
  } else {
    document.addEventListener('mousedown', startPointerUse, true);
    document.addEventListener('mouseup', function (event) {
      if (event.button === 0) finishPointerUse();
    }, true);
  }

  document.addEventListener('keydown', function (event) {
    if (!isSpace(event)) {
      // Tab/arrow-key navigation deliberately keeps focus in the native player.
      cancelPointerBlur();
      return;
    }
    if (event.defaultPrevented || event.isComposing || event.keyCode === 229 ||
        event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (document.hidden || document.querySelector('dialog[open]')) return;
    if (/(?:^|\s)site-fade-(?:initial|leaving|local-out|local-hold|local-in)(?:\s|$)/
        .test(document.documentElement.className)) return;

    var audio = currentPlayer();
    if (!audio) return;
    var fromNativePlayer = audioFromEvent(event) === audio ||
      (document.activeElement === audio &&
       (event.target === document.body || event.target === document.documentElement ||
        event.target === document));
    if (!fromNativePlayer && controlOwnsSpace(event)) return;

    // Capture before native shadow controls: one press must toggle only once.
    event.preventDefault();
    if (fromNativePlayer) {
      event.stopPropagation();
      nativeSpaceHeld = true;
    }
    if (event.repeat) return;

    if (audio.paused || audio.ended) {
      var request = audio.play();
      if (request && typeof request.catch === 'function') request.catch(function () {});
    } else {
      audio.pause();
    }
  }, true);

  document.addEventListener('keyup', function (event) {
    if (!isSpace(event)) return;
    var handledNativePress = nativeSpaceHeld;
    nativeSpaceHeld = false;
    // Some native buttons activate on keyup; consume the matching release too.
    if (handledNativePress) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, true);

  function resetInteraction() {
    nativeSpaceHeld = false;
    pointerAudio = null;
    pointerId = null;
    cancelPointerBlur();
  }
  window.addEventListener('blur', resetInteraction);
  window.addEventListener('pagehide', resetInteraction);
})();
