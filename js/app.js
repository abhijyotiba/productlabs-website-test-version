/* ==========================================
   MAIN.JS - Product Labs
   Modular JavaScript Entry Point
   ========================================== */

import { initializeNavbar, initializeBackToTop } from './modules/navigation.js';
import { setupScrollAnimations, initializeParallax, fadeInOnLoad } from './modules/animations.js';
import { initializeContactForm, initializeNewsletterForm, initializeFormAnimations } from './modules/forms.js';
import { initializeCarousel, initializeGallery } from './modules/carousel.js';

// ========== Component Loader ==========
const loadComponent = (selector, url) => {
  const element = document.querySelector(selector);
  if (element) {
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`Failed to load ${url}`);
        return res.text();
      })
      .then(data => {
        element.innerHTML = data;
        
        // Initialize navbar after loading
        if (selector === "#navbar-placeholder") {
          initializeNavbar();
        }
      })
      .catch(err => {
        console.error(`Error loading component ${url}:`, err);
      });
  }
};

// ========== Initialize Application ==========
document.addEventListener("DOMContentLoaded", () => {
  
  // Load components
  loadComponent("#navbar-placeholder", "/components/navbar.html");
  loadComponent("#footer-placeholder", "/components/footer.html");

  // Initialize modules after short delay (ensure DOM is ready)
  setTimeout(() => {
    // Navigation & UI
    initializeBackToTop();
    
    // Animations
    setupScrollAnimations();
    initializeParallax();
    fadeInOnLoad();
    
    // Forms
    initializeContactForm();
    initializeNewsletterForm();
    initializeFormAnimations();
    
    // Interactive components
    initializeCarousel();
    initializeGallery(".gallery");
    
  }, 100);

  // Welcome message
  console.log(
    "%c👋 Welcome to Product Labs!",
    "font-size: 20px; font-weight: bold; color: #3F3F3F;"
  );
  console.log(
    "%cBuilt with modern modular architecture",
    "font-size: 14px; color: #9F9EA1;"
  );
});

// ========== Export for use in other scripts ==========
export { loadComponent };
