import React from 'react';
import { Link } from 'react-router-dom';
import "./styles/NavigationBar.css"; // Import CSS file for styling

const NavigationBar = () => {
  return (
    <div className='navbar'>
      <div className='leftSide'>
      <a href="/">
          <div className='logo'></div>
        </a>
        <h1 className="header-text">
          <a href="/" className="header-link">Simplified <br />Recalls</a>
        </h1>
      </div>
      <div className='rightSide'>
        <Link to="/">Home</Link>
        <Link to="/FoodRecalls">Food</Link>
        <Link to="/DeviceRecalls">Device</Link>
        <Link to="/DrugRecalls">Drug</Link>
        <Link to="/GraphsPage">Graphs</Link>

      </div>
    </div>
  );
};

export default NavigationBar;
