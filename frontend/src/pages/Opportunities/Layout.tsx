import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Opportunities from "./pages/Opportunities";
import Pipelines from "./pages/Pipelines";
import BulkActions from "./pages/BulkActions";

const Layout = () => {
  const [currentView, setCurrentView] = useState("opportunities");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: "opportunities", label: "Opportunities" },
    { id: "pipelines", label: "Pipelines" },
    { id: "bulk-actions", label: "Bulk Actions" },
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Navigation */}
      <nav className="bg-black border-b border-red-800 px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-red-500" />
              ) : (
                <Menu className="h-6 w-6 text-red-500" />
              )}
            </button>
            <h1 className="text-xl md:text-2xl font-bold">Opportunities</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                className={`px-4 py-2 rounded-md transition ${
                  currentView === item.id
                    ? "bg-red-900 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
                onClick={() => setCurrentView(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                className={`w-full text-left px-4 py-2 rounded-md transition ${
                  currentView === item.id
                    ? "bg-red-900 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
                onClick={() => {
                  setCurrentView(item.id);
                  setIsMobileMenuOpen(false);
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="p-4 md:p-6">
        {currentView === "opportunities" && <Opportunities />}
        {currentView === "pipelines" && <Pipelines />}
        {currentView === "bulk-actions" && <BulkActions />}
      </main>
    </div>
  );
};

export default Layout;