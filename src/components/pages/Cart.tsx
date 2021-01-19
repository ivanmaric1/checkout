import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../smaller components/CartItem';
import Summary from '../smaller components/Summary';

import './Cart.scss';

interface Props {
  cart: any[];
  promotions: any;
  approvedCode: any;
  setApprovedCode: any;
  promoCode: string;
  setPromoCode: any;
  deletePromoCode: (name: string) => void;
  onAddToCart: (name: string) => void;
  onReduceFromCart: (name: string) => void;
  onRemoveFromCart: (name: string) => void;
}

interface Item {
  name: string;
  price: number;
  image: string;
  quantity?: number;
}

const Cart: React.FC<Props> = ({
  cart,
  promotions,
  approvedCode,
  promoCode,
  setPromoCode,
  deletePromoCode,
  onAddToCart,
  onReduceFromCart,
  onRemoveFromCart,
  setApprovedCode,
}) => {
  const [total, setTotal] = useState('');

  useEffect(() => {
    calculateTotalPrice();
  });

  const calculateTotalPrice = () => {
    let totalPrice: any =
      cart.length === 0
        ? 0
        : cart.length === 1
        ? (cart[0].price * cart[0].quantity).toFixed(2)
        : cart.reduce((a: any, b: any) => a + b.price * b.quantity, 0);

    if (approvedCode.length > 0) {
      const find = approvedCode.find((item: any) => item.code === '20%OFF');
      if (find) {
        totalPrice = (totalPrice * 0.8).toFixed(2);
      }
    }
    setTotal(totalPrice);
  };

  const addPromoCode = () => {
    const matching = promotions.filter((item: any) => item.code === promoCode);
    if (matching) {
      let code: any = [...approvedCode, matching[0]];
      setApprovedCode(code);
    }
  };

  console.log(promotions);

  return (
    <div className="Cart">
      <div className="Cart-items">
        {cart.length === 0 ? <h3>Cart Is Empty</h3> : <h3>Cart Items</h3>}
        {cart.map((item: any) => {
          return (
            <CartItem
              item={item}
              onReduceFromCart={onReduceFromCart}
              onAddToCart={onAddToCart}
              deletePromoCode={deletePromoCode}
              onRemoveFromCart={onRemoveFromCart}
            />
          );
        })}
      </div>
      <div className="Summary-wrapper">
        <Summary
          total={total}
          setPromoCode={setPromoCode}
          addPromoCode={addPromoCode}
          deletePromoCode={deletePromoCode}
          approvedCode={approvedCode}
        />
        <Link to="/checkout">
          <button className="Cart-checkout">CKECKOUT</button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
