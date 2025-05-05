import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';


const Layout: React.FC = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

  const pathname = location.pathname?.split('/')[2];
  const splitText = pathname?.split('-');
  const capitalizedText = splitText
    ?.map((text) => text.charAt(0).toUpperCase() + text.slice(1))
    .join(' ');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsCollapsed(false);
        setIsMobileOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  const handleSidebarCollapse = (collapsed: boolean) => {
    if (window.innerWidth < 768) {
      setIsMobileOpen(!collapsed);
    } else {
      setIsCollapsed(collapsed);
    }
  };

  const handleMobileMenuClick = () => {
    setIsMobileOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar
          onCollapse={handleSidebarCollapse}
          isCollapsed={isCollapsed}
          isMobileOpen={isMobileOpen}
        />
        <div
          className={`flex-1 transition-all duration-300 ${
            isCollapsed ? 'md:ml-20' : 'md:ml-64'
          }`}
        >
          <Navbar
            capitalizedText={capitalizedText}
            onMenuClick={handleMobileMenuClick}
          />
          <main className="p-6 text-gray-900">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
