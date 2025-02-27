import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu as MenuIcon, X, Clapperboard, Coffee } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { cn } from '../../../utils/cn';
import NavLink from './NavLink';
import MobileMenu from './MobileMenu';
import LanguageSwitch from '../../LanguageSwitch';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useLanguage();

  const navItems = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.menu'), href: '/menu' },
    { name: t('nav.events'), href: '/events' },
    { name: t('nav.gallery'), href: '/gallery' },
    { name: t('nav.contact'), href: '/contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        'fixed w-full z-40 transition-all duration-200',
        isScrolled ? 'bg-black/95 backdrop-blur-sm shadow-lg' : 'bg-black/80 backdrop-blur-sm'
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="The Cast - Home"
          >
            <Clapperboard className="h-8 w-8 text-primary" aria-hidden="true" />
            <span className="text-xl font-semibold text-primary font-mono">
              The Cast
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <NavLink 
                key={item.href} 
                href={item.href}
                className="focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {item.name}
              </NavLink>
            ))}
            <LanguageSwitch />
            <Link
              to="/admin"
              className="text-white/20 hover:text-white/40 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary p-1"
              aria-label="Staff Portal"
            >
              <Coffee className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <LanguageSwitch />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-primary hover:text-white transition-colors p-2 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </nav>
  );
};

export default Navbar;