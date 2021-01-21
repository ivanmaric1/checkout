import React from 'react';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './Summary.scss';

interface Props {
  promoCode: string;
  total: string;
  setPromoCode: (code: string) => void;
  applyPromoCode: () => void;
  error: string;
  approvedCode: any;
  deletePromoCode: (code: string) => void;
  motionQuantity: boolean;
  smokeQuantity: boolean;
}

const Summary: React.FC<Props> = ({
  total,
  motionQuantity,
  smokeQuantity,
  promoCode,
  approvedCode,
  setPromoCode,
  applyPromoCode,
  error,
  deletePromoCode,
}) => {
  return (
    <div className="Summary">
      <h3>Summary</h3>
      <div className="Summary-total">
        <p>Total products:</p>
        {`${total} $`}
      </div>
      <div className="Summary-total">
        <p>Shipping costs</p>
        <p>Free</p>
      </div>
      <div className="Summary-promo bold">
        <p>Add promo code</p>
        <div className="Summary-promo-form">
          <TextField
            label="CODE"
            variant="outlined"
            onChange={(e) => setPromoCode(e.target.value)}
            size="small"
            value={promoCode}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => applyPromoCode()}
          >
            APPLY
          </Button>
        </div>
      </div>
      <div className="Summary-promo-applyed">
        {approvedCode.map((item: any) => {
          return (
            <div key={item.code}>
              <div className="Summary-promo-applyed-code">
                <div className="Summary-promo-applyed-code-box">
                  <CheckBoxIcon color="primary" />
                  <p>{item.code} COUPON APPLYED</p>
                </div>
                <DeleteIcon
                  color="secondary"
                  onClick={() => deletePromoCode(item.code)}
                />
              </div>
              <p className="description">{item.description}</p>
            </div>
          );
        })}
        <p className="Error">{error}</p>
      </div>
      <div className="Summary-quantity">
        <p>{motionQuantity ? '3 Motion sensors for 65.00 EUR' : null}</p>
        <p>{smokeQuantity ? '2 Smoke Sensors for 35.00 EUR' : null}</p>
      </div>
      <div className="Summary-total bold">
        <p>Total:</p>
        {`${total} $`}
      </div>
    </div>
  );
};

export default Summary;
