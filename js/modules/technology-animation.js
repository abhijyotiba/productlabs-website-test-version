/**
 * How Our Technology Works - Animated Progress Bar
 * Handles the progress animation and sprint phase highlighting
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    progressIncrement: 2, // Percentage increase per interval
    intervalDuration: 100, // Milliseconds between updates
    pauseDuration: 500, // Pause at 100% before reset
    totalPhases: 4 // Number of sprint phases
  };

  // State
  let progressValue = 0;
  let animationInterval = null;
  let progressFillElement = null;
  let sprintPhases = [];
  let isAnimating = false;

  /**
   * Initialize the animation when DOM is ready
   */
  function init() {
    // Get DOM elements
    progressFillElement = document.getElementById('techProgressFill');
    sprintPhases = document.querySelectorAll('.sprint-phase');

    // Check if elements exist
    if (!progressFillElement || sprintPhases.length === 0) {
      console.warn('Technology works section elements not found');
      return;
    }

    // Start animation when section is visible
    setupIntersectionObserver();
  }

  /**
   * Setup Intersection Observer to start animation when visible
   */
  function setupIntersectionObserver() {
    const section = document.getElementById('technology-works');
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isAnimating) {
            startAnimation();
          } else if (!entry.isIntersecting && isAnimating) {
            stopAnimation();
          }
        });
      },
      {
        threshold: 0.3, // Start when 30% of section is visible
        rootMargin: '0px'
      }
    );

    observer.observe(section);
  }

  /**
   * Start the progress animation
   */
  function startAnimation() {
    isAnimating = true;
    animateProgress();
  }

  /**
   * Stop the progress animation
   */
  function stopAnimation() {
    if (animationInterval) {
      clearInterval(animationInterval);
      animationInterval = null;
    }
    isAnimating = false;
  }

  /**
   * Main animation loop
   */
  function animateProgress() {
    // Reset progress
    progressValue = 0;
    updateProgressBar();
    updateActivePhase();

    // Clear any existing interval
    if (animationInterval) {
      clearInterval(animationInterval);
    }

    // Start new interval
    animationInterval = setInterval(() => {
      if (progressValue >= 100) {
        // Pause at 100%, then restart
        clearInterval(animationInterval);
        setTimeout(() => {
          if (isAnimating) {
            animateProgress();
          }
        }, CONFIG.pauseDuration);
        return;
      }

      // Increment progress
      progressValue += CONFIG.progressIncrement;
      
      // Ensure we don't exceed 100%
      if (progressValue > 100) {
        progressValue = 100;
      }

      // Update UI
      updateProgressBar();
      updateActivePhase();
    }, CONFIG.intervalDuration);
  }

  /**
   * Update the progress bar visual
   */
  function updateProgressBar() {
    if (progressFillElement) {
      progressFillElement.style.width = `${progressValue}%`;
    }
  }

  /**
   * Update which sprint phase is active based on progress
   */
  function updateActivePhase() {
    if (sprintPhases.length === 0) return;

    // Calculate which phase should be active
    // 0-25%: Phase 0 (Planning)
    // 25-50%: Phase 1 (Development)
    // 50-75%: Phase 2 (Testing)
    // 75-100%: Phase 3 (Review)
    const phaseIndex = Math.min(
      Math.floor(progressValue / (100 / CONFIG.totalPhases)),
      CONFIG.totalPhases - 1
    );

    // Update active class on phases
    sprintPhases.forEach((phase, index) => {
      if (index === phaseIndex) {
        phase.classList.add('active');
      } else {
        phase.classList.remove('active');
      }
    });
  }

  /**
   * Cleanup function
   */
  function cleanup() {
    stopAnimation();
    progressValue = 0;
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Cleanup on page unload
  window.addEventListener('beforeunload', cleanup);

  // Expose for debugging (optional)
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.TechnologyWorksAnimation = {
      start: startAnimation,
      stop: stopAnimation,
      getProgress: () => progressValue,
      setProgress: (value) => {
        progressValue = Math.max(0, Math.min(100, value));
        updateProgressBar();
        updateActivePhase();
      }
    };
  }
})();
