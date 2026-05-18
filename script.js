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