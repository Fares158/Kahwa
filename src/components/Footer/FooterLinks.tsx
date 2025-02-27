import React from 'react';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Menu', href: '#menu' },
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' }
];

const FooterLinks = () => {
  return (
    <nav className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {links.map(({ label, href }) => (
        <a
          key={label}
          href={href}
          className="text-white/80 hover:text-white transition-colors duration-200"
        >
          {label}
        </a>
      ))}
    </nav>
  );
};

export default FooterLinks;