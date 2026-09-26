// Контакты компании — меняются только здесь, страница подставит их везде.
const CONFIG = {
  phone: '+7 (700) 000-00-00',   // как показывать на сайте
  whatsapp: '77000000000',       // только цифры, с кодом страны, без «+»
  email: 'info@himtexasiaplus.kz',
  address: 'г. Алматы, Казахстан'
};

const phoneDigits = CONFIG.phone.replace(/[^\d+]/g, '');
const waBase = 'https://wa.me/' + CONFIG.whatsapp;

const setLink = (id, href, text) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.href = href;
  if (text) el.textContent = text;
};

setLink('contactPhone', 'tel:' + phoneDigits, CONFIG.phone);
setLink('contactWa', waBase);
setLink('contactEmail', 'mailto:' + CONFIG.email, CONFIG.email);
const addressEl = document.getElementById('contactAddress');
if (addressEl) addressEl.textContent = CONFIG.address;
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const open = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

const showNote = (text, isError) => {
  formNote.textContent = text;
  formNote.classList.toggle('is-error', Boolean(isError));
};

const openExternal = (href) => {
  // Создаём ссылку и кликаем по ней в рамках жеста пользователя —
  // так её не блокируют браузеры и встроенные просмотрщики.
  const a = document.createElement('a');
  a.href = href;
  a.target = '_blank';
  a.rel = 'noopener';
  document.body.appendChild(a);
  a.click();
  a.remove();
};

if (contactForm && formNote) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const channel = (event.submitter && event.submitter.dataset.channel) || 'whatsapp';
    const data = new FormData(contactForm);
    const name = String(data.get('name') || '').trim();
    const company = String(data.get('company') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const message = String(data.get('message') || '').trim();

    const nameInput = contactForm.elements.name;
    const phoneInput = contactForm.elements.phone;
    const phoneOk = phone.replace(/\D/g, '').length >= 10;
    nameInput.setAttribute('aria-invalid', String(!name));
    phoneInput.setAttribute('aria-invalid', String(!phoneOk));

    if (!name || !phoneOk) {
      showNote(!name ? 'Укажите, пожалуйста, имя.' : 'Проверьте номер телефона — нужно не меньше 10 цифр.', true);
      (!name ? nameInput : phoneInput).focus();
      return;
    }

    const lines = [
      'Заявка с сайта ХимТекс Азия+',
      'Имя: ' + name,
      company ? 'Компания: ' + company : null,
      'Телефон: ' + phone,
      message ? 'Сообщение: ' + message : null
    ].filter(Boolean);
    const text = lines.join('\n');

    if (channel === 'email') {
      openExternal('mailto:' + CONFIG.email
        + '?subject=' + encodeURIComponent('Заявка с сайта — ' + name)
        + '&body=' + encodeURIComponent(text));
      showNote('Открыли почтовую программу с готовым письмом — нажмите «Отправить».');
    } else {
      openExternal(waBase + '?text=' + encodeURIComponent(text));
      showNote('Открыли WhatsApp с готовым сообщением — нажмите «Отправить».');
    }
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

window.setTimeout(() => {
  revealItems.forEach((item) => item.classList.add('in-view'));
}, 3000);
