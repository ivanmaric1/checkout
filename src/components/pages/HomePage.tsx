import React, { useState, useEffect } from 'react';
import Item from '../smaller components/Item';
import fire from '../firebase/fire';
import './HomePage.scss';

interface Props {
  onAddToCart: (name: string) => void;
  items: any;
}

const HomePage: React.FC<Props> = ({ onAddToCart, items }) => {
  const i: any = [];
  const Items = Object.keys(items).forEach((ir: any) => {
    i.push(items[ir]);
  });

  return (
    <div className="HomePage">
      <h2>Products</h2>
      {i.map((item: any) => (
        <Item
          name={item.name}
          price={item.price}
          img={item.image}
          onAddToCart={onAddToCart}
          key={item.name}
        />
      ))}
    </div>
  );
};

export default HomePage;
