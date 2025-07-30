import React from 'react';
import { MapPin } from 'lucide-react';

function Header() {
  return (
    <header className="bg-darker-red shadow-lg">
      <div className="container mx-auto px-4 py-4 flex items-center gap-4">
        <MapPin className="text-white" size={24} />
        <h1 className="text-2xl font-bold text-white">Google Maps Scraper</h1>
      </div>
    </header>
  );
}

export default Header;