import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import fire from '../firebase/fire';
import Menu from '../smaller components/Menu';
import HomePage from './HomePage';
import Cart from './Cart';
import Checkout from './Checkout';
import Order from './Order';
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
  const [total, setTotal] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [adress, setAdress] = useState('');
  const [promotions, setPromotions] = useState('');
  const [numberOfItems, setNumberOfItems] = useState(0);
  const [approvedCode, setApprovedCode] = useState<any>([]);
  const [buyerInfo, setBuyerInfo] = useState(0);
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
      const itemsFromServer: any = [];
      const dataa = data.val();
      Object.keys(dataa).forEach((item: any) =>
        itemsFromServer.push(dataa[item])
      );
      setPromotions(itemsFromServer);
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
      let num = numberOfItems;
      setNumberOfItems(num + 1);
    } else {
      setCart([...cart, { ...newItemInCart[0], quantity: 1 }]);
      let num = numberOfItems;
      setNumberOfItems(num + 1);
    }
  };

  //Smanji količinu proizvoda iz košarice
  const onReduceFromCart = (name: string) => {
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

  //Obriši proizvod iz košarice
  const onRemoveFromCart = (name: string) => {
    setCart(cart.filter((item: any) => item.name !== name));
  };

  return (
    <div className="Shop">
      <div className="Shop-container">
        <Menu numberOfItems={numberOfItems} />
        <Switch>
          <Route
            path="/cart"
            component={() => (
              <Cart
                cart={cart}
                onAddToCart={onAddToCart}
                onReduceFromCart={onReduceFromCart}
                onRemoveFromCart={onRemoveFromCart}
                promotions={promotions}
                setNumberOfItems={setNumberOfItems}
                approvedCode={approvedCode}
                setApprovedCode={setApprovedCode}
                total={total}
                setTotal={setTotal}
              />
            )}
          />
          <Route
            exact
            path="/"
            component={() => (
              <HomePage items={items} onAddToCart={onAddToCart} cart={cart} />
            )}
          />

          <Route
            path="/checkout"
            component={() => (
              <Checkout
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                adress={adress}
                setAdress={setAdress}
              />
            )}
          />
          <Route
            path="/order"
            component={() => (
              <Order
                cart={cart}
                total={total}
                name={name}
                email={email}
                adress={adress}
                approvedCode={approvedCode}
              />
            )}
          />
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default Shop;
