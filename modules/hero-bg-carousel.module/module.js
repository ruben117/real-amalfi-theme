(function () {
  /**
   * Hero Background Carousel
   * Controlador ligero para transiciones de imágenes de fondo.
   */

  function initHeroCarousel(carouselEl) {
    var track = carouselEl.querySelector('[data-hero-bg-track]');
    var slides = Array.from(carouselEl.querySelectorAll('.hero-bg-carousel__slide'));
    var isAutoplay = carouselEl.getAttribute('data-autoplay') === 'true';
    var delay = parseInt(carouselEl.getAttribute('data-autoplay-delay') || '5000', 10);
    var transitionType = carouselEl.getAttribute('data-transition-type') || 'fade';
    var totalSlides = slides.length;

    if (totalSlides <= 1) return;

    var currentIndex = 0;
    var timer = null;

    function showSlide(index) {
      if (index >= totalSlides) {
        index = 0;
      } else if (index < 0) {
        index = totalSlides - 1;
      }
      currentIndex = index;

      if (transitionType === 'fade') {
        slides.forEach(function (slide, i) {
          if (i === currentIndex) {
            slide.classList.add('is-active');
          } else {
            slide.classList.remove('is-active');
          }
        });
      } else if (transitionType === 'slide') {
        if (track) {
          track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
        }
      }
    }

    function startTimer() {
      stopTimer();
      timer = setInterval(function () {
        showSlide(currentIndex + 1);
      }, delay);
    }

    function stopTimer() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    // Inicializar timer si autoplay está activo
    if (isAutoplay) {
      startTimer();
    }
  }

  function init() {
    var carousels = document.querySelectorAll('[data-hero-bg-carousel]');
    carousels.forEach(initHeroCarousel);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
