import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import './CartItem.scss';

interface Props {
  item: any;
  onReduceFromCart: (name: string) => void;
  onAddToCart: (name: string) => void;
  deletePromoCode: (code: string) => void;
  onRemoveFromCart: (name: string) => void;
}

const CartItem: React.FC<Props> = ({
  item,
  onRemoveFromCart,
  onAddToCart,
  deletePromoCode,
  onReduceFromCart,
}) => {
  let totalPrice = item.price * item.quantity;
  if (item.name === 'Motion Sensor') {
    if (item.quantity > 1) {
      if (item.quantity % 3 === 0) {
        totalPrice = (item.quantity / 3) * 65;
      } else if (item.quantity % 3 === 1) {
        totalPrice = ((item.quantity - 1) / 3) * 65 + 24.99;
      } else {
        totalPrice = ((item.quantity - 2) / 3) * 65 + 24.99 + 24.99;
      }
    }
  }
  if (item.name === 'Smoke Sensor') {
    if (item.quantity > 1) {
      if (item.quantity % 2 === 0) {
        totalPrice = (item.quantity / 2) * 35;
      } else {
        totalPrice = ((item.quantity - 1) / 2) * 35 + 19.99;
      }
    }
  }
  return (
    <div key={item.name} className="CartItem">
      <img src={item.image} alt={item.name} className={'CartItem-img'} />
      <p className={'CartItem-bigg'}>{item.name}</p>
      <p className={'CartItem-small price'}>{`${item.price} $`}</p>
      <div className="CartItem-quantity CartItem-small">
        <Button
          variant="contained"
          color="primary"
          onClick={() => onReduceFromCart(item.name)}
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
      <p className={'CartItem-small'}>{totalPrice.toFixed(2) + ' $'}</p>
      <DeleteIcon
        color="secondary"
        fontSize="large"
        onClick={() => onRemoveFromCart(item.name)}
      />
    </div>
  );
};

export default CartItem;
