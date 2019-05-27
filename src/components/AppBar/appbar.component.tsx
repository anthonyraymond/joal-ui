import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles, createStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { ThemeModifier } from '../../modules/theme';

const styles = () => createStyles({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

type JoalAppBarProps = {
  classes: any,
  className?: any
}

const JoalAppBar: React.FC<JoalAppBarProps> = (props) => {
  const {
    className: classNameProps, classes
  } = props;

  return (
    <div className={classnames(classes.root, classNameProps)}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Joal
          </Typography>
          <ThemeModifier />
        </Toolbar>
      </AppBar>
    </div>
  );
};
JoalAppBar.defaultProps = {
  className: {}
};

export default withStyles(styles)(JoalAppBar);
