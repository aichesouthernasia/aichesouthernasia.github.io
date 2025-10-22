document.addEventListener('DOMContentLoaded', () => {
  const registerBtn = document.getElementById('register-cta');

  if (registerBtn) {
    registerBtn.addEventListener('click', e => {
      e.preventDefault();
      // Replace this with actual registration form URL
      alert('Registration form link not yet added.');
    });
  }
});
