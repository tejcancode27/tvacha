import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container justify-content-center">
        <ul className="navbar-nav d-flex flex-row justify-content-center gap-5">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/symptoms">Symptoms</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/classifier">Classifier</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
