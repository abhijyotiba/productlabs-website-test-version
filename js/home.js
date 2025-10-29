/* ==========================================
   HOME.JS - Product Labs
   Homepage-specific JavaScript (Carousel Logic)
   ========================================== */

// Import parallax module
import { initializeParallax } from './modules/parallax.js';

document.addEventListener("DOMContentLoaded", () => {
  
  // Initialize parallax effect
  initializeParallax();
  
  function initializeCarousel() {
    const track = document.querySelector(".carousel-track");
    if (!track) return; // Exit if carousel doesn't exist on this page

    // Prevent double initialization
    if (track.dataset.initialized === "true") {
      console.log("Carousel already initialized, skipping...");
      return;
    }
    track.dataset.initialized = "true";

    const cards = Array.from(track.children);
    const nextBtn = document.querySelector(".carousel-btn-next");
    const prevBtn = document.querySelector(".carousel-btn-prev");
    
    if (cards.length === 0 || !nextBtn || !prevBtn) return;

    let activeIndex = 0;
    let isAnimating = false;

    // Update carousel positions and classes
    function updateCarousel() {
      cards.forEach((card, index) => {
        // Remove all state classes
        card.classList.remove("active", "prev", "next");
        
        if (index === activeIndex) {
          card.classList.add("active");
        } else if (index === (activeIndex - 1 + cards.length) % cards.length) {
          card.classList.add("prev");
        } else if (index === (activeIndex + 1) % cards.length) {
          card.classList.add("next");
        }
      });
    }

    // Navigate to next card
    function goToNext() {
      if (isAnimating) return;
      isAnimating = true;
      
      activeIndex = (activeIndex + 1) % cards.length;
      updateCarousel();
      
      setTimeout(() => {
        isAnimating = false;
      }, 500);
    }

    // Navigate to previous card
    function goToPrev() {
      if (isAnimating) return;
      isAnimating = true;
      
      activeIndex = (activeIndex - 1 + cards.length) % cards.length;
      updateCarousel();
      
      setTimeout(() => {
        isAnimating = false;
      }, 500);
    }

    // Event listeners
    nextBtn.addEventListener("click", goToNext);
    prevBtn.addEventListener("click", goToPrev);

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "ArrowLeft") goToPrev();
    });

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    track.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });

    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;
      
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Swiped left - go to next
          goToNext();
        } else {
          // Swiped right - go to previous
          goToPrev();
        }
      }
    }

    // Auto-play carousel (optional - commented out by default)
    /*
    let autoplayInterval;
    
    function startAutoplay() {
      autoplayInterval = setInterval(goToNext, 5000); // Change slide every 5 seconds
    }
    
    function stopAutoplay() {
      clearInterval(autoplayInterval);
    }
    
    // Start autoplay
    startAutoplay();
    
    // Pause on hover
    track.addEventListener("mouseenter", stopAutoplay);
    track.addEventListener("mouseleave", startAutoplay);
    
    // Pause on button click
    nextBtn.addEventListener("click", () => {
      stopAutoplay();
      setTimeout(startAutoplay, 10000); // Resume after 10 seconds
    });
    prevBtn.addEventListener("click", () => {
      stopAutoplay();
      setTimeout(startAutoplay, 10000);
    });
    */

    // Initial setup
    updateCarousel();

    // Add indicator dots (optional enhancement)
    createIndicatorDots();

    function createIndicatorDots() {
      const dotsContainer = document.createElement("div");
      dotsContainer.className = "carousel-dots";
      dotsContainer.style.cssText = `
        display: flex;
        justify-content: center;
        gap: 0.5rem;
        margin-top: 2rem;
      `;

      cards.forEach((_, index) => {
        const dot = document.createElement("button");
        dot.className = "carousel-dot";
        dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
        dot.style.cssText = `
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: 2px solid var(--color-text-dark);
          background: transparent;
          cursor: pointer;
          transition: all 0.3s ease;
        `;

        if (index === activeIndex) {
          dot.style.background = "var(--color-text-dark)";
          dot.style.transform = "scale(1.2)";
        }

        dot.addEventListener("click", () => {
          if (isAnimating) return;
          isAnimating = true;
          activeIndex = index;
          updateCarousel();
          updateDots();
          setTimeout(() => {
            isAnimating = false;
          }, 500);
        });

        dotsContainer.appendChild(dot);
      });

      track.parentElement.appendChild(dotsContainer);

      function updateDots() {
        const dots = dotsContainer.querySelectorAll(".carousel-dot");
        dots.forEach((dot, index) => {
          if (index === activeIndex) {
            dot.style.background = "var(--color-text-dark)";
            dot.style.transform = "scale(1.2)";
          } else {
            dot.style.background = "transparent";
            dot.style.transform = "scale(1)";
          }
        });
      }

      // Override updateCarousel to also update dots
      const originalUpdate = updateCarousel;
      updateCarousel = function() {
        originalUpdate();
        updateDots();
      };
    }
  }

  // Initialize carousel immediately on DOM ready
  initializeCarousel();
});
