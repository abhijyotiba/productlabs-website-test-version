/**
 * UNIVERSAL COSMIC BACKGROUND INITIALIZER
 * Dynamically injects cosmic rectangles into any section with data-cosmic attribute
 * Usage: Add data-cosmic="true" to any section element
 * 
 * Example:
 * <section id="my-section" data-cosmic="true" class="section-padding">
 */

(function() {
  'use strict';

  /**
   * Initialize cosmic background for all sections with data-cosmic attribute
   */
  function initCosmicBackgrounds() {
    // Find all sections with data-cosmic attribute
    const cosmicSections = document.querySelectorAll('[data-cosmic="true"]');
    
    if (cosmicSections.length === 0) {
      console.warn('No sections with data-cosmic="true" found.');
      return;
    }

    let successCount = 0;

    cosmicSections.forEach((section) => {
      const sectionId = section.id || section.className || 'unnamed-section';
      
      try {
        // Add cosmic section class
        section.classList.add('cosmic-section');

        // Create 3 asymmetric rectangles with starfield and nebula effects
        const rectangles = [
          { class: 'cosmic-rect cosmic-rect-1', ariaLabel: 'Decorative cosmic rectangle 1' },
          { class: 'cosmic-rect cosmic-rect-2', ariaLabel: 'Decorative cosmic rectangle 2' },
          { class: 'cosmic-rect cosmic-rect-3', ariaLabel: 'Decorative cosmic rectangle 3' }
        ];

        rectangles.forEach((rectConfig) => {
          const rect = document.createElement('div');
          rect.className = rectConfig.class;
          rect.setAttribute('aria-hidden', 'true');
          rect.setAttribute('role', 'presentation');
          rect.setAttribute('aria-label', rectConfig.ariaLabel);
          
          // Insert at the beginning of section (behind content)
          section.insertBefore(rect, section.firstChild);
        });

        successCount++;
        console.log(`✨ Cosmic background initialized for: ${sectionId}`);
      } catch (error) {
        console.error(`❌ Failed to initialize cosmic background for ${sectionId}:`, error);
      }
    });

    if (successCount > 0) {
      console.log(`🌟 ${successCount} cosmic background(s) initialized successfully`);
    }
  }

  /**
   * Check if user prefers reduced motion
   * If yes, disable animations for accessibility
   */
  function handleReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
      document.documentElement.style.setProperty('--cosmic-animation-duration', '0s');
      console.log('♿ Reduced motion detected - cosmic animations disabled');
    }

    // Listen for changes in motion preferences
    prefersReducedMotion.addEventListener('change', (e) => {
      if (e.matches) {
        document.documentElement.style.setProperty('--cosmic-animation-duration', '0s');
        console.log('♿ Reduced motion enabled - cosmic animations disabled');
      } else {
        document.documentElement.style.removeProperty('--cosmic-animation-duration');
        console.log('♿ Reduced motion disabled - cosmic animations enabled');
      }
    });
  }

  /**
   * Performance monitoring
   * Remove cosmic effects if performance is poor
   */
  function monitorPerformance() {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        // Check if device is low-end
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        
        if (connection && connection.saveData) {
          // User has data saver enabled - reduce visual effects
          const cosmicSections = document.querySelectorAll('.cosmic-section');
          cosmicSections.forEach(section => {
            const rects = section.querySelectorAll('.cosmic-rect');
            rects.forEach(rect => {
              rect.style.opacity = '0.3';
              rect.style.animation = 'none';
            });
          });
          console.log('📊 Data saver detected - cosmic effects reduced');
        }
      });
    }
  }

  /**
   * Helper function to add cosmic background to specific section by ID
   * @param {string} sectionId - The ID of the section element
   */
  function addCosmicToSection(sectionId) {
    const section = document.getElementById(sectionId);
    
    if (!section) {
      console.error(`❌ Section with ID "${sectionId}" not found`);
      return false;
    }

    // Add data-cosmic attribute if not present
    if (!section.hasAttribute('data-cosmic')) {
      section.setAttribute('data-cosmic', 'true');
    }

    // Add cosmic section class
    section.classList.add('cosmic-section');

    // Create rectangles
    const rectangles = [
      { class: 'cosmic-rect cosmic-rect-1', ariaLabel: 'Decorative cosmic rectangle 1' },
      { class: 'cosmic-rect cosmic-rect-2', ariaLabel: 'Decorative cosmic rectangle 2' },
      { class: 'cosmic-rect cosmic-rect-3', ariaLabel: 'Decorative cosmic rectangle 3' }
    ];

    rectangles.forEach((rectConfig) => {
      const rect = document.createElement('div');
      rect.className = rectConfig.class;
      rect.setAttribute('aria-hidden', 'true');
      rect.setAttribute('role', 'presentation');
      rect.setAttribute('aria-label', rectConfig.ariaLabel);
      
      // Insert at the beginning of section (behind content)
      section.insertBefore(rect, section.firstChild);
    });

    console.log(`✨ Cosmic background added to section: ${sectionId}`);
    return true;
  }

  /**
   * Initialize on DOM ready
   */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initCosmicBackgrounds();
      handleReducedMotion();
      monitorPerformance();
    });
  } else {
    // DOM already loaded
    initCosmicBackgrounds();
    handleReducedMotion();
    monitorPerformance();
  }

  /**
   * Expose to global scope for manual control
   */
  window.CosmicBackground = {
    init: initCosmicBackgrounds,
    addToSection: addCosmicToSection,
    version: '1.0.0',
    status: 'active'
  };

})();
