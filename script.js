document.addEventListener("DOMContentLoaded", () => {
  // 1. HEADER SCROLL EFFECT (CRITICAL: ADDS SOLID/FROSTED BACKGROUND)
  const header = document.getElementById("main-header");
  
  const handleScroll = () => {
    if (!header) return;
    if (window.scrollY > 20) {
      header.classList.add("header-scrolled");
    } else {
      header.classList.remove("header-scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll(); // Run immediately on page load

  // 2. Mobile Drawer Controls
  const navOpen = document.getElementById("nav-open");
  const navClose = document.getElementById("nav-close");
  const mainNav = document.getElementById("main-nav");
  const backdrop = document.getElementById("nav-backdrop");

  if (navOpen && mainNav) {
    navOpen.addEventListener("click", () => {
      mainNav.classList.add("active");
      if (backdrop) backdrop.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  }

  const closeMenu = () => {
    if (mainNav) mainNav.classList.remove("active");
    if (backdrop) backdrop.classList.remove("active");
    document.body.style.overflow = "";
  };

  if (navClose) navClose.addEventListener("click", closeMenu);
  if (backdrop) backdrop.addEventListener("click", closeMenu);

  // 3. Currency Switcher
  window.toggleCurrency = (curr) => {
    const btnPhp = document.getElementById("btn-php");
    const btnJpy = document.getElementById("btn-jpy");
    if (curr === "PHP") {
      if (btnPhp) btnPhp.classList.add("active");
      if (btnJpy) btnJpy.classList.remove("active");
    } else {
      if (btnJpy) btnJpy.classList.add("active");
      if (btnPhp) btnPhp.classList.remove("active");
    }
  };

  // 4. Showcase Slider (P1 to P9)
  const pvkImg = document.getElementById("pvk-main-display");
  const pvkPage = document.getElementById("pvk-curr-page");
  const pvkThumbs = document.querySelectorAll(".pvk-thumb-item");
  const prevBtn = document.getElementById("pvk-btn-prev");
  const nextBtn = document.getElementById("pvk-btn-next");
  let pvkIdx = 1;
  const pvkTotal = 9;

  function renderPvk(idx) {
    if (!pvkImg) return;
    if (idx < 1) idx = pvkTotal;
    if (idx > pvkTotal) idx = 1;
    pvkIdx = idx;
    pvkImg.style.opacity = "0.3";
    setTimeout(() => {
      pvkImg.src = `./assets/images/P${pvkIdx}.jpg`;
      pvkImg.style.opacity = "1";
    }, 120);
    if (pvkPage) pvkPage.textContent = pvkIdx;
    pvkThumbs.forEach((thumb) => {
      const i = parseInt(thumb.dataset.idx, 10);
      if (i === pvkIdx) {
        thumb.classList.add("pvk-is-active");
        thumb.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      } else {
        thumb.classList.remove("pvk-is-active");
      }
    });
  }

  if (prevBtn) prevBtn.addEventListener("click", (e) => { e.preventDefault(); renderPvk(pvkIdx - 1); });
  if (nextBtn) nextBtn.addEventListener("click", (e) => { e.preventDefault(); renderPvk(pvkIdx + 1); });
  pvkThumbs.forEach((t) => {
    t.addEventListener("click", (e) => {
      e.preventDefault();
      renderPvk(parseInt(t.dataset.idx, 10));
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // 1. Header frosted scroll transition
  const header = document.getElementById("main-header");
  const onScroll = () => {
    if (!header) return;
    if (window.scrollY > 30) {
      header.classList.add("header-scrolled");
    } else {
      header.classList.remove("header-scrolled");
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // 2. Mobile drawer open/close
  const navOpen = document.getElementById("nav-open");
  const navClose = document.getElementById("nav-close");
  const mainNav = document.getElementById("main-nav");
  const backdrop = document.getElementById("nav-backdrop");

  const openDrawer = () => {
    if (mainNav) mainNav.classList.add("active");
    if (backdrop) backdrop.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  const closeDrawer = () => {
    if (mainNav) mainNav.classList.remove("active");
    if (backdrop) backdrop.classList.remove("active");
    document.body.style.overflow = "";
  };

  if (navOpen) navOpen.addEventListener("click", openDrawer);
  if (navClose) navClose.addEventListener("click", closeDrawer);
  if (backdrop) backdrop.addEventListener("click", closeDrawer);

  document.querySelectorAll(".jalpak-nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 992) closeDrawer();
    });
  });

  // 3. Currency toggle function
window.toggleCurrency = function(curr) {
  const btnPhp = document.getElementById("btn-php");
  const btnJpy = document.getElementById("btn-jpy");
  const prices = document.querySelectorAll(".package-price");
  const jpLabels = document.querySelectorAll(".jp-label");

  if (curr === "PHP") {
    // 1. Update button states
    if (btnPhp) btnPhp.classList.add("active");
    if (btnJpy) btnJpy.classList.remove("active");

    // 2. Hide Japanese subtitles completely
    jpLabels.forEach((el) => {
      el.style.display = "none";
    });

    // 3. Switch prices to PHP
    prices.forEach((el) => {
      el.textContent = el.getAttribute("data-php") || "₱38,000";
    });

  } else if (curr === "JPY") {
    // 1. Update button states
    if (btnJpy) btnJpy.classList.add("active");
    if (btnPhp) btnPhp.classList.remove("active");

    // 2. Show Japanese subtitles again
    jpLabels.forEach((el) => {
      el.style.display = "block";
    });

    // 3. Switch prices to JPY
    prices.forEach((el) => {
      el.textContent = el.getAttribute("data-jpy") || "¥100,000";
    });
  }
};

  // 4. Showcase slider (P1 to P9)
  const pvkImg = document.getElementById("pvk-main-display");
  const pvkPage = document.getElementById("pvk-curr-page");
  const pvkThumbs = document.querySelectorAll(".pvk-thumb-item");
  const prevBtn = document.getElementById("pvk-btn-prev");
  const nextBtn = document.getElementById("pvk-btn-next");

  let pvkIdx = 1;
  const pvkTotal = 9;

  function renderPvk(idx) {
    if (!pvkImg) return;
    if (idx < 1) idx = pvkTotal;
    if (idx > pvkTotal) idx = 1;
    pvkIdx = idx;

    pvkImg.style.opacity = "0.3";
    setTimeout(() => {
      pvkImg.src = `./assets/images/P${pvkIdx}.jpg`;
      pvkImg.style.opacity = "1";
    }, 120);

    if (pvkPage) pvkPage.textContent = pvkIdx;

    pvkThumbs.forEach((thumb) => {
      const i = parseInt(thumb.dataset.idx, 10);
      if (i === pvkIdx) {
        thumb.classList.add("pvk-is-active");
        thumb.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      } else {
        thumb.classList.remove("pvk-is-active");
      }
    });
  }

  if (prevBtn) prevBtn.addEventListener("click", (e) => { e.preventDefault(); renderPvk(pvkIdx - 1); });
  if (nextBtn) nextBtn.addEventListener("click", (e) => { e.preventDefault(); renderPvk(pvkIdx + 1); });

  pvkThumbs.forEach((t) => {
    t.addEventListener("click", (e) => {
      e.preventDefault();
      renderPvk(parseInt(t.dataset.idx, 10));
    });
  });
});

