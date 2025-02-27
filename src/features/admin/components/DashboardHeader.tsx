import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Settings } from 'lucide-react';
import { useAdmin } from '../../../contexts/AdminContext';

const DashboardHeader: React.FC = () => {
  const { user, logout } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-50">
      <div className="h-full flex items-center justify-between px-4">
        <h1 className="text-xl font-semibold">Staff Dashboard</h1>
        
        <div className="flex items-center gap-4">
          <button 
            className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
          </button>
          <button 
            className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100"
            aria-label="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3 pl-4 border-l">
            <span className="text-sm text-gray-600">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="text-sm text-red-600 hover:text-red-800"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;