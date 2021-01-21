import React from 'react';
import Button from '@material-ui/core/Button';
import './Item.scss';

interface Props {
  name: string;
  price: number;
  img: string;
  cart: any;
  onAddToCart: (name: string) => void;
}

const Item: React.FC<Props> = ({ name, price, img, cart, onAddToCart }) => {
  const exist = cart.find((item: any) => item.name === name);

  return (
    <div className="Item">
      <img src={img} alt={`${name} image`} />
      <p className="Item-field">{name}</p>
      <p className="Item-field">{`${price} $`}</p>
      <Button
        variant="outlined"
        size="medium"
        onClick={() => onAddToCart(name)}
        className="Item-field"
      >
        {exist
          ? exist.name === name
            ? 'In cart / Add more'
            : 'Add to cart'
          : 'Add to cart'}
      </Button>
    </div>
  );
};

export default Item;
