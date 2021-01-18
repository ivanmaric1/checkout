import React from 'react';
import Button from '@material-ui/core/Button';
import './Item.scss';

interface Props {
  name: string;
  price: number;
  img: string;
  onAddToCart: (name: string) => void;
}

const Item: React.FC<Props> = ({ name, price, img, onAddToCart }) => {
  return (
    <div className="Item">
      <img src={img} alt={`${name} image`} />
      <p className="Item-field">{name}</p>
      <p className="Item-field">{price}</p>
      <Button variant="outlined" size="large" onClick={() => onAddToCart(name)}>
        Add to cart
      </Button>
    </div>
  );
};

export default Item;
