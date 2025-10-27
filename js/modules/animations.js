/* ==========================================
   ANIMATIONS MODULE
   Scroll animations and Intersection Observer
   ========================================== */

// ========== Setup Scroll Animations ==========
export function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
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
  const animationClasses = [
    ".animate-on-scroll",
    ".animate-fade-scale",
    ".animate-slide-left",
    ".animate-slide-right",
    ".fade-in-up",
    ".fade-in-down",
    ".fade-in-left",
    ".fade-in-right",
    ".scale-in",
    ".flip-in-x",
    ".flip-in-y"
  ];

  animationClasses.forEach(className => {
    const elements = document.querySelectorAll(className);
    elements.forEach(el => observer.observe(el));
  });

  // Observe stat cards for counter animation
  const statCards = document.querySelectorAll(".stat-card");
  statCards.forEach(card => observer.observe(card));
}

// ========== Counter Animation for Stats ==========
export function animateCounter(card) {
  const numberElement = card.querySelector(".stat-number");
  if (!numberElement || numberElement.dataset.animated === "true") return;

  const targetText = numberElement.textContent;
  const targetNumber = parseInt(targetText.replace(/\D/g, ""), 10);
  
  if (isNaN(targetNumber)) return;

  const suffix = targetText.replace(/[\d,]/g, "");
  const duration = 2000;
  const steps = 60;
  const increment = targetNumber / steps;
  let current = 0;
  let step = 0;

  numberElement.classList.add("counting");
  numberElement.dataset.animated = "true";

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

// ========== Parallax Effect ==========
export function initializeParallax() {
  const parallaxElements = document.querySelectorAll("[data-parallax]");
  
  if (parallaxElements.length === 0) return;

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;

    parallaxElements.forEach(element => {
      const speed = element.dataset.parallax || 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  });
}

// ========== Stagger Animation for Grids ==========
export function staggerAnimation(selector, delay = 100) {
  const elements = document.querySelectorAll(selector);
  
  elements.forEach((element, index) => {
    element.style.animationDelay = `${index * delay}ms`;
  });
}

// ========== Hover Tilt Effect ==========
export function initializeTiltEffect(selector) {
  const elements = document.querySelectorAll(selector);
  
  elements.forEach(element => {
    element.addEventListener("mousemove", (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    element.addEventListener("mouseleave", () => {
      element.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
    });
  });
}

// ========== Fade In on Load ==========
export function fadeInOnLoad() {
  const elements = document.querySelectorAll(".fade-on-load");
  
  elements.forEach((element, index) => {
    setTimeout(() => {
      element.classList.add("visible");
    }, index * 100);
  });
}
