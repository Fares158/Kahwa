import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee } from 'lucide-react';
import { cn } from '../../../utils/cn';
import { useLanguage } from '../../../contexts/LanguageContext';

const FooterLinks: React.FC = () => {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const links = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.menu'), href: '/menu' },
    { label: t('nav.events'), href: '/events' },
    { label: t('nav.gallery'), href: '/gallery' },
    { label: t('nav.contact'), href: '/contact' },
  ];

  return (
    <nav className="space-y-2" aria-label="Footer navigation">
      {links.map(({ label, href }) => (
        <Link
          key={label}
          to={href}
          onClick={scrollToTop}
          className="block text-white/80 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {label}
        </Link>
      ))}
      <Link
        to="/admin"
        onClick={scrollToTop}
        className={cn(
          'flex items-center gap-2 text-white/20 hover:text-white/40',
          'transition-colors duration-200 text-xs mt-4 focus:outline-none focus:ring-2 focus:ring-primary'
        )}
        aria-label={t('admin.login.title')}
      >
        <Coffee className="h-3 w-3" aria-hidden="true" />
        <span>{t('admin.login.title')}</span>
      </Link>
    </nav>
  );
};

export default FooterLinks;
