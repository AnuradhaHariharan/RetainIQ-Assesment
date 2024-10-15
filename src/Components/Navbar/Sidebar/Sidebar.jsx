import React from 'react';
import './Sidebar.css';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';

function Sidebar() {
  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        <li className="sidebar-item">
          <HomeIcon /> 
        </li>
        <li className="sidebar-item">
          <SettingsIcon /> 
        </li>
        <li className="sidebar-item">
          <InfoIcon /> 
        </li>
        <li className="sidebar-item">
          <ContactMailIcon /> 
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;