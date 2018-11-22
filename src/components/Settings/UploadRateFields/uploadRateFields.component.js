// @flow
import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  inputSpacer: {
    marginRight: theme.spacing.unit * 2
  }
});

type Props = {
  classes: {},
  minUploadRate: number,
  maxUploadRate: number,
  onChange: () => { minUploadRate: number, maxUploadRate: number}
};

const UploadRateFields = (props: Props) => {
  const {
    classes, minUploadRate, maxUploadRate, onChange
  } = props;

  const valueHasChanged = (newValue) => onChange(Object.assign(
    {},
    { minUploadRate, maxUploadRate },
    newValue
  ));

  return (
    <Grid
      container
      direction="row"
    >
      <Grid item xs={12}>
        <TextField
          className={classes.inputSpacer}
          label="Min upload rate (kB/s)"
          type="number"
          min={0}
          value={minUploadRate}
          onChange={(event) => {
            const value = parseInt(event.target.value, 10);
            if (isNaN(value)) return; // eslint-disable-line no-restricted-globals
            valueHasChanged({ minUploadRate: value });
          }}
        />
        <TextField
          label="Max upload rate (kB/s)"
          type="number"
          min={0}
          value={maxUploadRate}
          onChange={(event) => {
            const value = parseInt(event.target.value, 10);
            if (isNaN(value)) return; // eslint-disable-line no-restricted-globals
            valueHasChanged({ maxUploadRate: value });
          }}
        />
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(UploadRateFields);
