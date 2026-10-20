'use strict';
// Core navigation and contact links work without JavaScript.
document.querySelectorAll('[data-copy-email]').forEach((button) => {
  button.addEventListener('click', async () => {
    const status = document.getElementById(button.getAttribute('aria-describedby'));
    const email = button.dataset.copyEmail;
    button.disabled = true;
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(email);
      status.textContent = 'نشانی ایمیل کپی شد.';
    } catch {
      status.textContent = 'کپی خودکار در دسترس نیست؛ نشانی ایمیل را انتخاب و کپی کنید.';
    } finally {
      button.disabled = false;
    }
  });
});

document.querySelectorAll('[data-print-resume]').forEach((button) => {
  button.hidden = false;
  button.addEventListener('click', () => window.print());
});
// Expand native details for printing, then restore the visitor's previous state.
let resumePrintDetails = [];
window.addEventListener('beforeprint', () => {
  resumePrintDetails = Array.from(document.querySelectorAll('details:not([open])'));
  resumePrintDetails.forEach((details) => { details.open = true; });
});
window.addEventListener('afterprint', () => {
  resumePrintDetails.forEach((details) => { details.open = false; });
  resumePrintDetails = [];
});
