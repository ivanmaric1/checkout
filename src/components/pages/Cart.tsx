import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../smaller components/CartItem';
import Summary from '../smaller components/Summary';
import './Cart.scss';

interface Props {
  cart: any[];
  promotions: any;
  total: string;
  approvedCode: any;
  setTotal: (str: any) => void;
  setApprovedCode: (str: any) => void;
  onAddToCart: (name: string) => void;
  onReduceFromCart: (name: string) => void;
  onRemoveFromCart: (name: string) => void;
  setNumberOfItems: (num: number) => void;
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
  total,
  setTotal,
  setApprovedCode,
  onAddToCart,
  onReduceFromCart,
  onRemoveFromCart,
  setNumberOfItems,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [error, setError] = useState('');
  const [motionQuantity, setMotionQuantity] = useState(false);
  const [smokeQuantity, setSmokeQuantity] = useState(false);
  useEffect(() => {
    calculateTotalPrice();
  });

  const calculateTotalPrice = () => {
    let totalPrice: number = 0;
    if (cart.length === 0) {
      totalPrice = 0;
    }
    if (cart.length === 1) {
      if (cart[0].name === 'Motion Sensor') {
        if (cart[0].quantity > 2) {
          setMotionQuantity(true);
          if (cart[0].quantity % 3 === 0) {
            totalPrice = (cart[0].quantity / 3) * 65;
          } else if (cart[0].quantity % 3 === 1) {
            totalPrice = ((cart[0].quantity - 1) / 3) * 65 + 24.99;
          } else {
            totalPrice = ((cart[0].quantity - 2) / 3) * 65 + 24.99 + 24.99;
          }
        } else {
          totalPrice = cart[0].price * cart[0].quantity;
        }
      } else {
        totalPrice = cart[0].price * cart[0].quantity;
      }
      if (cart[0].name === 'Smoke Sensor') {
        if (cart[0].quantity > 1) {
          setSmokeQuantity(true);
          if (cart[0].quantity % 2 === 0) {
            totalPrice = (cart[0].quantity / 2) * 35;
          } else {
            totalPrice = ((cart[0].quantity - 1) / 2) * 35 + 19.99;
          }
        } else {
          totalPrice = cart[0].price * cart[0].quantity;
        }
      }
    }
    if (cart.length > 1) {
      let sum = 0;
      let motion = cart.find((item: any) => item.name === 'Motion Sensor');
      let smoke = cart.find((item: any) => item.name === 'Smoke Sensor');
      for (let item of cart) {
        if (item.name === 'Motion Sensor') {
          if (item.quantity > 2) {
            setMotionQuantity(true);
            if (item.quantity % 3 === 0) {
              sum += (item.quantity / 3) * 65;
            } else if (item.quantity % 3 === 1) {
              sum += ((item.quantity - 1) / 3) * 65 + 24.99;
            } else {
              sum += ((item.quantity - 2) / 3) * 65 + 24.99 + 24.99;
            }
          } else {
            sum += item.price * item.quantity;
          }
        } else if (item.name === 'Smoke Sensor') {
          if (item.quantity > 1) {
            setSmokeQuantity(true);
            if (item.quantity % 2 === 0) {
              sum += (item.quantity / 2) * 35;
            } else {
              sum += ((item.quantity - 1) / 2) * 35 + 19.99;
            }
          } else {
            sum += item.price;
          }
        } else {
          sum += item.price * item.quantity;
        }
      }
      totalPrice = sum;
    }

    const code20percent = approvedCode.find(
      (item: any) => item.code === '20%OFF'
    );
    const code5percent = approvedCode.find(
      (item: any) => item.code === '5%OFF'
    );
    const code20euro = approvedCode.find(
      (item: any) => item.code === '20EUROFF'
    );
    if (code20percent) {
      totalPrice *= 0.8;
    }
    if (code5percent) {
      totalPrice *= 0.95;
    }
    if (code20euro) {
      totalPrice -= 20;
    }
    let fixedToTwo = totalPrice.toFixed(2);
    setTotal(fixedToTwo);
  };

  const applyPromoCode = () => {
    setError('');
    const matching = promotions.find((item: any) => item.code === promoCode);

    if (matching) {
      if (approvedCode.find((code: any) => code.code === matching.code)) {
        setError('Cannot add same coupon or 20%OFF with this coupons');
      } else {
        if (matching.code === '20%OFF') {
          if (approvedCode.length === 0) {
            setPromoCode('');
            setApprovedCode([{ ...matching }]);
          } else {
            setError(
              'Coupon 20%OFF cannot be used in conjunction with other codes'
            );
          }
        } else {
          if (approvedCode.length === 0) {
            setPromoCode('');
            setApprovedCode([{ ...matching }]);
          } else {
            if (approvedCode[0].code !== '20%OFF') {
              setPromoCode('');
              let mergeCodes = [...approvedCode, { ...matching }];
              setApprovedCode(mergeCodes);
            } else {
              setError(
                'Coupon cannot be used in conjunction with 20%OFF coupon'
              );
            }
          }
        }
      }
    } else {
      setError('Wrong code');
    }
    setPromoCode('');
  };

  //Obriši promo code
  const deletePromoCode = (code: string) => {
    const matching = approvedCode.filter((item: any) => item.code !== code);
    if (matching) {
      setApprovedCode(matching);
    }
    setError('');
  };

  if (cart.length > 0) {
    if (cart.length === 1) {
      setNumberOfItems(cart[0].quantity);
    } else {
      let totalItems = 0;
      for (let item of cart) totalItems += item.quantity;
      setNumberOfItems(totalItems);
    }
  } else {
    setNumberOfItems(0);
  }

  const openValidator = () => {
    var x: any = document.getElementById('Validator');
    x.style.display = 'block';
  };
  const closeValidator = () => {
    var x: any = document.getElementById('Validator');
    x.style.display = 'none';
  };

  return (
    <div className="Cart">
      <div className="Cart-items">
        {cart.length === 0 ? <h3>Cart Is Empty</h3> : <h3>Cart Items</h3>}
        {cart.map((item: any) => {
          return (
            <CartItem
              key={item.name}
              item={item}
              onReduceFromCart={onReduceFromCart}
              onAddToCart={onAddToCart}
              deletePromoCode={deletePromoCode}
              onRemoveFromCart={onRemoveFromCart}
            />
          );
        })}
      </div>
      {cart.length > 0 ? (
        <div className="Summary-wrapper">
          <Summary
            total={total}
            promoCode={promoCode}
            setPromoCode={setPromoCode}
            applyPromoCode={applyPromoCode}
            error={error}
            deletePromoCode={deletePromoCode}
            approvedCode={approvedCode}
            motionQuantity={motionQuantity}
            smokeQuantity={smokeQuantity}
          />
          <button className="Cart-checkout" onClick={() => openValidator()}>
            CKECKOUT
          </button>
        </div>
      ) : null}
      <div className="Validator" id="Validator">
        <p>DO YOU WANT TO CHECKOUT</p>
        <ul>
          <Link to="/checkout">
            <li>YES</li>
          </Link>
          <li onClick={() => closeValidator()}>NO</li>
        </ul>
      </div>
    </div>
  );
};

export default Cart;
