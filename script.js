const viewBtns = document.querySelectorAll('.btn-view-details');
  const closeBtns = document.querySelectorAll('.close-modal');

  viewBtns.forEach(btn => {
    btn.onclick = () => {
      document.getElementById(btn.dataset.target).style.display = 'flex';
    }
  });

  closeBtns.forEach(btn => {
    btn.onclick = () => {
      btn.closest('.modal-overlay').style.display = 'none';
    }
  });

  window.onclick = (event) => {
    if (event.target.classList.contains('modal-overlay')) {
      event.target.style.display = 'none';
    }
  };

// SELECT ELEMENTS
const navOpenBtn = document.querySelector('[data-nav-open-btn]');
const navCloseBtn = document.querySelector('[data-nav-close-btn]');
const navbar = document.querySelector('[data-navbar]');
const overlay = document.querySelector('[data-overlay]');

// CHOOSE ALL ELEMENTS THAT TRIGGER A TOGGLE ACTION
const navElemArr = [navOpenBtn, navCloseBtn, overlay];

// LOOP THROUGH THE ELEMENTS AND ADD CLICK LISTENERS
for (let i = 0; i < navElemArr.length; i++) {
  if (navElemArr[i]) { // Safety check to prevent errors if an element is missing
    navElemArr[i].addEventListener("click", function () {
      navbar.classList.toggle("active");
      overlay.classList.toggle("active");
    });
  }
}

