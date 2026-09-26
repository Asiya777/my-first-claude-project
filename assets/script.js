const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => mainNav.classList.remove('open'));
  });
}

const orderButtons = document.querySelectorAll('.cta-order');
const messageField = document.getElementById('f-message');

orderButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const product = button.dataset.product || '';
    if (messageField) {
      messageField.value = `Хочу заказать: ${product}`;
    }
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    document.getElementById('f-name')?.focus({ preventScroll: true });
  });
});

const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

if (contactForm && formNote) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    formNote.textContent = 'Спасибо! Заявка отправлена, мы свяжемся с вами в ближайшее время.';
    contactForm.reset();
  });
}

const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('in-view'));
}

// Safety net: if something kept an item from revealing (observer never fired,
// element off-screen in a print/export view, etc.), don't leave it invisible.
window.setTimeout(() => {
  revealItems.forEach((item) => item.classList.add('in-view'));
}, 3000);
