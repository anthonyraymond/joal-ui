// @flow
import React from 'react';
import IconWarning from '@material-ui/icons/Warning';
import Grid from '@material-ui/core/Grid';
import orange from '@material-ui/core/colors/orange';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  container: {
    textAlign: 'center',
    marginTop: 100,
    height: '100%'
  }
});

type Props = {
  classes: {},
  events: Array<string>
};

const EventHistory = ({ classes, events }: Props) => {
  if (events) {
    // TODO: implement me. this if is just a placeholder to prevent no-unused-params
  }
  return (
    <Grid container className={classes.container}>
      <Grid item xs={12}>
        <IconWarning
          viewBox="0 0 24 20"
          style={{ color: orange[500], height: 200, width: 166 }}
        />
      </Grid>
      <Grid item xs={12}>
        <b>Hey it looks like you discovered the super secret tab !</b>
      </Grid>
      <Grid item xs={12}>
        This tab will tell you what was the last actions JOAL has performed. Unfortunately this is still under development, check it back later ;)
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(EventHistory);
