import React from 'react';
import { Link } from 'react-router-dom';
import './Order.scss';

interface Props {
  cart: any;
  approvedCode: any;
  total: string;
  name: string;
  email: string;
  adress: string;
}

const Order: React.FC<Props> = ({
  cart,
  approvedCode,
  total,
  name,
  adress,
  email,
}) => {
  return (
    <div className="Order">
      <h3>ORDER COMPLETED!</h3>
      <div className="Order-data">
        <div className="Order-data-items">
          <h3>ITEMS</h3>
          <div className="Order-legend">
            <p>NAME</p>
            <p>PRICE</p>
            <p>QUANTITY</p>
          </div>
          {cart.map((item: any) => {
            return (
              <div key={item.name} className="Order-item">
                <p>{item.name}</p>
                <p>{item.price}</p>
                <p>{item.quantity}</p>
              </div>
            );
          })}
        </div>
        <h3>ORDER INFO</h3>
        <div className="Order-data-info">
          <table>
            <thead>
              <tr>
                <td>NAME</td>
                <td>{name}</td>
              </tr>
            </thead>
            <tr>
              <td>E-MAIL</td>
              <td>{email}</td>
            </tr>
            <tfoot>
              <tr>
                <td>ADRESS</td>
                <td>{adress}</td>
              </tr>
            </tfoot>
          </table>
          <table>
            <thead>
              <tr>
                <td>COUPONS APPLYED</td>
                <td>
                  {approvedCode.map((item: any) => (
                    <span className="Order-data-info-code">{item.code}</span>
                  ))}
                </td>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <td>PRICE TOTAL: </td>
                <td>{total}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <Link to="/">
        <button className="Order-btn">BACK TO HOME</button>
      </Link>
    </div>
  );
};

export default Order;
