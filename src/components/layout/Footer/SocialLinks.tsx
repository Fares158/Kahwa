import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

interface SocialLink {
  icon: typeof Facebook;
  href: string;
  label: string;
}

const socialLinks: SocialLink[] = [
  { icon: Instagram, href: 'https://www.instagram.com/thecastennaser/?hl=fr', label: 'Follow us on Instagram' },
];

const SocialLinks: React.FC = () => {
  return (
    <div className="flex gap-4 mt-6">
      {socialLinks.map(({ icon: Icon, href, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/60 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary p-1"
          aria-label={label}
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;