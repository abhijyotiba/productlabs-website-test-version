/**
 * Image Loading Enhancements
 * Adds smooth loading transitions for images
 */

(function() {
  'use strict';

  /**
   * Initialize image loading enhancements
   */
  function initImageLoading() {
    // Select all images that should have loading animation
    const images = document.querySelectorAll('.carousel-card-image, .product-card-image, img[loading="lazy"]');
    
    images.forEach(img => {
      // Skip if image is already loaded
      if (img.complete && img.naturalHeight !== 0) {
        img.classList.add('loaded');
        const wrapper = img.closest('.carousel-card-image-wrapper, .product-card-image-wrapper');
        if (wrapper) {
          wrapper.classList.remove('loading');
        }
        return;
      }
      
      // Add loading class to wrapper
      const wrapper = img.closest('.carousel-card-image-wrapper, .product-card-image-wrapper');
      if (wrapper) {
        wrapper.classList.add('loading');
      }
      
      // Listen for image load
      img.addEventListener('load', function() {
        img.classList.add('loaded');
        if (wrapper) {
          wrapper.classList.remove('loading');
        }
      }, { once: true });
      
      // Handle error case
      img.addEventListener('error', function() {
        if (wrapper) {
          wrapper.classList.remove('loading');
        }
      }, { once: true });
    });
  }

  /**
   * Initialize button icon animations
   */
  function initButtonIconAnimations() {
    const buttonsWithIcons = document.querySelectorAll('.btn-icon');
    
    buttonsWithIcons.forEach(button => {
      // Add hover effect for arrow icons
      const icon = button.querySelector('svg');
      if (icon) {
        button.addEventListener('mouseenter', function() {
          icon.style.transform = 'translateX(4px)';
        });
        
        button.addEventListener('mouseleave', function() {
          icon.style.transform = 'translateX(0)';
        });
      }
    });
  }

  /**
   * Add smooth scroll behavior for hero scroll indicator
   */
  function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
      scrollIndicator.addEventListener('click', function() {
        const nextSection = document.querySelector('#services, .section-padding');
        if (nextSection) {
          nextSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    }
  }

  /**
   * Initialize all enhancements when DOM is ready
   */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initImageLoading();
      initButtonIconAnimations();
      initScrollIndicator();
    });
  } else {
    // DOM already loaded
    initImageLoading();
    initButtonIconAnimations();
    initScrollIndicator();
  }

  // Re-initialize on dynamic content load
  window.addEventListener('load', function() {
    initImageLoading();
  });

})();
