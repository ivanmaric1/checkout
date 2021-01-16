import React from 'react';
import logo from '../../img/logo.png';
import './Menu.scss';

const Menu = () => {
  return (
    <div className="Menu">
      <img src={logo} alt="Logo" className="Menu-logo" />
      <div className="Menu-list">
        <ul className="Menu-list-sections">
          <li>Shop</li>
          <li>Gift Cards</li>
          <li>Wish List</li>
          <li>Customer Services</li>
          <li>Home</li>
        </ul>
        <ul className="Menu-list-search-cart">
          <li>Search</li>
          <li>
            <i className="fas fa-shopping-cart fa-2x"></i>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
