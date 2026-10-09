(function () {
  // Variables
  var hamburger = document.getElementById('header-hamburger');
  var headerNav = document.getElementById('header-nav');
  var mobileQuery = window.matchMedia('(max-width: 767px)');
  var emailGlobalUnsub = document.querySelector('input[name="globalunsub"]');

  // Functions

  // Function for executing code on document ready
  function domReady(callback) {
    if (['interactive', 'complete'].indexOf(document.readyState) >= 0) {
      callback();
    } else {
      document.addEventListener('DOMContentLoaded', callback);
    }
  }

  // Function for opening/closing the mobile navigation
  function setNavOpen(open) {
    headerNav.classList.toggle('is-open', open);
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
    hamburger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  }

  function toggleNav() {
    setNavOpen(hamburger.getAttribute('aria-expanded') !== 'true');
  }

  // Function to disable the other checkbox inputs on the email subscription system page template
  function toggleDisabled() {
    var emailSubItem = document.querySelectorAll('#email-prefs-form .item');

    emailSubItem.forEach(function (item) {
      var emailSubItemInput = item.querySelector('input');

      if (emailGlobalUnsub.checked) {
        item.classList.add('disabled');
        emailSubItemInput.setAttribute('disabled', 'disabled');
        emailSubItemInput.checked = false;
      } else {
        item.classList.remove('disabled');
        emailSubItemInput.removeAttribute('disabled');
      }
    });
  }

  // Execute JavaScript on document ready
  domReady(function () {
    if (!document.body) {
      return;
    } else {
      // Function dependent on the mobile hamburger
      if (hamburger && headerNav) {
        hamburger.addEventListener('click', toggleNav);

        // Close when following a link (anchors like #contacto stay on the page)
        headerNav.addEventListener('click', function (event) {
          var link = event.target.closest('a[href]');

          if (link && link.getAttribute('href') !== '#') {
            setNavOpen(false);
          }
        });

        document.addEventListener('keydown', function (event) {
          if (event.key === 'Escape' && headerNav.classList.contains('is-open')) {
            setNavOpen(false);
            hamburger.focus();
          }
        });

        // Reset state when leaving the mobile breakpoint
        mobileQuery.addEventListener('change', function (event) {
          if (!event.matches) {
            setNavOpen(false);
          }
        });
      }

      // Function dependent on email unsubscribe from all input
      if (emailGlobalUnsub) {
        emailGlobalUnsub.addEventListener('change', toggleDisabled);
      }
    }
  });
})();
