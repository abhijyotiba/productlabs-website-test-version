/* ==========================================
   CAROUSEL MODULE
   Product carousel functionality
   ========================================== */

// ========== Initialize Carousel ==========
export function initializeCarousel() {
  const carousel = document.querySelector(".product-carousel");
  if (!carousel) return;

  const cards = carousel.querySelectorAll(".carousel-card");
  const prevBtn = carousel.querySelector(".carousel-btn-prev");
  const nextBtn = carousel.querySelector(".carousel-btn-next");
  
  if (cards.length === 0) return;

  let currentIndex = 0;
  const totalCards = cards.length;

  // Update carousel state
  function updateCarousel() {
    cards.forEach((card, index) => {
      card.classList.remove("active", "prev", "next");
      
      if (index === currentIndex) {
        card.classList.add("active");
      } else if (index === (currentIndex - 1 + totalCards) % totalCards) {
        card.classList.add("prev");
      } else if (index === (currentIndex + 1) % totalCards) {
        card.classList.add("next");
      }
    });
  }

  // Next slide
  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalCards;
    updateCarousel();
  }

  // Previous slide
  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalCards) % totalCards;
    updateCarousel();
  }

  // Event listeners
  if (nextBtn) {
    nextBtn.addEventListener("click", nextSlide);
  }
  
  if (prevBtn) {
    prevBtn.addEventListener("click", prevSlide);
  }

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
  });

  // Touch/Swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  carousel.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  carousel.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide(); // Swipe left
      } else {
        prevSlide(); // Swipe right
      }
    }
  }

  // Auto-rotate (optional)
  const autoRotate = carousel.dataset.autoRotate !== "false";
  const rotateInterval = parseInt(carousel.dataset.rotateInterval) || 5000;

  if (autoRotate) {
    let autoRotateTimer = setInterval(nextSlide, rotateInterval);

    // Pause on hover
    carousel.addEventListener("mouseenter", () => {
      clearInterval(autoRotateTimer);
    });

    carousel.addEventListener("mouseleave", () => {
      autoRotateTimer = setInterval(nextSlide, rotateInterval);
    });
  }

  // Initialize
  updateCarousel();
}

// ========== Image Gallery ==========
export function initializeGallery(selector) {
  const galleries = document.querySelectorAll(selector);
  
  galleries.forEach(gallery => {
    const images = gallery.querySelectorAll("img");
    
    images.forEach((img, index) => {
      img.addEventListener("click", () => {
        openLightbox(images, index);
      });
      img.style.cursor = "pointer";
    });
  });
}

// ========== Lightbox ==========
function openLightbox(images, startIndex) {
  let currentIndex = startIndex;

  // Create lightbox
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    opacity: 0;
    transition: opacity 0.3s ease;
  `;

  // Create image container
  const imgContainer = document.createElement("div");
  imgContainer.style.cssText = `
    position: relative;
    max-width: 90%;
    max-height: 90%;
  `;

  // Create image
  const img = document.createElement("img");
  img.style.cssText = `
    max-width: 100%;
    max-height: 90vh;
    display: block;
  `;
  img.src = images[currentIndex].src;

  // Create close button
  const closeBtn = document.createElement("button");
  closeBtn.textContent = "×";
  closeBtn.style.cssText = `
    position: absolute;
    top: 20px;
    right: 20px;
    background: white;
    border: none;
    font-size: 2rem;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    z-index: 10001;
  `;

  // Create navigation buttons
  if (images.length > 1) {
    const prevBtn = createNavButton("‹", "left");
    const nextBtn = createNavButton("›", "right");

    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      img.src = images[currentIndex].src;
    });

    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % images.length;
      img.src = images[currentIndex].src;
    });

    lightbox.appendChild(prevBtn);
    lightbox.appendChild(nextBtn);
  }

  // Assemble lightbox
  imgContainer.appendChild(img);
  lightbox.appendChild(imgContainer);
  lightbox.appendChild(closeBtn);
  document.body.appendChild(lightbox);

  // Show lightbox
  setTimeout(() => lightbox.style.opacity = "1", 10);

  // Close handlers
  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  function closeLightbox() {
    lightbox.style.opacity = "0";
    setTimeout(() => lightbox.remove(), 300);
  }

  // Keyboard navigation
  function handleKeydown(e) {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft" && images.length > 1) {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      img.src = images[currentIndex].src;
    }
    if (e.key === "ArrowRight" && images.length > 1) {
      currentIndex = (currentIndex + 1) % images.length;
      img.src = images[currentIndex].src;
    }
  }

  document.addEventListener("keydown", handleKeydown);
  lightbox.addEventListener("remove", () => {
    document.removeEventListener("keydown", handleKeydown);
  });
}

// Helper function to create navigation buttons
function createNavButton(text, side) {
  const btn = document.createElement("button");
  btn.textContent = text;
  btn.style.cssText = `
    position: absolute;
    top: 50%;
    ${side}: 20px;
    transform: translateY(-50%);
    background: white;
    border: none;
    font-size: 3rem;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    cursor: pointer;
    z-index: 10001;
  `;
  return btn;
}
