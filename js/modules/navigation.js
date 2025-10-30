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

  // ========== Mobile Menu Toggle (Enhanced) ==========
  const mobileToggle = document.getElementById("mobile-menu-btn");
  const mobilePanel = document.getElementById("mobile-menu");
  
  // Create backdrop element
  let mobileBackdrop = document.querySelector(".mobile-menu-backdrop");
  if (!mobileBackdrop && mobilePanel) {
    mobileBackdrop = document.createElement("div");
    mobileBackdrop.className = "mobile-menu-backdrop";
    document.body.appendChild(mobileBackdrop);
  }
  
  if (mobileToggle && mobilePanel && mobileBackdrop) {
    const closeMobileMenu = () => {
      mobilePanel.classList.remove("active");
      mobileToggle.classList.remove("active");
      mobileBackdrop.classList.remove("active");
      mobileToggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    };

    const openMobileMenu = () => {
      mobilePanel.classList.add("active");
      mobileToggle.classList.add("active");
      mobileBackdrop.classList.add("active");
      mobileToggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    };

    mobileToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isActive = mobileToggle.classList.contains("active");
      if (isActive) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Close mobile menu when clicking a link
    const mobileLinks = mobilePanel.querySelectorAll("a");
    mobileLinks.forEach(link => {
      link.addEventListener("click", closeMobileMenu);
    });

    // Close mobile menu when clicking backdrop
    mobileBackdrop.addEventListener("click", closeMobileMenu);

    // Close mobile menu on ESC key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobilePanel.classList.contains("active")) {
        closeMobileMenu();
      }
    });
  }

  // ========== Active Page Indicator ==========
  const currentPage = window.location.pathname;
  const navLinks = navbar.querySelectorAll(".nav-link");
  
  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href && (currentPage === href || currentPage.endsWith(href))) {
      link.classList.add("active");
    }
  });

  // Also mark mobile menu links
  if (mobilePanel) {
    const mobileNavLinks = mobilePanel.querySelectorAll("a");
    mobileNavLinks.forEach(link => {
      const href = link.getAttribute("href");
      if (href && (currentPage === href || currentPage.endsWith(href))) {
        link.classList.add("active");
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
