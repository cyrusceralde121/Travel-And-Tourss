document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. MODAL WINDOW CONTROLS
  // ==========================================
  const viewBtns = document.querySelectorAll(".btn-view-details");
  const closeBtns = document.querySelectorAll(".close-modal");
  const modalOverlays = document.querySelectorAll(".modal-overlay");

  // Helper: Pause all playing videos
  const stopAllVideos = () => {
    document.querySelectorAll(".modal-overlay video").forEach((video) => {
      video.pause();
      video.currentTime = 0;
    });
  };

  // Helper: Force close every open modal
  const closeAllModals = () => {
    stopAllVideos();
    modalOverlays.forEach((modal) => {
      modal.style.display = "none";
    });
    document.body.style.overflow = ""; // Restore page scrolling
  };

  // Open modal handler
  viewBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      // Close any currently active modal first
      closeAllModals();

      const targetId = btn.getAttribute("data-target");
      const targetModal = document.getElementById(targetId);

      if (targetModal) {
        targetModal.style.display = "flex";
        document.body.style.overflow = "hidden"; // Prevent background scroll
      }
    });
  });

  // Close modal via 'X' button
  closeBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeAllModals();
    });
  });

  // Close modal when clicking dark overlay background
  modalOverlays.forEach((overlay) => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        closeAllModals();
      }
    });
  });

  // Close modal on Escape key
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      // Close fullscreen lightbox if open, otherwise close modal
      if (lightboxOverlay && lightboxOverlay.style.display === "flex") {
        lightboxOverlay.style.display = "none";
      } else {
        closeAllModals();
      }
    }
  });


  // ==========================================
  // 2. HOKKAIDO SLIDE VIEWER CAROUSEL
  // ==========================================
  const totalSlides = 9;
  let currentSlideIndex = 1;

  const mainSlideImg = document.getElementById("hokkaido-active-slide");
  const counterEl = document.getElementById("current-slide-num");
  const thumbs = document.querySelectorAll(".slide-thumbnails .thumb");
  const prevBtn = document.querySelector(".prev-slide");
  const nextBtn = document.querySelector(".next-slide");

  function updateSlide(index) {
    if (!mainSlideImg) return;

    // Loop bounds
    if (index < 1) index = totalSlides;
    if (index > totalSlides) index = 1;

    currentSlideIndex = index;

    // Smooth transition
    mainSlideImg.style.opacity = "0.3";
    setTimeout(() => {
      mainSlideImg.src = `./assets/images/hokkaido-slide-${currentSlideIndex}.jpg`;
      mainSlideImg.style.opacity = "1";
    }, 120);

    if (counterEl) counterEl.textContent = currentSlideIndex;

    // Update thumbnail highlights
    thumbs.forEach((thumb) => {
      const thumbIndex = parseInt(thumb.dataset.index);
      if (thumbIndex === currentSlideIndex) {
        thumb.classList.add("active");
        thumb.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      } else {
        thumb.classList.remove("active");
      }
    });

    // Keep fullscreen lightbox in sync if it's currently open
    if (lightboxOverlay && lightboxOverlay.style.display === "flex") {
      syncLightbox();
    }
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      updateSlide(currentSlideIndex - 1);
    });

    nextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      updateSlide(currentSlideIndex + 1);
    });

    thumbs.forEach((thumb) => {
      thumb.addEventListener("click", (e) => {
        e.stopPropagation();
        const selectedIndex = parseInt(thumb.dataset.index);
        updateSlide(selectedIndex);
      });
    });
  }


  // ==========================================
  // 3. FULLSCREEN LIGHTBOX CONTROLS
  // ==========================================
  const openLbBtn = document.getElementById("open-slide-fullscreen");
  const closeLbBtn = document.getElementById("close-slide-fullscreen");
  const lightboxOverlay = document.getElementById("slide-lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lbCounter = document.getElementById("lb-current-num");
  const prevLbBtn = document.querySelector(".prev-lb");
  const nextLbBtn = document.querySelector(".next-lb");

  function syncLightbox() {
    if (!lightboxImg) return;
    lightboxImg.src = `./assets/images/hokkaido-slide-${currentSlideIndex}.jpg`;
    if (lbCounter) lbCounter.textContent = currentSlideIndex;
  }

  if (openLbBtn && lightboxOverlay) {
    openLbBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      syncLightbox();
      lightboxOverlay.style.display = "flex";
    });

    if (closeLbBtn) {
      closeLbBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        lightboxOverlay.style.display = "none";
      });
    }

    lightboxOverlay.addEventListener("click", (e) => {
      if (e.target === lightboxOverlay) {
        lightboxOverlay.style.display = "none";
      }
    });

    if (prevLbBtn && nextLbBtn) {
      prevLbBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        updateSlide(currentSlideIndex - 1);
      });

      nextLbBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        updateSlide(currentSlideIndex + 1);
      });
    }
  }


  // ==========================================
  // 4. NAVBAR MOBILE CONTROLS
  // ==========================================
  const navOpenBtn = document.querySelector("[data-nav-open-btn]");
  const navCloseBtn = document.querySelector("[data-nav-close-btn]");
  const navbar = document.querySelector("[data-navbar]");
  const overlay = document.querySelector("[data-overlay]");

  const navElemArr = [navOpenBtn, navCloseBtn, overlay];

  for (let i = 0; i < navElemArr.length; i++) {
    if (navElemArr[i]) {
      navElemArr[i].addEventListener("click", () => {
        if (navbar) navbar.classList.toggle("active");
        if (overlay) overlay.classList.toggle("active");
      });
    }
  }
});