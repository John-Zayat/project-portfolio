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

    const firstNameField = contactForm.querySelector('#first-name');
    const lastNameField = contactForm.querySelector('#last-name');
    const organisationField = contactForm.querySelector('#organisation');
    const messageField = contactForm.querySelector('#message');
    const status = contactForm.querySelector('[data-form-status]');

    const requiredTextFields = [
      [firstNameField, 'Please enter a first name.'],
      [lastNameField, 'Please enter a last name.'],
      [organisationField, 'Please enter a company or organisation.'],
      [messageField, 'Please enter a message.']
    ];

    for (const [field, validationMessage] of requiredTextFields) {
      field.setCustomValidity('');

      if (!field.value.trim()) {
        field.setCustomValidity(validationMessage);
        field.reportValidity();
        return;
      }
    }

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const data = new FormData(contactForm);

    const fullName =
      `${data.get('firstName')} ${data.get('lastName')}`.trim();

    const subject =
      `${data.get('enquiry')} — portfolio enquiry from ${fullName}`;

    const body = [
      `Name: ${fullName}`,
      `Email: ${data.get('email')}`,
      `Company / organisation: ${data.get('organisation')}`,
      `Enquiry type: ${data.get('enquiry')}`,
      '',
      'Message:',
      String(data.get('message')).trim()
    ].join('\n');

    if (status) {
      status.textContent = 'Opening your email application…';
    }

    window.location.href =
      `mailto:johnzayat360@gmail.com` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;
  });

  contactForm.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('input', () => {
      field.setCustomValidity('');
    });
  });
}

const analysisToggle = document.querySelector('[data-analysis-toggle]');
const analysisPanel = document.querySelector('[data-analysis-panel]');
const analysisClose = document.querySelector('[data-analysis-close]');
const analysisHint = document.querySelector('[data-analysis-hint]');

if (analysisToggle && analysisPanel) {
  function setAnalysisPanel(open) {
    analysisPanel.hidden = !open;
    analysisToggle.setAttribute('aria-expanded', String(open));

    if (analysisHint) {
      analysisHint.textContent = open
        ? 'Hide analysis evidence ↑'
        : 'View analysis evidence →';
    }

    if (open) {
      analysisPanel.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  analysisToggle.addEventListener('click', () => {
    setAnalysisPanel(analysisPanel.hidden);
  });

  if (analysisClose) {
    analysisClose.addEventListener('click', () => {
      setAnalysisPanel(false);
      analysisToggle.focus();
    });
  }
}
