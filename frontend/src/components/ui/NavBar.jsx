import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  const [expanded, setExpanded] = useState(true);  // Changed to true for default expanded state

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`vertical-nav ${expanded ? 'expanded' : ''}`}>
      <div className="nav-header">
        {expanded && <h1>Finance Tracker</h1>}
        <button className="toggle-btn" onClick={toggleSidebar}>
          {expanded ? '<<' : '>>'}
        </button>
      </div>
      <Nav className="flex-column">
        <Nav.Link as={Link} to="/" className="nav-item">
          <i className="fas fa-home"></i> {expanded && 'Dashboard'}
        </Nav.Link>
        <Nav.Link as={Link} to="/create" className="nav-item">
          <i className="fas fa-envelope"></i> {expanded && 'Add Transaction'}
        </Nav.Link>
        <Nav.Link as={Link} to="/users" className="nav-item">
          <i className="fas fa-users"></i> {expanded && 'Users'}
        </Nav.Link>
        <Nav.Link as={Link} to="/rewards" className="nav-item">
          <i className="fas fa-gift"></i> {expanded && 'Rewards'}
        </Nav.Link>
        <Nav.Link as={Link} to="/reports" className="nav-item">
          <i className="fas fa-chart-bar"></i> {expanded && 'Reports'}
        </Nav.Link>
        <Nav.Link as={Link} to="/settings" className="nav-item">
          <i className="fas fa-cog"></i> {expanded && 'Settings'}
        </Nav.Link>
      </Nav>
    </div>
  );
}

export default NavBar;