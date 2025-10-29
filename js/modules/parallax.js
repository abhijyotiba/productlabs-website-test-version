/* ==========================================
   PARALLAX MODULE
   Smooth parallax scrolling effects
   ========================================== */

export function initializeParallax() {
  const heroSection = document.querySelector('.hero-section');
  const heroContent = document.querySelector('.hero-content');
  const heroVideo = document.querySelector('.hero-video-wrapper video');
  
  if (!heroSection || !heroContent) return;

  let ticking = false;

  function updateParallax() {
    const scrolled = window.pageYOffset;
    const limit = heroSection.offsetHeight;

    if (scrolled <= limit) {
      // Move video slower than scroll for depth effect
      if (heroVideo) {
        heroVideo.style.transform = `translateY(${scrolled * 0.5}px) translateZ(0)`;
      }

      // Move content slightly for parallax
      if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        // Fade out as we scroll
        const opacity = 1 - (scrolled / limit) * 1.5;
        heroContent.style.opacity = Math.max(0, opacity);
      }
    }

    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  // Use passive listener for better performance
  window.addEventListener('scroll', requestTick, { passive: true });
  
  // Initial call
  updateParallax();
}

/* ==========================================
   SMOOTH REVEAL ON SCROLL
   Enhanced intersection observer
   ========================================== */

export function initializeSmoothReveal() {
  const elements = document.querySelectorAll('[data-reveal]');
  
  if (elements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, index * 100); // Stagger by 100ms
        
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

/* Add revealed class styles */
const style = document.createElement('style');
style.textContent = `
  [data-reveal].revealed {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(style);
