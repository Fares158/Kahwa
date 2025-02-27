import React from 'react';
import { Clapperboard, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import FooterSection from './FooterSection';
import SocialLinks from './SocialLinks';
import FooterLinks from './FooterLinks';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-black text-white/80"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Brand */}
          <FooterSection title={t('footer.brand.title')}>
            <div className="flex items-center gap-2 mb-4">
              <Clapperboard
                className="h-8 w-8 text-primary"
                aria-hidden="true"
              />
              <span className="text-xl font-semibold text-primary font-mono">
                The Cast
              </span>
            </div>
            <p className="text-white/80">{t('footer.brand.slogan')}</p>
          </FooterSection>

          {/* Contact Info */}
          <FooterSection title={t('footer.contact')}>
            <div className="space-y-3">
              <a
                href="mailto:info@thecast.com"
                className="flex items-center gap-2 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary p-1"
                aria-label="Email us"
              >
                <Mail className="h-5 w-5" aria-hidden="true" />
                <span>info@thecast.com</span>
              </a>
              <a
                href="tel:+216 55 304 314"
                className="flex items-center gap-2 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary p-1"
                aria-label="Call us"
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
                <span>+216 71 234 567</span>
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 mt-1" aria-hidden="true" />
                <address className="not-italic">
                  Av. de l'Ère Nouvelle, Ariana 2001, Tunisia
                </address>
              </div>
            </div>
          </FooterSection>

          {/* Quick Links */}
          <FooterSection title={t('footer.quickLinks')}>
            <FooterLinks />
            <div className="mt-6">
              <SocialLinks />
            </div>
          </FooterSection>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-white/60">
          <p>
            &copy; {currentYear} The Cast. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
