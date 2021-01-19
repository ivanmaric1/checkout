import React from 'react';
import Button from '@material-ui/core/Button';

const Validator = () => {
  return (
    <div>
      <p>Are you sure ?</p>
      <Button variant="contained" color="primary" size="large">
        YES
      </Button>
      <Button variant="contained" color="secondary" size="large">
        NO
      </Button>
    </div>
  );
};

export default Validator;
