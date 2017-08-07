// @flow
import React from 'react';
import TextField from 'material-ui/TextField';
import styles from './styles.css';

type Props = {
  minUploadRate: number,
  maxUploadRate: number,
  onChange: () => { minUploadRate: number, maxUploadRate: number}
};

const UploadRateFields = (props: Props) => {
  const { minUploadRate, maxUploadRate, onChange } = props;

  const valueHasChanged = (newValue) => onChange(Object.assign({},
    { minUploadRate, maxUploadRate },
    newValue
  ));

  return (
    <div>
      <TextField
        className={styles.inlineFieldStyle}
        floatingLabelText="Mininum upload rate (kB/s)"
        type="number"
        min={0}
        value={minUploadRate}
        onChange={(event) => {
          const value = parseInt(event.target.value, 10);
          if (isNaN(value)) return;
          valueHasChanged({ minUploadRate: value });
        }}
      />
      <TextField
        className={styles.inlineFieldStyle}
        floatingLabelText="Maximum upload rate (kB/s)"
        type="number"
        min={0}
        value={maxUploadRate}
        onChange={(event) => {
          const value = parseInt(event.target.value, 10);
          if (isNaN(value)) return;
          valueHasChanged({ maxUploadRate: value });
        }}
      />
    </div>
  );
};

export default UploadRateFields;
