/* Home-only entrance access and session continuity.
   The #entry-revealed anchor is a no-JavaScript fallback. */
(function () {
  'use strict';
  var gate = document.getElementById('entryGate');
  var enter = document.getElementById('entryEnter');
  var home = document.querySelector('main.home');
  var header = document.querySelector('.site-head');
  if (!gate || !enter || !home) return;
  var key = 'echyox-entry-opened-v1';

  function remembered() {
    try { return window.sessionStorage.getItem(key) === 'yes'; }
    catch (error) { return false; }
  }
  function save() {
    try { window.sessionStorage.setItem(key, 'yes'); }
    catch (error) { /* Session storage can be blocked. The link still works. */ }
  }
  function behindGate(blocked) {
    home.inert = blocked;
    if (header) header.inert = blocked;
  }
  function reveal(moveFocus) {
    document.body.classList.add('entry-passed');
    gate.hidden = true;
    behindGate(false);
    save();
    if (moveFocus) {
      var first = home.querySelector('a.door');
      if (first) first.focus({ preventScroll: true });
    }
  }
  if (location.hash === '#entry-revealed' || remembered()) {
    reveal(false);
  } else {
    behindGate(true);
  }
  enter.addEventListener('click', function (event) {
    event.preventDefault();
    reveal(true);
  });
  window.addEventListener('hashchange', function () {
    if (location.hash === '#entry-revealed') reveal(false);
  });
  window.addEventListener('pageshow', function () {
    if (remembered()) reveal(false);
  });
})();
