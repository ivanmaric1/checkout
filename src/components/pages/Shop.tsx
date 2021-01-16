import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Menu from '../smaller components/Menu';
import HomePage from './HomePage';
import Cart from './Cart';
import Checkout from './Checkout';
import Summary from './Summary';
import Footer from '../smaller components/Footer';
import './Shop.scss';

const Shop = () => {
  return (
    <div className="Shop">
      <Menu />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/summary" component={Summary} />
      </Switch>
      <Footer />
    </div>
  );
};

export default Shop;
