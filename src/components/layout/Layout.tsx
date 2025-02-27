import React from 'react';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-primary focus:text-black"
      >
        Skip to main content
      </a>
      <header role="banner">
        <Navbar />
      </header>
      <main id="main-content" className="flex-grow" role="main">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;