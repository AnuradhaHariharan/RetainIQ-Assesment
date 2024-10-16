import React from 'react';
import './Sidebar.css';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'; // Use Outlined Icon
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'; // Use Outlined Icon
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'; // Use Outlined Icon
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined'; // Use Outlined Icon
import ElectricBoltOutlinedIcon from '@mui/icons-material/ElectricBoltOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'; // New icon
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'; // New icon

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-up">
        <ul className="sidebar-menu">
          <li className="sidebar-item main-logo">
            <img src="/Screenshot_2024-10-15_at_9.05.17_PM-removebg-preview.png" alt="Logo" />
          </li>
          <li className='sidebar-item'>
            <ElectricBoltOutlinedIcon className='sidebar-icon' />
          </li>
          <li className="sidebar-item">
            <HomeOutlinedIcon className="sidebar-icon" />
          </li>
          <li className="sidebar-item">
            <DashboardOutlinedIcon className="sidebar-icon" /> {/* New Dashboard Icon */}
          </li>
          <li className="sidebar-item">
            <ContactMailOutlinedIcon className="sidebar-icon" />
          </li>
        </ul>
      </div>
      <div className="sidebar-down">
        <ul className="sidebar-menu">
          <li className="sidebar-item">
            <PaymentOutlinedIcon className="sidebar-icon" />
          </li>
          <li className="sidebar-item">
            <SettingsOutlinedIcon className="sidebar-icon" />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;