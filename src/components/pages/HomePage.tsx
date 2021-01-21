import React from 'react';
import Item from '../smaller components/Item';

import './HomePage.scss';

interface Props {
  onAddToCart: (name: string) => void;
  items: any;
  cart: any;
}

const HomePage: React.FC<Props> = ({ onAddToCart, items, cart }) => {
  const i: any = [];
  const Items = Object.keys(items).forEach((ir: any) => {
    i.push(items[ir]);
  });
  return (
    <div className="HomePage">
      <h3>Products</h3>
      {i.map((item: any) => (
        <Item
          name={item.name}
          price={item.price}
          img={item.image}
          onAddToCart={onAddToCart}
          key={item.name}
          cart={cart}
        />
      ))}
    </div>
  );
};

export default HomePage;
