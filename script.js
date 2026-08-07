if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.addEventListener('pageshow', () => {
  if (!window.location.hash) window.scrollTo(0, 0);
});

const navToggle = document.querySelector('[data-nav-toggle]');
const siteNav = document.querySelector('[data-site-nav]');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const open = siteNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
  });

  siteNav.addEventListener('click', event => {
    if (event.target.closest('a')) {
      siteNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

const observer = 'IntersectionObserver' in window
  ? new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 })
  : null;

document.querySelectorAll('.reveal').forEach(element => {
  if (observer) observer.observe(element);
  else element.classList.add('is-visible');
});

document.querySelectorAll('[data-year]').forEach(element => {
  element.textContent = new Date().getFullYear();
});

const tabButtons = document.querySelectorAll('[data-project-tab]');
const tabPanels = document.querySelectorAll('[data-project-panel]');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const target = button.dataset.projectTab;
    tabButtons.forEach(item => item.setAttribute('aria-selected', String(item === button)));
    tabPanels.forEach(panel => { panel.hidden = panel.dataset.projectPanel !== target; });
  });
});

const contactForm = document.querySelector('[data-contact-form]');
if (contactForm) {
  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(contactForm);
    const subject = `${data.get('enquiry')} — portfolio enquiry from ${data.get('name')}`;
    const body = [
      `Name: ${data.get('name')}`,
      `Email: ${data.get('email')}`,
      `Organisation: ${data.get('organisation') || 'Not provided'}`,
      '',
      String(data.get('message'))
    ].join('\n');
    const status = contactForm.querySelector('[data-form-status]');
    if (status) status.textContent = 'Opening your email application…';
    window.location.href = `mailto:johnzayat360@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
