// @flow
import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  container: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

type Props = {
  classes: {},
  active: boolean
};

const FetchingIndicator = (props: Props) => {
  const { classes, active, ...rest } = props;

  if (!active) {
    return (<div />);
  }
  return (
    <div className={classes.container}>
      {active && <CircularProgress {...rest} />}
    </div>
  );
};

export default withStyles(styles)(FetchingIndicator);
