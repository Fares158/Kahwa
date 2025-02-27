import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Coffee, 
  Image, 
  Phone,
  Settings,
  Home,
  Layout,
  Calendar
} from 'lucide-react';

const navItems = [
  { to: '/admin/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
  { to: '/admin/dashboard/home', icon: <Home size={20} />, label: 'Home' },
  { to: '/admin/dashboard/menu', icon: <Coffee size={20} />, label: 'Menu' },
  { to: '/admin/dashboard/events', icon: <Calendar size={20} />, label: 'Events' },
  { to: '/admin/dashboard/gallery', icon: <Image size={20} />, label: 'Gallery' },
  { to: '/admin/dashboard/contact', icon: <Phone size={20} />, label: 'Contact' },
  { to: '/admin/dashboard/footer', icon: <Layout size={20} />, label: 'Footer' },
  { to: '/admin/dashboard/settings', icon: <Settings size={20} />, label: 'Settings' },
];

const DashboardSidebar = () => {
  return (
    <aside className="fixed left-0 top-16 w-64 bg-white shadow-sm h-[calc(100vh-4rem)] overflow-y-auto">
      <nav className="p-4 space-y-1">
        {navItems.map(({ icon: Icon, label, to }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-lg
              ${isActive 
                ? 'bg-primary/10 text-primary' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
            `}
          >
            {Icon}
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default DashboardSidebar;