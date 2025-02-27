import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdmin } from '../../contexts/AdminContext';

const AdminRedirect: React.FC = () => {
  const { isAuthenticated } = useAdmin();
  
  return isAuthenticated ? 
    <Navigate to="/admin/dashboard" replace /> : 
    <Navigate to="/admin/login" replace />;
};

export default AdminRedirect;