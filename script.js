document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. MODAL WINDOW CONTROLS
  // ==========================================
  const viewBtns = document.querySelectorAll(".btn-view-details");
  const closeBtns = document.querySelectorAll(".close-modal");
  const modalOverlays = document.querySelectorAll(".modal-overlay");

  const stopAllVideos = () => {
    document.querySelectorAll(".modal-overlay video").forEach((video) => {
      video.pause();
      video.currentTime = 0;
    });
  };

  const closeAllModals = () => {
    stopAllVideos();
    modalOverlays.forEach((modal) => {
      modal.style.display = "none";
    });
    document.body.style.overflow = "";
  };

  viewBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeAllModals();

      const targetId = btn.getAttribute("data-target");
      const targetModal = document.getElementById(targetId);

      if (targetModal) {
        targetModal.style.display = "flex";
        document.body.style.overflow = "hidden";
      }
    });
  });

  closeBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeAllModals();
    });
  });

  modalOverlays.forEach((overlay) => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        closeAllModals();
      }
    });
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (lightboxOverlay && lightboxOverlay.style.display === "flex") {
        lightboxOverlay.style.display = "none";
      } else {
        closeAllModals();
      }
    }
  });


  // ==========================================
  // 2. PARROTS SLIDE VIEWER (P1.jpg to P9.jpg)
  // ==========================================
  const totalSlides = 9;
  let currentSlideIndex = 1;

  const mainSlideImg = document.getElementById("pvk-main-display");
  const counterEl = document.getElementById("pvk-curr-page");
  const thumbs = document.querySelectorAll(".pvk-thumb-item");
  const prevBtn = document.getElementById("pvk-btn-prev");
  const nextBtn = document.getElementById("pvk-btn-next");

  function updateSlide(index) {
    if (!mainSlideImg) return;

    if (index < 1) index = totalSlides;
    if (index > totalSlides) index = 1;

    currentSlideIndex = index;

    // Smooth fade transition
    mainSlideImg.style.opacity = "0.3";
    setTimeout(() => {
      mainSlideImg.src = `./assets/images/P${currentSlideIndex}.jpg`;
      mainSlideImg.style.opacity = "1";
    }, 120);

    if (counterEl) counterEl.textContent = currentSlideIndex;

    thumbs.forEach((thumb) => {
      const thumbIndex = parseInt(thumb.dataset.idx, 10);
      if (thumbIndex === currentSlideIndex) {
        thumb.classList.add("pvk-is-active");
        thumb.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      } else {
        thumb.classList.remove("pvk-is-active");
      }
    });

    if (lightboxOverlay && lightboxOverlay.style.display === "flex") {
      syncLightbox();
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      updateSlide(currentSlideIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      updateSlide(currentSlideIndex + 1);
    });
  }

  thumbs.forEach((thumb) => {
    thumb.addEventListener("click", (e) => {
      e.stopPropagation();
      const selectedIndex = parseInt(thumb.dataset.idx, 10);
      updateSlide(selectedIndex);
    });
  });


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
    lightboxImg.src = `./assets/images/P${currentSlideIndex}.jpg`;
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