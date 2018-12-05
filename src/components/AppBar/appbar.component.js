import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

const styles = {
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
};

type Props = {
  classes: {},
  className?: {},
  isLightTheme: boolean,
  onRequestThemeChange: () => void
}

const JoalAppBar = (props: Props) => {
  const {
    className: classNameProps, classes, isLightTheme, onRequestThemeChange
  } = props;

  return (
    <div className={classnames(classes.root, classNameProps)}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Joal
          </Typography>
          <Tooltip
            title={`Switch to ${isLightTheme ? 'dark' : 'light'} theme`}
            aria-label={`Switch to ${isLightTheme ? 'dark' : 'light'} theme`}
            placement="left"
          >
            <FormControlLabel
              control={
                <Switch checked={!isLightTheme} onChange={onRequestThemeChange} aria-label="ThemeSwitch" />
              }
            />
          </Tooltip>
        </Toolbar>
      </AppBar>
    </div>
  );
};
JoalAppBar.defaultProps = {
  className: {}
};

export default withStyles(styles)(JoalAppBar);
