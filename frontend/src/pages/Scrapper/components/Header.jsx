import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <FaMapMarkerAlt className="logo-icon" />
        <span>Google Maps Scraper</span>
      </div>
    </header>
  );
};

export default Header;