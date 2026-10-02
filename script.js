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
  // 2. MODAL SLIDE VIEWER (INSIDE MODAL)
  // ==========================================
  const modalSlideImg = document.getElementById("hokkaido-active-slide");
  const modalCounterEl = document.getElementById("current-slide-num");
  const modalThumbs = document.querySelectorAll(".slide-viewer-wrapper .slide-thumbnails .thumb");
  const modalPrevBtn = document.querySelector(".slide-viewer-wrapper .prev-slide");
  const modalNextBtn = document.querySelector(".slide-viewer-wrapper .next-slide");

  let modalSlideIndex = 1;
  const modalTotalSlides = 9;

  function updateModalSlide(index) {
    if (!modalSlideImg) return;

    if (index < 1) index = modalTotalSlides;
    if (index > modalTotalSlides) index = 1;

    modalSlideIndex = index;

    modalSlideImg.style.opacity = "0.3";
    setTimeout(() => {
      // Use your modal image source format
      modalSlideImg.src = `./assets/images/hokkaido-slide-${modalSlideIndex}.jpg`;
      modalSlideImg.style.opacity = "1";
    }, 120);

    if (modalCounterEl) modalCounterEl.textContent = modalSlideIndex;

    modalThumbs.forEach((thumb) => {
      const thumbIndex = parseInt(thumb.dataset.index, 10);
      if (thumbIndex === modalSlideIndex) {
        thumb.classList.add("active");
        thumb.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      } else {
        thumb.classList.remove("active");
      }
    });

    if (lightboxOverlay && lightboxOverlay.style.display === "flex") {
      syncLightbox(modalSlideIndex);
    }
  }

  if (modalPrevBtn) {
    modalPrevBtn.addEventListener("click", (e) => {
      e.preventDefault();
      updateModalSlide(modalSlideIndex - 1);
    });
  }

  if (modalNextBtn) {
    modalNextBtn.addEventListener("click", (e) => {
      e.preventDefault();
      updateModalSlide(modalSlideIndex + 1);
    });
  }

  modalThumbs.forEach((thumb) => {
    thumb.addEventListener("click", (e) => {
      e.preventDefault();
      const selectedIndex = parseInt(thumb.dataset.index, 10);
      updateModalSlide(selectedIndex);
    });
  });


  // ==========================================
  // 3. OUTSIDE MIDDLE SECTION SLIDE VIEWER (P1-P9)
  // ==========================================
  const pvkMainImg = document.getElementById("pvk-main-display");
  const pvkCounter = document.getElementById("pvk-curr-page");
  const pvkThumbs = document.querySelectorAll(".pvk-thumb-item");
  const pvkPrevBtn = document.getElementById("pvk-btn-prev");
  const pvkNextBtn = document.getElementById("pvk-btn-next");

  let pvkIndex = 1;
  const pvkTotal = 9;

  function updatePvkSlide(index) {
    if (!pvkMainImg) return;

    if (index < 1) index = pvkTotal;
    if (index > pvkTotal) index = 1;

    pvkIndex = index;

    pvkMainImg.style.opacity = "0.3";
    setTimeout(() => {
      pvkMainImg.src = `./assets/images/P${pvkIndex}.jpg`;
      pvkMainImg.style.opacity = "1";
    }, 120);

    if (pvkCounter) pvkCounter.textContent = pvkIndex;

    pvkThumbs.forEach((t) => {
      const idx = parseInt(t.dataset.idx, 10);
      if (idx === pvkIndex) {
        t.classList.add("pvk-is-active");
        t.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      } else {
        t.classList.remove("pvk-is-active");
      }
    });
  }

  if (pvkPrevBtn) {
    pvkPrevBtn.addEventListener("click", (e) => {
      e.preventDefault();
      updatePvkSlide(pvkIndex - 1);
    });
  }

  if (pvkNextBtn) {
    pvkNextBtn.addEventListener("click", (e) => {
      e.preventDefault();
      updatePvkSlide(pvkIndex + 1);
    });
  }

  pvkThumbs.forEach((t) => {
    t.addEventListener("click", (e) => {
      e.preventDefault();
      updatePvkSlide(parseInt(t.dataset.idx, 10));
    });
  });


  // ==========================================
  // 4. FULLSCREEN LIGHTBOX CONTROLS
  // ==========================================
  const openLbBtn = document.getElementById("open-slide-fullscreen");
  const closeLbBtn = document.getElementById("close-slide-fullscreen");
  const lightboxOverlay = document.getElementById("slide-lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lbCounter = document.getElementById("lb-current-num");
  const prevLbBtn = document.querySelector(".prev-lb");
  const nextLbBtn = document.querySelector(".next-lb");

  function syncLightbox(idx = modalSlideIndex) {
    if (!lightboxImg) return;
    lightboxImg.src = `./assets/images/hokkaido-slide-${idx}.jpg`;
    if (lbCounter) lbCounter.textContent = idx;
  }

  if (openLbBtn && lightboxOverlay) {
    openLbBtn.addEventListener("click", (e) => {
      e.preventDefault();
      syncLightbox(modalSlideIndex);
      lightboxOverlay.style.display = "flex";
    });

    if (closeLbBtn) {
      closeLbBtn.addEventListener("click", (e) => {
        e.preventDefault();
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
        e.preventDefault();
        updateModalSlide(modalSlideIndex - 1);
      });

      nextLbBtn.addEventListener("click", (e) => {
        e.preventDefault();
        updateModalSlide(modalSlideIndex + 1);
      });
    }
  }


  // ==========================================
  // 5. NAVBAR MOBILE CONTROLS
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