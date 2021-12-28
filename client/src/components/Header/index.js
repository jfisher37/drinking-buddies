import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const Header = () => {

  // Calls logout function on click
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
        <nav >
          <Link  to="/">Home</Link>
          {Auth.loggedIn() ? (
           <p>Logged In</p>
            
          ) : (
            
              <Link className="nav-item nav-link" to="/login">
                Login
              </Link>
            
          )}
        </nav>)
 
};

export default Header;
