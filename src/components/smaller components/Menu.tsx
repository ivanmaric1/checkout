import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../img/logo.png';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import './Menu.scss';

interface Props {
  numberOfItems: number;
}

const Menu: React.FC<Props> = ({ numberOfItems }) => {
  return (
    <div className="Menu">
      <Link to="/">
        <img src={logo} alt="Logo" className="Menu-logo" />
      </Link>
      <div className="Menu-list">
        <ul className="Menu-list-sections">
          <Link to="/">
            <li>Shop</li>
          </Link>
          <li>Gift Cards</li>
          <li>Wish List</li>
          <li>Customer Services</li>
          <li>Home</li>
        </ul>
        <ul className="Menu-list-search-cart">
          <li>Search</li>
          <li className="icon">
            <Link to="/cart">
              <ShoppingCartIcon fontSize="large" />
              <span>{numberOfItems}</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
