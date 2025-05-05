import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
  FaBell,
  FaBars
} from "react-icons/fa";

interface NavbarProps {
  capitalizedText?: string;
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ capitalizedText, onMenuClick }) => {
  const pathname = localStorage.getItem("user");
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const logOutHandler = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 w-full bg-white border-b border-gray-200">
      <div className="flex items-center">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="sm:hidden mr-4 p-2 rounded-lg hover:bg-gray-100"
        >
          <FaBars className="text-gray-600" />
        </button>
        <h1 className="text-xl font-semibold text-gray-800">
          {capitalizedText || "Dashboard"}
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <button
          className="p-2 rounded-lg text-blue-600 hover:bg-gray-100"
          aria-label="Notifications"
        >
          <FaBell className="text-xl" />
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center p-2 cursor-pointer rounded-lg hover:bg-gray-100 text-gray-600"
          >
            <FaUserCircle className="text-xl" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-1 bg-white border border-gray-200 z-[100]">
              <Link
                to={`/profile`}
                className="flex items-center  px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FaUserCircle className="mr-2" />
                Profile
              </Link>
            
            
              <button
                onClick={logOutHandler}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default Navbar;
