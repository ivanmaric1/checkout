import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import fire from '../firebase/fire';
import Menu from '../smaller components/Menu';
import HomePage from './HomePage';
import Cart from './Cart';
import Checkout from './Checkout';
import Summary from './Summary';
import Footer from '../smaller components/Footer';
import './Shop.scss';

interface Item {
  name: string;
  price: number;
  image: string;
  quantity?: number;
}

const Shop = () => {
  const [cart, setCart] = useState<Item[]>([]);
  const [items, setItems] = useState([]);
  const [promotions, setPromotions] = useState('');
  const itemsRef = fire.database().ref('/items');
  const promotionsRef = fire.database().ref('/promotions');

  //Download podataka kod učitavanja stranice
  useEffect(() => {
    const gotItems = (data: any) => {
      const itemsFromServer: any = [];
      const dataa = data.val();
      Object.keys(dataa).forEach((item: any) =>
        itemsFromServer.push(dataa[item])
      );
      setItems(itemsFromServer);
    };
    //Download itemsa sa firebase-a i spremanje u state
    const gotPromotions = (data: any) => {
      setPromotions(data.val());
    };
    //Download promotionsa sa firebase-a i spremanje u state
    const errDataLoad = (err: any) => {
      console.log(err);
    };
    promotionsRef.on('value', gotPromotions, errDataLoad);
    itemsRef.on('value', gotItems, errDataLoad);
  }, []);

  //Dodaj proizvod u košaricu
  const onAddToCart = (name: string) => {
    const existInCart: any = cart.find((item: any) => item.name === name);
    const newItemInCart: any = items.filter((item: any) => item.name === name);
    if (existInCart) {
      setCart(
        cart.map((item: any) =>
          item.name === name
            ? {
                ...existInCart,
                quantity: item.quantity + 1,
              }
            : item
        )
      );
    } else {
      setCart([...cart, { ...newItemInCart[0], quantity: 1 }]);
    }
  };

  //Izbaci proizvod iz košarice
  const onRemoveFromCart = (name: string) => {
    const existInCart: any = cart.find((item: any) => item.name === name);
    if (existInCart.quantity === 1) {
      setCart(cart.filter((item: any) => item.name !== name));
    } else {
      setCart(
        cart.map((item: any) =>
          item.name === name
            ? {
                ...existInCart,
                quantity: item.quantity - 1,
              }
            : item
        )
      );
    }
  };

  return (
    <div className="Shop">
      <div className="Shop-container">
        <Menu />
        <Switch>
          <Route
            path="/cart"
            component={() => (
              <Cart
                cart={cart}
                onAddToCart={onAddToCart}
                onRemoveFromCart={onRemoveFromCart}
              />
            )}
          />
          <Route
            exact
            path="/"
            component={() => (
              <HomePage items={items} onAddToCart={onAddToCart} />
            )}
          />

          <Route path="/checkout" component={Checkout} />
          <Route path="/summary" component={Summary} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default Shop;
