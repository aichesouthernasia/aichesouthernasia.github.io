// script.js
// No blocking or redirection — the Register button opens the Google Form directly.

document.addEventListener('DOMContentLoaded', () => {
  const registerBtn = document.getElementById('register-cta');
  if (!registerBtn) return;

  // Optional: small visual feedback (pulse effect on click)
  registerBtn.addEventListener('click', () => {
    registerBtn.classList.add('clicked');
    setTimeout(() => registerBtn.classList.remove('clicked'), 200);
    // Link itself will open naturally (no preventDefault)
  });
});
