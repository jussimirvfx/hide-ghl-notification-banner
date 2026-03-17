(function () {
  'use strict';

  var STYLE_ID = 'ghl-hide-notification-banner-style';
  var BANNER_SELECTOR = '#notification_banner-top_bar';

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;

    var style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = BANNER_SELECTOR + ' { display: none !important; visibility: hidden !important; }';
    document.head.appendChild(style);
  }

  function hideExistingBanner() {
    var banner = document.querySelector(BANNER_SELECTOR);
    if (!banner) return;

    banner.style.setProperty('display', 'none', 'important');
    banner.style.setProperty('visibility', 'hidden', 'important');
    banner.setAttribute('aria-hidden', 'true');
  }

  function initObserver() {
    var observer = new MutationObserver(function () {
      hideExistingBanner();
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });
  }

  function init() {
    injectStyle();
    hideExistingBanner();
    initObserver();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
