/* ==========================================
   NAVIGATION MODULE
   Navbar functionality and mobile menu
   ========================================== */

export function initializeNavbar() {
  const navbar = document.getElementById("main-navbar");
  if (!navbar) return;

  // ========== Scroll Behavior ==========
  const handleScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll(); // Check initial state

  // ========== Mobile Menu Toggle ==========
  const mobileToggle = document.getElementById("mobile-menu-btn");
  const mobilePanel = document.getElementById("mobile-menu");
  
  if (mobileToggle && mobilePanel) {
    mobileToggle.addEventListener("click", () => {
      const isActive = mobileToggle.classList.toggle("active");
      mobilePanel.classList.toggle("active");
      mobileToggle.setAttribute("aria-expanded", isActive);
      
      // Prevent body scroll when mobile menu is open
      document.body.style.overflow = isActive ? "hidden" : "";
    });

    // Close mobile menu when clicking a link
    const mobileLinks = mobilePanel.querySelectorAll("a");
    mobileLinks.forEach(link => {
      link.addEventListener("click", () => {
        mobilePanel.classList.remove("active");
        mobileToggle.classList.remove("active");
        mobileToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!navbar.contains(e.target) && mobilePanel.classList.contains("active")) {
        mobilePanel.classList.remove("active");
        mobileToggle.classList.remove("active");
        mobileToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
  }

  // ========== Dropdown Menu ==========
  const dropdowns = navbar.querySelectorAll(".nav-dropdown");
  dropdowns.forEach(dropdown => {
    // Desktop hover behavior is handled by CSS
    // Mobile: toggle on click
    if (window.innerWidth <= 768) {
      const dropdownToggle = dropdown.querySelector(".nav-link");
      dropdownToggle.addEventListener("click", (e) => {
        e.preventDefault();
        dropdown.classList.toggle("active");
      });
    }
  });

  // ========== Smooth Scroll for Anchor Links ==========
  document.addEventListener("click", (e) => {
    const target = e.target.closest('a[href^="#"]');
    if (target && target.getAttribute("href") !== "#") {
      e.preventDefault();
      const targetId = target.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const navbarHeight = 80;
        const targetPosition = targetElement.offsetTop - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });
      }
    }
  });
}

// ========== Back to Top Button ==========
export function initializeBackToTop() {
  const backToTopBtn = document.createElement("button");
  backToTopBtn.className = "back-to-top";
  backToTopBtn.setAttribute("aria-label", "Back to top");
  document.body.appendChild(backToTopBtn);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}
