import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    container: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  })
);

type FetchingIndicatorProps = {
  active: boolean
};

const FetchingIndicator: React.FC<FetchingIndicatorProps> = (props) => {
  const classes = useStyles();
  const { active, ...rest } = props;

  if (!active) {
    return (<div />);
  }
  return (
    <div className={classes.container}>
      {active && <CircularProgress {...rest} />}
    </div>
  );
};

export default FetchingIndicator;
