import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee } from 'lucide-react';
import { cn } from '../../../utils/cn';
import NavLink from './NavLink';
import { useLanguage } from '../../../contexts/LanguageContext';
import LanguageSwitch from '../../LanguageSwitch';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();

  const navItems = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.menu'), href: '/menu' },
    { name: t('nav.events'), href: '/events' },
    { name: t('nav.gallery'), href: '/gallery' },
    { name: t('nav.contact'), href: '/contact' }
  ];

  if (!isOpen) return null;

  return (
    <div 
      className={cn(
        'fixed inset-x-0 top-16 z-40',
        'bg-black/95 backdrop-blur-sm',
        'animate-fadeIn'
      )}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
    >
      <nav className="px-4 py-6 space-y-4">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="block py-2 text-lg"
          >
            {item.name}
          </NavLink>
        ))}
        <div className="pt-4 border-t border-white/10">
          <LanguageSwitch />
        </div>
        <Link
          to="/admin"
          onClick={onClose}
          className="flex items-center gap-2 py-2 text-white/20 hover:text-white/40 transition-colors duration-200"
          aria-label="Access staff portal"
        >
          <Coffee className="h-4 w-4" aria-hidden="true" />
          <span>Staff Portal</span>
        </Link>
      </nav>
    </div>
  );
};

export default MobileMenu;