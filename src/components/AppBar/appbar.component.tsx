import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import classnames from 'classnames';
import { ThemeModifier } from '../../modules/theme';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      flexGrow: 1,
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    }
  })
);

type JoalAppBarProps = {
  className?: any
}

const JoalAppBar: React.FC<JoalAppBarProps> = (props) => {
  const classes = useStyles();
  const {
    className: classNameProps
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

export default JoalAppBar;
