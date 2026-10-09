/* Space toggles the current visible audio player without scrolling.
   Native controls, editable fields, dialogs and navigation keep their own keys. */
(function () {
  'use strict';
  var players = Array.from(document.querySelectorAll('audio'));
  if (!players.length) return;

  var ownControls = 'a[href],button,input,textarea,select,summary,audio,video,' +
    '[role="button"],[role="link"],[role="textbox"],[role="slider"],' +
    '[role="combobox"],[role="listbox"],[role="tab"],[role="menuitem"]';

  function controlOwnsSpace(event) {
    // Native media controls may retarget events from their shadow DOM to audio.
    var path = event.composedPath ? event.composedPath() : [event.target];
    return path.some(function (node) {
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
    // Do not choose a song from the list or start several players at once.
    return visible.length === 1 ? visible[0] : null;
  }

  document.addEventListener('keydown', function (event) {
    if (event.key !== ' ' && event.key !== 'Spacebar') return;
    if (event.defaultPrevented || event.isComposing || event.keyCode === 229 ||
        event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (document.hidden || document.querySelector('dialog[open]')) return;
    if (/(?:^|\s)site-fade-(?:initial|leaving|local-out|local-hold|local-in)(?:\s|$)/
        .test(document.documentElement.className)) return;
    if (controlOwnsSpace(event)) return;

    var audio = currentPlayer();
    if (!audio) return;
    // Suppress scrolling on repeated keydowns too, but toggle only once per press.
    event.preventDefault();
    if (event.repeat) return;

    if (audio.paused || audio.ended) {
      var request = audio.play();
      // A refused play request must not leave an unhandled promise rejection.
      if (request && typeof request.catch === 'function') request.catch(function () {});
    } else {
      audio.pause();
    }
  });
})();
