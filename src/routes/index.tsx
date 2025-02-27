import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminRedirect from './components/AdminRedirect';
import ProtectedRoute from './components/ProtectedRoute';
import RouteWithSuspense from './components/RouteWithSuspense';

// Import pages directly to avoid dynamic import issues
import Home from '../pages/Home';
import Menu from '../pages/Menu';
import Events from '../pages/Events';
import Gallery from '../pages/Gallery';
import Contact from '../pages/Contact';
import AdminLogin from '../pages/admin/Login';
import DashboardLayout from '../features/admin/components/DashboardLayout';
import DashboardOverview from '../features/admin/components/DashboardOverview';
import HomeEditor from '../features/admin/components/home/HomeEditor';
import MenuEditor from '../features/admin/components/menu/MenuEditor';
import GalleryEditor from '../features/admin/components/gallery/GalleryEditor';
import ContactEditor from '../features/admin/components/contact/ContactEditor';
import FooterEditor from '../features/admin/components/footer/FooterEditor';
import SettingsEditor from '../features/admin/components/settings/SettingsEditor';
import EventsEditor from '../features/admin/components/events/EventsEditor';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<RouteWithSuspense><Home /></RouteWithSuspense>} />
      <Route path="/menu" element={<RouteWithSuspense><Menu /></RouteWithSuspense>} />
      <Route path="/events" element={<RouteWithSuspense><Events /></RouteWithSuspense>} />
      <Route path="/gallery" element={<RouteWithSuspense><Gallery /></RouteWithSuspense>} />
      <Route path="/contact" element={<RouteWithSuspense><Contact /></RouteWithSuspense>} />

      {/* Admin Routes */}
      <Route path="/admin">
        <Route index element={<AdminRedirect />} />
        <Route path="login" element={<RouteWithSuspense><AdminLogin /></RouteWithSuspense>} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <RouteWithSuspense><DashboardLayout /></RouteWithSuspense>
            </ProtectedRoute>
          }
        >
          <Route index element={<RouteWithSuspense><DashboardOverview /></RouteWithSuspense>} />
          <Route path="menu" element={<RouteWithSuspense><MenuEditor /></RouteWithSuspense>} />
          <Route path="events" element={<RouteWithSuspense><EventsEditor /></RouteWithSuspense>} />
          <Route path="gallery" element={<RouteWithSuspense><GalleryEditor /></RouteWithSuspense>} />
          <Route path="settings" element={<RouteWithSuspense><SettingsEditor /></RouteWithSuspense>} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
