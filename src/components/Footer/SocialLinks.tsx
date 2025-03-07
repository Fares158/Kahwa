import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com/thecast', label: 'Instagram' },
  ];

const SocialLinks = () => {
  return (
    <div className="flex gap-4">
      {socialLinks.map(({ icon: Icon, href, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/80 hover:text-white transition-colors duration-200"
          aria-label={label}
        >
          <Icon className="h-6 w-6" />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;