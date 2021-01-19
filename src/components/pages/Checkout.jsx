import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Cards from 'react-credit-cards';
import TextField from '@material-ui/core/TextField';
import 'react-credit-cards/es/styles-compiled.css';
import './Checkout.scss';

const Checkout = () => {
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [focus, setFocus] = useState('');

  return (
    <div className="Checkout">
      <h3>Checkout</h3>
      <div className="Checkout-form">
        <div className="Checkout-form-left">
          <div className="Checkout-form-info">
            <TextField
              id="filled-basic"
              label="Name"
              required
              name="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              onFocus={(e) => setFocus(e.target.name)}
            />
            <TextField
              id="filled-basic"
              label="E-mail"
              required
              name="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              onFocus={(e) => setFocus(e.target.name)}
            />
            <TextField
              id="filled-basic"
              label="Adress"
              required
              name="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              onFocus={(e) => setFocus(e.target.name)}
            />
          </div>
          <div className="Checkout-form-card">
            <TextField
              label="Card Number"
              required
              name="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              onFocus={(e) => setFocus(e.target.name)}
            />
            <TextField
              label="Name"
              required
              name="name"
              value={name}
              size="small"
              onChange={(e) => setName(e.target.value)}
              onFocus={(e) => setFocus(e.target.name)}
            />
            <TextField
              label="MM/YY Expiry"
              required
              name="expiry"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              onFocus={(e) => setFocus(e.target.name)}
            />
            <TextField
              label="CVC"
              required
              name="cvc"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              onFocus={(e) => setFocus(e.target.name)}
            />
          </div>
        </div>
        <div className="Checkout-form-right">
          <div className="Checkout-card">
            <Cards
              number={number}
              name={name}
              expiry={expiry}
              cvc={cvc}
              focused={focus}
            />
          </div>
          <Link to="/checkout">
            <button className="finish">CKECKOUT</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
