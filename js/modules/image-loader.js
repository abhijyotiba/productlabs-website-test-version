/* ==========================================
   IMAGE LAZY LOADING MODULE
   Progressive image loading with fade-in
   ========================================== */

export function initializeLazyLoading() {
  // Check if browser supports IntersectionObserver
  if (!('IntersectionObserver' in window)) {
    // Fallback: load all images immediately
    loadAllImages();
    return;
  }

  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  
  if (lazyImages.length === 0) return;

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        loadImage(img);
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px' // Start loading 50px before image enters viewport
  });

  lazyImages.forEach(img => {
    imageObserver.observe(img);
  });
}

function loadImage(img) {
  // If image has data-src, use it as the source
  const src = img.dataset.src || img.src;
  
  // Create a new image to preload
  const imageLoader = new Image();
  
  imageLoader.onload = () => {
    img.src = src;
    img.classList.add('loaded');
    
    // Remove data-src after loading
    if (img.dataset.src) {
      delete img.dataset.src;
    }
  };
  
  imageLoader.onerror = () => {
    // Fallback: still show the image even if there's an error
    img.src = src;
    img.classList.add('loaded', 'error');
  };
  
  imageLoader.src = src;
}

function loadAllImages() {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  lazyImages.forEach(img => {
    if (img.dataset.src) {
      img.src = img.dataset.src;
      delete img.dataset.src;
    }
    img.classList.add('loaded');
  });
}

/* ==========================================
   BLUR-UP IMAGE LOADING
   Low-quality placeholder that blurs up
   ========================================== */

export function initializeBlurUpImages() {
  const blurUpImages = document.querySelectorAll('[data-blur-up]');
  
  if (blurUpImages.length === 0) return;

  blurUpImages.forEach(container => {
    const img = container.querySelector('img');
    const placeholder = container.dataset.blurUp;
    
    if (!img || !placeholder) return;

    // Create placeholder
    const placeholderImg = document.createElement('img');
    placeholderImg.src = placeholder;
    placeholderImg.className = 'blur-up-placeholder';
    placeholderImg.style.cssText = `
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: blur(20px);
      transform: scale(1.1);
      transition: opacity 0.5s ease;
    `;
    
    container.style.position = 'relative';
    container.insertBefore(placeholderImg, img);
    
    // Set main image styles
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.5s ease';
    
    // Load main image
    const fullImage = new Image();
    fullImage.onload = () => {
      img.src = fullImage.src;
      img.style.opacity = '1';
      
      // Fade out placeholder
      setTimeout(() => {
        placeholderImg.style.opacity = '0';
        setTimeout(() => placeholderImg.remove(), 500);
      }, 100);
    };
    
    fullImage.src = img.dataset.src || img.src;
  });
}

/* ==========================================
   RESPONSIVE IMAGES
   Load different images based on viewport
   ========================================== */

export function initializeResponsiveImages() {
  const responsiveImages = document.querySelectorAll('[data-responsive]');
  
  if (responsiveImages.length === 0) return;

  function updateImages() {
    const width = window.innerWidth;
    
    responsiveImages.forEach(img => {
      const sources = JSON.parse(img.dataset.responsive);
      let selectedSrc = sources.default;
      
      // Find the appropriate image source
      if (width <= 768 && sources.mobile) {
        selectedSrc = sources.mobile;
      } else if (width <= 1024 && sources.tablet) {
        selectedSrc = sources.tablet;
      } else if (sources.desktop) {
        selectedSrc = sources.desktop;
      }
      
      // Only update if source changed
      if (img.src !== selectedSrc) {
        img.src = selectedSrc;
      }
    });
  }
  
  // Update on load
  updateImages();
  
  // Update on resize (debounced)
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(updateImages, 250);
  });
}

/* ==========================================
   INITIALIZE ALL IMAGE FEATURES
   ========================================== */

export function initializeImageOptimizations() {
  initializeLazyLoading();
  initializeBlurUpImages();
  initializeResponsiveImages();
}
