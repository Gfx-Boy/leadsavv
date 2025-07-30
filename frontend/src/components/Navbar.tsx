import React from 'react';
import { Calendar, Bell, Settings, Search } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 shadow-md px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Calendar className="h-6 w-6 text-blue-500" />
          <h1 className="text-xl font-semibold text-white">Calendar Pro</h1>
        </div>
        
        </div>
    </nav>
  );
};

export default Navbar;