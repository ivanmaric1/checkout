import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Cards from 'react-credit-cards';
import TextField from '@material-ui/core/TextField';
import 'react-credit-cards/es/styles-compiled.css';
import './Checkout.scss';

const Checkout = ({ name, setName, email, setEmail, adress, setAdress }) => {
  const [number, setNumber] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [focus, setFocus] = useState('');

  const closeValidator = () => {
    var x = document.getElementById('ValidatorFinish');
    x.style.display = 'none';
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
  };

  const openValidator = () => {
    if (
      name.length > 0 &&
      email.length > 0 &&
      adress.length > 0 &&
      number.length > 0 &&
      nameOnCard.length > 0 &&
      expiry.length > 0 &&
      cvc.length > 0 &&
      focus.length > 0
    ) {
      var x = document.getElementById('ValidatorFinish');
      x.style.display = 'block';
    }
  };

  return (
    <div className="Checkout">
      <h3>Checkout</h3>
      <form className="Checkout-form" id="checkout" onSubmit={onFormSubmit}>
        <div className="Checkout-form-left">
          <div className="Checkout-form-info">
            <TextField
              id="filled-basic"
              label="Name"
              required
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              id="filled-basic"
              label="E-mail"
              required
              name="number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="filled-basic"
              label="Adress"
              required
              name="number"
              value={adress}
              onChange={(e) => setAdress(e.target.value)}
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
              value={nameOnCard}
              size="small"
              onChange={(e) => setNameOnCard(e.target.value)}
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

          <button
            className="finish"
            type="submit"
            onClick={() => openValidator()}
          >
            FINISH ORDER
          </button>
        </div>
      </form>
      <div className="ValidatorFinish" id="ValidatorFinish">
        <p>DO YOU WANT TO FINISH ORDER</p>
        <ul>
          <Link to="/order">
            <li>YES</li>
          </Link>
          <li onClick={() => closeValidator()}>NO</li>
        </ul>
      </div>
    </div>
  );
};

export default Checkout;
