// @flow
import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles, createStyles } from '@material-ui/core/styles';

const styles = () => createStyles({
  container: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

type FetchingIndicatorProps = {
  classes: any,
  active: boolean
};

const FetchingIndicator: React.FC<FetchingIndicatorProps> = (props) => {
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
