/**
 * English / Nepali toggle for legal pages.
 * Persists choice in localStorage.
 */
(function () {
  const STORAGE_KEY = 'tnl-legal-lang';

  function setLegalLang(lang) {
    const next = lang === 'ne' ? 'ne' : 'en';
    document.documentElement.lang = next;
    document.documentElement.setAttribute('data-legal-lang', next);

    document.querySelectorAll('[data-set-lang]').forEach((btn) => {
      btn.classList.toggle('is-active', btn.getAttribute('data-set-lang') === next);
      btn.setAttribute('aria-pressed', btn.getAttribute('data-set-lang') === next ? 'true' : 'false');
    });

    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (_) {
      /* ignore */
    }
  }

  window.setLegalLang = setLegalLang;

  document.addEventListener('DOMContentLoaded', () => {
    let saved = 'en';
    try {
      saved = localStorage.getItem(STORAGE_KEY) || 'en';
    } catch (_) {
      /* ignore */
    }
    setLegalLang(saved);

    document.querySelectorAll('[data-set-lang]').forEach((btn) => {
      btn.addEventListener('click', () => setLegalLang(btn.getAttribute('data-set-lang')));
    });
  });
})();
