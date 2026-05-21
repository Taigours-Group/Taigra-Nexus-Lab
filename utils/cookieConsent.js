const STORAGE_KEY = 'tnl-cookie-consent';
const CONSENT_VERSION = 1;

const DEFAULT_CONSENT = {
  version: CONSENT_VERSION,
  necessary: true,
  analytics: false,
  preferences: false,
  decidedAt: null,
};

export function getCookieConsent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed?.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function hasConsentDecision() {
  return getCookieConsent()?.decidedAt != null;
}

export function saveCookieConsent({ analytics = false, preferences = false } = {}) {
  const consent = {
    ...DEFAULT_CONSENT,
    analytics: Boolean(analytics),
    preferences: Boolean(preferences),
    decidedAt: new Date().toISOString(),
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  } catch {
    /* ignore quota errors */
  }
  applyCookieConsent(consent);
  return consent;
}

export function acceptAllCookies() {
  return saveCookieConsent({ analytics: true, preferences: true });
}

export function rejectOptionalCookies() {
  return saveCookieConsent({ analytics: false, preferences: false });
}

/** Apply consent flags for app features (extend when adding analytics scripts). */
export function applyCookieConsent(consent = getCookieConsent()) {
  if (typeof window === 'undefined') return;
  window.__tnlCookieConsent = consent;
  document.documentElement.dataset.cookieAnalytics = consent?.analytics ? '1' : '0';
  document.documentElement.dataset.cookiePreferences = consent?.preferences ? '1' : '0';
}

export function openCookieSettings() {
  window.dispatchEvent(new CustomEvent('tnl:open-cookie-settings'));
}
