(function () {
  'use strict';
  var KEY = 'swi_cookie_consent';
  var VERSION = 1;
  var MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;
  var banner = null;

  function read() {
    try {
      var raw = window.localStorage.getItem(KEY);
      if (!raw) return null;
      var c = JSON.parse(raw);
      if (!c || c.v !== VERSION || typeof c.nonEssential !== 'boolean') return null;
      if (Date.now() - c.ts > MAX_AGE_MS) return null;
      return c;
    } catch (e) { return null; }
  }
  function write(nonEssential) {
    try {
      window.localStorage.setItem(KEY, JSON.stringify({ v: VERSION, nonEssential: nonEssential, ts: Date.now() }));
    } catch (e) { /* storage blocked: choice applies for this page view only */ }
  }

  function applyConsent(allowed) {
    var boxes = document.querySelectorAll('[data-map-consent]');
    Array.prototype.forEach.call(boxes, function (box) {
      var placeholder = box.querySelector('[data-map-placeholder]');
      var frame = box.querySelector('iframe');
      if (allowed) {
        if (!frame) {
          frame = document.createElement('iframe');
          frame.title = box.getAttribute('data-map-title') || 'Map';
          frame.setAttribute('allowfullscreen', '');
          frame.setAttribute('loading', 'lazy');
          frame.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
          frame.src = box.getAttribute('data-map-src');
          if (placeholder) box.insertBefore(frame, placeholder);
          else box.appendChild(frame);
        }
        frame.hidden = false;
        if (placeholder) placeholder.hidden = true;
      } else {
        if (frame) frame.parentNode.removeChild(frame);
        if (placeholder) placeholder.hidden = false;
      }
    });
  }

  function build() {
    var el = document.createElement('div');
    el.className = 'cc-banner';
    el.id = 'cookie-banner';
    el.setAttribute('role', 'region');
    el.setAttribute('aria-label', 'Cookie notice');
    el.hidden = true;
    el.innerHTML =
      '<h2 class="cc-title" id="cc-title">Your privacy choices</h2>' +
      '<p class="cc-text">We only use strictly necessary storage to run this site. ' +
      'Our contact map is provided by Google Maps, which may set cookies and receive your IP address, ' +
      'so it stays blocked unless you allow non-essential cookies. ' +
      'Read our <a href="cookie-policy.html">Cookie Policy</a> and <a href="privacy-policy.html">Privacy Policy</a>.</p>' +
      '<div class="cc-actions">' +
        '<button type="button" class="cc-btn cc-btn--reject" data-cc="reject">Reject non-essential</button>' +
        '<button type="button" class="cc-btn cc-btn--accept" data-cc="accept">Accept non-essential</button>' +
      '</div>';
    el.addEventListener('click', function (e) {
      var b = e.target.closest('[data-cc]');
      if (!b) return;
      choose(b.getAttribute('data-cc') === 'accept', true);
    });
    document.body.appendChild(el);
    return el;
  }
  function show(focus) {
    if (!banner) banner = build();
    banner.hidden = false;
    document.body.classList.add('cc-open');
    if (focus) { var first = banner.querySelector('[data-cc]'); if (first) first.focus(); }
  }
  function hide() {
    if (banner) banner.hidden = true;
    document.body.classList.remove('cc-open');
  }
  function choose(allowed, fromBanner) {
    write(allowed);
    applyConsent(allowed);
    hide();
    if (!fromBanner) return;
    var opener = document.querySelector('[data-cookie-settings]');
    if (opener && document.activeElement && document.activeElement.closest && document.activeElement.closest('.cc-banner')) {
      try { opener.focus(); } catch (e) {}
    }
  }

  function init() {
    var c = read();
    applyConsent(!!(c && c.nonEssential));
    if (!c) show(false);

    document.addEventListener('click', function (e) {
      var s = e.target.closest('[data-cookie-settings]');
      if (s) { e.preventDefault(); show(true); return; }
      var m = e.target.closest('[data-map-load]');
      if (m) { e.preventDefault(); choose(true, false); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && banner && !banner.hidden && read()) hide();
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
