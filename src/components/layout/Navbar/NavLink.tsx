import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../../utils/cn';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const NavLink: React.FC<NavLinkProps> = ({
  href,
  children,
  onClick,
  className,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (href.startsWith('/')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    onClick?.();
  };

  return (
    <Link to={href} onClick={handleClick} className={cn('nav-link', className)}>
      {children}
    </Link>
  );
};

export default NavLink;
