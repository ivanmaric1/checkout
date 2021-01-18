import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './Cart.scss';

interface Props {
  cart: any[];
  onAddToCart: (name: string) => void;
  onRemoveFromCart: (name: string) => void;
}

interface Item {
  name: string;
  price: number;
  image: string;
  quantity?: number;
}

const Cart: React.FC<Props> = ({ cart, onAddToCart, onRemoveFromCart }) => {
  const total =
    cart.length > 1
      ? cart
          .reduce(
            (a: any, b: any) => a.price * a.quantity + b.price * b.quantity
          )
          .toFixed(2)
      : null;
  const items = cart.map((item: any) => {
    return (
      <div key={item.name} className="Cart-items-item">
        <img
          src={item.image}
          alt="item.name"
          className={'Cart-items-item-bigg'}
        />
        <p className={'Cart-items-item-bigg'}>{item.name}</p>
        <div className="Cart-items-item-quantity Cart-items-item-small">
          <Button
            variant="contained"
            color="primary"
            onClick={() => onRemoveFromCart(item.name)}
          >
            -
          </Button>
          <p>{item.quantity}</p>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => onAddToCart(item.name)}
          >
            +
          </Button>
        </div>

        <p className={'Cart-items-item-small'}>
          {(item.price * item.quantity).toFixed(2)}
        </p>
      </div>
    );
  });
  return (
    <div className="Cart">
      <div className="Cart-items">
        {cart.length === 0 ? <h2>Cart Is Empty</h2> : <h2>Cart Items</h2>}
        {items}
      </div>

      <div>
        <div className="Cart-summary">
          <h2>Summary</h2>
          <div className="Cart-summary-total">
            <p>Total products:</p>
            {cart.length === 0
              ? null
              : cart.length > 1
              ? total
              : cart[0].price * cart[0].quantity}
          </div>
          <div className="Cart-summary-total">
            <p>Shipping costs</p>
            <p>Free</p>
          </div>
          <div className="Cart-summary-promo bold">
            <p>Add promo code</p>
            <TextField id="outlined-basic" label="CODE" variant="outlined" />
          </div>
          <div className="Cart-summary-promo-applyed"></div>
          <div className="Cart-summary-total bold">
            <p>Total:</p>
            {cart.length === 0
              ? null
              : cart.length > 1
              ? total
              : cart[0].price * cart[0].quantity}
          </div>
        </div>
        <Link to="/checkout">
          <button className="Cart-checkout">CKECKOUT</button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
