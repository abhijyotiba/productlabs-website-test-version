/* ==========================================
   MAIN.JS - Product Labs
   Global JavaScript for Component Loading & Animations
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {
  
  // ========== 1. Load Reusable Components ==========
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
          // After navbar loads, initialize navbar logic
          if (selector === "#navbar-placeholder") {
            initializeNavbar();
          }
        })
        .catch(err => {
          console.error(`Error loading component ${url}:`, err);
        });
    }
  };
  
  loadComponent("#navbar-placeholder", "/components/navbar.html");
  loadComponent("#footer-placeholder", "/components/footer.html");

  // ========== 2. Navbar Logic ==========
  function initializeNavbar() {
    const navbar = document.getElementById("main-navbar");
    if (!navbar) return;

    // Scroll behavior
    const handleScroll = () => {
      if (window.scrollY > 20) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    // Mobile menu toggle
    const mobileBtn = document.getElementById("mobile-menu-btn");
    const mobilePanel = document.getElementById("mobile-menu");
    
    if (mobileBtn && mobilePanel) {
      mobileBtn.addEventListener("click", () => {
        mobilePanel.classList.toggle("open");
        const isOpen = mobilePanel.classList.contains("open");
        mobileBtn.setAttribute("aria-expanded", isOpen);
        mobileBtn.textContent = isOpen ? "✕" : "☰";
      });

      // Close mobile menu when clicking a link
      const mobileLinks = mobilePanel.querySelectorAll("a");
      mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
          mobilePanel.classList.remove("open");
          mobileBtn.setAttribute("aria-expanded", "false");
          mobileBtn.textContent = "☰";
        });
      });
    }
  }

  // ========== 3. Scroll Animations (Intersection Observer) ==========
  function setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1, // Trigger when 10% of element is visible
      rootMargin: "0px 0px -50px 0px" // Trigger slightly before element enters viewport
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          
          // If it's a stat card, trigger counter animation
          if (entry.target.classList.contains("stat-card")) {
            animateCounter(entry.target);
          }
          
          // Unobserve after animation (animate only once)
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll(".animate-on-scroll, .animate-fade-scale, .animate-slide-left, .animate-slide-right");
    animatedElements.forEach(el => observer.observe(el));

    // Observe stat cards for counter animation
    const statCards = document.querySelectorAll(".stat-card");
    statCards.forEach(card => observer.observe(card));
  }

  // Initialize scroll animations after a short delay to ensure DOM is ready
  setTimeout(setupScrollAnimations, 100);

  // ========== 4. Counter Animation for Stats ==========
  function animateCounter(card) {
    const numberElement = card.querySelector(".stat-number");
    if (!numberElement) return;

    const targetText = numberElement.textContent;
    const targetNumber = parseInt(targetText.replace(/\D/g, ""), 10);
    
    if (isNaN(targetNumber)) return;

    const suffix = targetText.replace(/[\d,]/g, ""); // Extract + or % or other suffix
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = targetNumber / steps;
    let current = 0;
    let step = 0;

    numberElement.classList.add("counting");

    const timer = setInterval(() => {
      step++;
      current += increment;
      
      if (step >= steps) {
        current = targetNumber;
        clearInterval(timer);
        numberElement.classList.remove("counting");
      }
      
      numberElement.textContent = Math.floor(current) + suffix;
    }, duration / steps);
  }

  // ========== 5. Smooth Scroll for Anchor Links ==========
  document.addEventListener("click", (e) => {
    const target = e.target.closest('a[href^="#"]');
    if (target && target.getAttribute("href") !== "#") {
      e.preventDefault();
      const targetId = target.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const navbarHeight = 80; // Account for fixed navbar
        const targetPosition = targetElement.offsetTop - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });
      }
    }
  });

  // ========== 6. Form Validation (if contact form exists) ==========
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      // Basic validation
      const name = contactForm.querySelector("#name").value.trim();
      const email = contactForm.querySelector("#email").value.trim();
      const message = contactForm.querySelector("#message").value.trim();
      
      if (!name || !email || !message) {
        alert("Please fill in all required fields.");
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }
      
      // Simulate form submission
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";
      
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        alert("Thank you! Your message has been sent. We'll respond within 24 hours.");
        contactForm.reset();
      }, 1500);
    });
  }

  // ========== 7. Console Welcome Message ==========
  console.log(
    "%c👋 Welcome to Product Labs!",
    "font-size: 20px; font-weight: bold; color: #111827;"
  );
  console.log(
    "%cBuilt with modern web standards - HTML, CSS, and JavaScript",
    "font-size: 14px; color: #6B7280;"
  );
});