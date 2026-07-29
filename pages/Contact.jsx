import React from 'react';
import { Mail, Phone, MapPin, Send, Globe, Clock, Navigation } from 'lucide-react';
import { PARENT_COMPANY, OFFICE } from '../constants.js';
import { PageHero, BreadcrumbBar } from '../components/PageHero.jsx';

const MAP_EMBED_SRC = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1781.4001036836862!2d85.91585721132687!3d26.750751063013844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ec6bdf9314f895%3A0x5d165c0f9d9dc79d!2sTaigra%20Nexus%20Labs%20Pvt.%20Ltd.!5e0!3m2!1sen!2snp!4v1779356415007!5m2!1sen!2snp`;

const contactItems = [
  { icon: Mail, label: 'Email', value: 'taigranexuslabss@gmail.com', href: 'mailto:taigranexuslabss@gmail.com' },
  { icon: Phone, label: 'Phone', value: '+977 9766115626', href: 'tel:+9779766115626' },
  {
    icon: MapPin,
    label: 'Headquarters',
    value: OFFICE.fullAddress,
    href: OFFICE.googleMapsUrl,
  },
  { icon: Globe, label: 'Parent company', value: PARENT_COMPANY },
  { icon: Clock, label: 'Visit hours', value: OFFICE.hours },
];

const inputClass =
  'w-full bg-white border border-ink-950/[0.12] rounded-xl px-4 py-3.5 text-ink-950 placeholder:text-ink-300 focus:border-royal-500 outline-none transition-colors';

export const Contact = () => {
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      fullName: formData.get('fullName'),
      workEmail: formData.get('workEmail'),
      organization: formData.get('organization') || 'N/A',
      message: formData.get('message'),
    };

    const phoneNumber = '9779766115626';
    const whatsappMessage =
      `*New Taigra Nexus Lab Inquiry*\n\n` +
      `*Name:* ${data.fullName}\n` +
      `*Email:* ${data.workEmail}\n` +
      `*Org:* ${data.organization}\n` +
      `*Message:* ${data.message}`;

    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`,
      '_blank'
    );
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 8000);
  };

  return (
    <div className="page-shell">
      <BreadcrumbBar items={[{ label: 'Home', to: '/' }, { label: 'Contact' }]} />
      <PageHero
        title="Get in"
        highlight="touch"
        subtitle="Visit us in Janakpurdham, message on WhatsApp, or send an inquiry—we respond within one business day."
      />

      <section className="section-pad pt-8 sm:pt-12">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 lg:gap-16">
            <div className="grid grid-cols-2 md:grid-cols-1 gap-3 sm:gap-4 md:gap-5">
              {contactItems.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex gap-3 sm:gap-4 items-start nexus-card p-3 sm:p-5 min-w-0">
                  <div className="p-3 bg-royal-50 rounded-lg shrink-0 ring-1 ring-royal-100">
                    <Icon className="text-royal-600 w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] sm:text-xs text-ink-400 uppercase tracking-wider font-semibold mb-0.5 sm:mb-1">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        target={label === 'Headquarters' ? '_blank' : undefined}
                        rel={label === 'Headquarters' ? 'noopener noreferrer' : undefined}
                        className="text-ink-900 text-xs sm:text-base hover:text-royal-600 transition-colors break-words leading-snug"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-ink-900 text-xs sm:text-base leading-snug">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="nexus-card p-4 sm:p-8 md:p-10 relative md:col-span-1 col-span-2">
              {submitted ? (
                <div className="min-h-[320px] flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-royal-50 rounded-full flex items-center justify-center mb-5 ring-1 ring-royal-200">
                    <Send className="text-royal-600 w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-ink-950">Message sent</h3>
                  <p className="text-ink-500 text-sm max-w-sm">
                    We received your request. A team member will follow up within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-ink-600 text-sm mb-2 font-medium">Full name</label>
                      <input type="text" name="fullName" className={inputClass} required />
                    </div>
                    <div>
                      <label className="block text-ink-600 text-sm mb-2 font-medium">Work email</label>
                      <input type="email" name="workEmail" className={inputClass} required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-ink-600 text-sm mb-2 font-medium">Organization</label>
                    <input type="text" name="organization" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-ink-600 text-sm mb-2 font-medium">Message</label>
                    <textarea name="message" rows={5} className={`${inputClass} resize-none`} required />
                  </div>
                  <button type="submit" className="btn-primary w-full !py-4 text-base">
                    Send via WhatsApp <Send size={18} />
                  </button>
                </form>
              )}
            </div>
          </div>

          <section className="mt-12 md:mt-16" aria-labelledby="visit-heading">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
              <div>
                <h2 id="visit-heading" className="text-xl sm:text-2xl font-bold text-ink-950 mb-2">
                  Visit our office
                </h2>
                <p className="text-ink-500 text-sm sm:text-base max-w-xl leading-relaxed">
                  We are based in <strong className="text-ink-800">{OFFICE.line1}</strong>,{' '}
                  {OFFICE.district} — the same region as Taigour Group (TGO). Please call or
                  message before visiting so our team can welcome you.
                </p>
                <p className="text-ink-400 text-xs sm:text-sm mt-2">{OFFICE.fullAddressNe}</p>
              </div>
              <a
                href={OFFICE.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary shrink-0 text-sm"
              >
                <Navigation className="w-4 h-4" />
                Open in Google Maps
              </a>
            </div>

            <div className="nexus-card overflow-hidden p-1 sm:p-1.5">
              <div className="relative w-full aspect-[4/3] sm:aspect-[21/9] min-h-[220px] rounded-xl overflow-hidden bg-ink-100">
                <iframe
                  title="Taigra Nexus Lab office location on map"
                  src={MAP_EMBED_SRC}
                  className="absolute inset-0 w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <p className="text-center text-ink-400 text-xs sm:text-sm py-3 px-4">
                Map shows Janakpurdham area (Pidari, Dhanusha, Taigra Nexus Lab Pvt. Ltd.). For exact directions, use the button above.
              </p>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};
