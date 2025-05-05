import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaStickyNote,
  FaHistory,
  FaUser,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { motion } from "framer-motion";

interface SidebarProps {
  onCollapse?: (collapsed: boolean) => void;
  isCollapsed: boolean;
  isMobileOpen: boolean;
}

interface MenuItem {
  path: string;
  icon: React.ReactNode;
  label: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onCollapse, isCollapsed, isMobileOpen }) => {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState<string>("");

  const toggleSidebar = () => {
    onCollapse?.(!isCollapsed);
    if (isCollapsed) setOpenDropdown('');
  };

  const isActive = (path: string): boolean => location.pathname === path;

  const menuItems: MenuItem[] = [
    { path: "/dashboard", icon: <FaStickyNote />, label: "My Notes" },
    { path: "/history", icon: <FaHistory />, label: "Version History" },
    { path: "/profile", icon: <FaUser />, label: "Profile" },
    { path: "/logout", icon: <FaSignOutAlt />, label: "Logout" },
  ];

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => onCollapse?.(true)}
        />
      )}

      <motion.div
        initial={false}
        animate={{
          width: window.innerWidth >= 768
            ? isCollapsed
              ? "5rem"
              : "16rem"
            : "16rem"
        }}
        className={`
          fixed top-0 left-0 h-screen z-50
          bg-white text-gray-800 shadow-lg
          transition-transform duration-300
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
       
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-9 p-1.5 bg-white text-gray-600 rounded-full shadow hidden md:block"
        >
          {isCollapsed ? <FaChevronRight size={14} /> : <FaChevronLeft size={14} />}
        </button>

        {/* Logo */}
        <div className="p-4 flex items-center justify-center">
          <Link to="/dashboard" className="bg-white">
           
           { isCollapsed ? <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo69qaanBDkTURGD8stkfq1QWRijFet1qajA&s" className="w-full bg-white rounded-full" alt="Logo" /> :
            <img src="https://www.cdnlogo.com/logos/n/52/note.svg" className="w-full bg-white" alt="Logo" />}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="mt-6 flex flex-col gap-2 px-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive(item.path)
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <div className="text-lg">{item.icon}</div>
              {!isCollapsed && <span className="ml-3">{item.label}</span>}
            </Link>
          ))}
        </nav>
      </motion.div>
    </>
  );
};

export default Sidebar;
