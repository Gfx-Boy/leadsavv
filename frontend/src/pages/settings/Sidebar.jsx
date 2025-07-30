import React from "react";
import { NavLink } from "react-router-dom";

const SettingsSidebar = ({ activeTab, setActiveTab }) => {
  const links = [
    { name: "Profile", path: "/settings/profile" },
    { name: "Billing", path: "/settings/billing" },
    { name: "Business", path: "/settings/business" },
    { name: "Localization", path: "/settings/localization" },
    { name: "Email", path: "/settings/email" },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-6">Settings</h2>
      <ul className="space-y-4">
        {links.map((link) => (
          <li key={link.name}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg ${
                  isActive ? "bg-blue-600" : "hover:bg-gray-700"
                }`
              }
              onClick={() => setActiveTab(link.name.toLowerCase())}
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SettingsSidebar;