---
layout: null
sitemap:
  exclude: 'yes'
---

$(document).ready(function () {
  $('a.blog-button').click(function (e) {
    if ($('.panel-cover').hasClass('panel-cover--collapsed')) return
    currentWidth = $('.panel-cover').width()
    if (currentWidth < 960) {
      $('.panel-cover').addClass('panel-cover--collapsed')
      $('.content-wrapper').addClass('animated slideInRight')
    } else {
      $('.panel-cover').css('max-width', currentWidth)
      $('.panel-cover').animate({'max-width': '530px', 'width': '40%'}, 400, swing = 'swing', function () {})
    }
  })

  if (window.location.hash && window.location.hash == '#blog') {
    $('.panel-cover').addClass('panel-cover--collapsed')
  }

  if (window.location.pathname !== '{{ site.baseurl }}/' && window.location.pathname !== '{{ site.baseurl }}/index.html') {
    $('.panel-cover').addClass('panel-cover--collapsed')
  }

  $('.btn-mobile-menu').click(function () {
    $('.navigation-wrapper').toggleClass('visible animated bounceInDown')
    $('.btn-mobile-menu__icon').toggleClass('icon-list icon-x-circle animated fadeIn')
  })

  $('.navigation-wrapper .blog-button').click(function () {
    $('.navigation-wrapper').toggleClass('visible')
    $('.btn-mobile-menu__icon').toggleClass('icon-list icon-x-circle animated fadeIn')
  })

})

// Listen for the popstate event (triggered when the back button is pressed)
window.addEventListener("popstate", function(event) {
  // If your mobile navigation is open (adjust the selector if needed)
  if ($('.navigation-wrapper').hasClass('visible')) {
    // Close the mobile menu
    $('.navigation-wrapper').removeClass('visible animated bounceInDown');
    $('.btn-mobile-menu__icon')
      .removeClass('icon-x-circle animated fadeIn')
      .addClass('icon-list');
    
    // Push the current state back so that user stays on the same page.
    // This effectively "eats" the back action.
    history.pushState(null, null, location.href);
  }
});

/* ==========================================================
   RESET HERO PANEL WHENEVER WE ARE ON THE HOME PAGE
   – works on normal loads *and* on bfcache restores
   ========================================================== */

/* 1. Helper that actually does the reset */
function resetPanelCoverIfHome () {
  var home1 = '{{ site.baseurl }}/';          // e.g. "/"   or "/ananyakotia.github.io/"
  var home2 = '{{ site.baseurl }}/index.html';

  /* GitHub Pages + custom domain resolves site.baseurl to "".
     So cover the three possibilities ↴                           */
  if (window.location.pathname === home1 ||
      window.location.pathname === home2 ||
      window.location.pathname === '/') {

    var $panel = $('.panel-cover');
    $panel.removeClass('panel-cover--collapsed');   // remove the class
    $panel.css({ width: '', maxWidth: '' });   // clears both inline rules
  }
}

/* 2. Run once on a *normal* page load / refresh */
resetPanelCoverIfHome();

/* 3. Run every time the page is restored from the back-/forward-cache  */
window.addEventListener('pageshow', resetPanelCoverIfHome, false);

