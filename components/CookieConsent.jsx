import React, { useState, useEffect } from 'react';
import { Cookie, X, Settings2, Shield } from 'lucide-react';
import {
  getCookieConsent,
  acceptAllCookies,
  rejectOptionalCookies,
  saveCookieConsent,
  applyCookieConsent,
} from '../utils/cookieConsent.js';

export const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [preferences, setPreferences] = useState(false);

  useEffect(() => {
    const existing = getCookieConsent();
    if (existing) {
      applyCookieConsent(existing);
      setAnalytics(existing.analytics);
      setPreferences(existing.preferences);
      setVisible(false);
    } else {
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    const openSettings = () => {
      const c = getCookieConsent();
      if (c) {
        setAnalytics(c.analytics);
        setPreferences(c.preferences);
      }
      setShowSettings(true);
      setVisible(true);
    };
    window.addEventListener('tnl:open-cookie-settings', openSettings);
    return () => window.removeEventListener('tnl:open-cookie-settings', openSettings);
  }, []);

  const close = () => {
    setVisible(false);
    setShowSettings(false);
  };

  const handleAcceptAll = () => {
    acceptAllCookies();
    close();
  };

  const handleRejectOptional = () => {
    rejectOptionalCookies();
    close();
  };

  const handleSavePreferences = () => {
    saveCookieConsent({ analytics, preferences });
    close();
  };

  if (!visible) return null;

  return (
    <div
      className="cookie-consent-root"
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-desc"
    >
      <div className="cookie-consent-backdrop" aria-hidden onClick={() => !showSettings && close()} />

      <div className="cookie-consent-panel">
        <button
          type="button"
          onClick={close}
          className="cookie-consent-close"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className="flex items-start gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-royal-50 ring-1 ring-royal-100 shrink-0">
            <Cookie className="w-5 h-5 text-royal-600" />
          </div>
          <div className="min-w-0 pr-6">
            <h2 id="cookie-title" className="text-base sm:text-lg font-bold text-ink-950 mb-1">
              {showSettings ? 'Cookie preferences' : 'We value your privacy'}
            </h2>
            <p id="cookie-desc" className="text-ink-500 text-xs sm:text-sm leading-relaxed">
              {showSettings
                ? 'Choose which optional cookies we may use. Necessary cookies keep the site secure and working.'
                : 'We use cookies to improve your experience, remember settings, and understand how visitors use our site. You can accept all, use essential only, or customize.'}
            </p>
          </div>
        </div>

        {showSettings ? (
          <div className="cookie-consent-options space-y-3 mb-5">
            <div className="cookie-option cookie-option--locked">
              <div>
                <p className="font-semibold text-ink-950 text-sm flex items-center gap-2">
                  <Shield size={14} className="text-green-600" /> Necessary
                </p>
                <p className="text-ink-400 text-xs mt-0.5">Required for security, forms, and basic functions. Always on.</p>
              </div>
              <span className="text-xs font-bold text-green-600 uppercase">Always on</span>
            </div>
            <label className="cookie-option">
              <div>
                <p className="font-semibold text-ink-950 text-sm">Preferences</p>
                <p className="text-ink-400 text-xs mt-0.5">Language, onboarding, and UI choices.</p>
              </div>
              <input
                type="checkbox"
                checked={preferences}
                onChange={(e) => setPreferences(e.target.checked)}
                className="cookie-toggle"
              />
            </label>
            <label className="cookie-option">
              <div>
                <p className="font-semibold text-ink-950 text-sm">Analytics</p>
                <p className="text-ink-400 text-xs mt-0.5">Anonymous usage stats to improve our services.</p>
              </div>
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="cookie-toggle"
              />
            </label>
          </div>
        ) : null}

        <p className="text-ink-400 text-[11px] sm:text-xs mb-4">
          Read our{' '}
          <a href="/privacy-policy.html" className="text-royal-600 hover:text-royal-700 underline">
            Privacy Policy
          </a>{' '}
          for details. Change choices anytime via &ldquo;Cookie settings&rdquo; in the footer.
        </p>

        <div className="cookie-consent-actions">
          {showSettings ? (
            <>
              <button type="button" onClick={handleSavePreferences} className="btn-primary text-sm !py-2.5 flex-1">
                Save preferences
              </button>
              <button type="button" onClick={() => setShowSettings(false)} className="btn-secondary text-sm !py-2.5">
                Back
              </button>
            </>
          ) : (
            <>
              <button type="button" onClick={handleAcceptAll} className="btn-primary text-sm !py-2.5 flex-1 sm:flex-none sm:min-w-[120px]">
                Accept all
              </button>
              <button type="button" onClick={handleRejectOptional} className="btn-secondary text-sm !py-2.5 flex-1 sm:flex-none">
                Essential only
              </button>
              <button
                type="button"
                onClick={() => setShowSettings(true)}
                className="cookie-btn-ghost text-sm !py-2.5 flex-1 sm:flex-none"
              >
                <Settings2 size={16} /> Customize
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

/** Footer link to reopen cookie settings */
export const CookieSettingsLink = () => (
  <button
    type="button"
    onClick={() => window.dispatchEvent(new CustomEvent('tnl:open-cookie-settings'))}
    className="hover:text-white transition-colors text-left"
  >
    Cookie settings
  </button>
);
