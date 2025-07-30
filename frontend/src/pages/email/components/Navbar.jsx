import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <button onClick={toggleMobileMenu} className="lg:hidden text-white">
              {isMobileMenuOpen ? 'Close' : 'Menu'}
            </button>
            <div className={`flex items-center space-x-8 ${isMobileMenuOpen ? 'block' : 'hidden'} lg:flex`}>
              <NavLink
                to="/email"
                className={({ isActive }) =>
                  `text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${
                    isActive ? 'bg-gray-900' : ''
                  }`
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/email/subscribers"
                className={({ isActive }) =>
                  `text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${
                    isActive ? 'bg-gray-900' : ''
                  }`
                }
              >
                Subscribers
              </NavLink>
              <NavLink
                to="/email/campaigns"
                className={({ isActive }) =>
                  `text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${
                    isActive ? 'bg-gray-900' : ''
                  }`
                }
              >
                Campaigns
              </NavLink>
              <NavLink
                to="/email/templates"
                className={({ isActive }) =>
                  `text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${
                    isActive ? 'bg-gray-900' : ''
                  }`
                }
              >
                Templates
              </NavLink>
              <NavLink
                to="/email/reports"
                className={({ isActive }) =>
                  `text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${
                    isActive ? 'bg-gray-900' : ''
                  }`
                }
              >
                Reports
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
