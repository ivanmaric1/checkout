import React from 'react';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

interface Props {
  total: any;
  approvedCode: any;
  setPromoCode: (code: string) => void;
  addPromoCode: () => void;
  deletePromoCode: (code: string) => void;
}

const Summary: React.FC<Props> = ({
  total,
  approvedCode,
  setPromoCode,
  addPromoCode,
  deletePromoCode,
}) => {
  return (
    <div className="Cart-summary">
      <h3>Summary</h3>
      <div className="Cart-summary-total">
        <p>Total products:</p>
        {`${total} $`}
      </div>
      <div className="Cart-summary-total">
        <p>Shipping costs</p>
        <p>Free</p>
      </div>
      <div className="Cart-summary-promo bold">
        <p>Add promo code</p>
        <div className="Cart-summary-promo-form">
          <TextField
            id="outlined-basic"
            label="CODE"
            variant="outlined"
            onChange={(e) => setPromoCode(e.target.value)}
            size="small"
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => addPromoCode()}
          >
            APPLY
          </Button>
        </div>
      </div>
      <div className="Cart-summary-promo-applyed">
        {approvedCode.map((item: any) => {
          return (
            <div key={item.code}>
              <div className="Cart-summary-promo-applyed-code">
                <div className="Cart-summary-promo-applyed-code-box">
                  <CheckBoxIcon color="primary" />
                  <p>{item.code}</p>
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
      </div>
      <div className="Cart-summary-total bold">
        <p>Total:</p>
        {`${total} $`}
      </div>
    </div>
  );
};

export default Summary;
