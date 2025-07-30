import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBolt, faTachometerAlt, faAddressBook, faComments, faCalendarAlt, faCreditCard, faEnvelope, faFileAlt, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import "../styles/Sidebar.css";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isSidebarOpen ? "sidebar-open" : ""}`}>
      <div className="sidebar-header">
        <h1>Lead Savvy</h1>
        <button className="close-button" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <div>
        <div className="profile-container">
          <div className="profile">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIs3peZbmHi0e-uTv4_RB4RWFfqEzE7BNNSg&s"
              alt="Profile of Kaneer Kerla"
              width="50"
              height="50"
            />
            <div>
              <span>Kaneer Kerla</span>
              <span>Austin, Texas</span>
            </div>
          </div>
        </div>
        <div className="search-container">
          <div className="search">
            <input type="text" placeholder="Search" />
          </div>
          <div className="flash-icon">
            <FontAwesomeIcon icon={faBolt} />
          </div>
        </div>
        <div className="menu">
          <NavLink to="/dashboard" className={({isActive}) => isActive ? "active" : ""}>
            <FontAwesomeIcon icon={faTachometerAlt} className="menu-icon" /> Dashboard
          </NavLink>
          <NavLink to="/contact" className={({isActive}) => isActive ? "active" : ""}>
            <FontAwesomeIcon icon={faAddressBook} className="menu-icon" /> Contact
          </NavLink>
          <NavLink to="/conversation" className={({isActive}) => isActive ? "active" : ""}>
            <FontAwesomeIcon icon={faComments} className="menu-icon" /> Conversation
          </NavLink>
          <NavLink to="/calendar" className={({isActive}) => isActive ? "active" : ""}>
            <FontAwesomeIcon icon={faCalendarAlt} className="menu-icon" /> Calendar
          </NavLink>
          <NavLink to="/opportunities" className={({isActive}) => isActive ? "active" : ""}>
            <FontAwesomeIcon icon={faCreditCard} className="menu-icon" /> Opportunities
          </NavLink>
          <NavLink to="/email" className={({isActive}) => isActive ? "active" : ""}>
            <FontAwesomeIcon icon={faEnvelope} className="menu-icon" /> Email Marketing
          </NavLink>
          <NavLink to="/" className={({isActive}) => isActive ? "active" : ""}>
            <FontAwesomeIcon icon={faFileAlt} className="menu-icon" /> Maps Scraper
          </NavLink>
        </div>
        <hr className="menu-divider" />
      </div>
      <div className="bottom-menu">
        <NavLink to="/settings" className={({isActive}) => isActive ? "active" : ""}>
          <FontAwesomeIcon icon={faCog} className="menu-icon" /> Settings
        </NavLink>
        <NavLink to="/login" className={({isActive}) => isActive ? "active" : ""}>
          <FontAwesomeIcon icon={faSignOutAlt} className="menu-icon" /> Logout
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;