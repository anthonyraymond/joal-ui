// @flow
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import LightModeOnIcon from '@material-ui/icons/Brightness2Outlined';
import DarkModeOnIcon from '@material-ui/icons/Brightness2';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  icon: {
    fill: '#FFF'
  }
});

type Props = {
  classes: {},
  palette: {},
  onClickChangeThemeType: () => void
}

const ThemeChanger = ({ classes, palette, onClickChangeThemeType }: Props) => (
  <div>
    <IconButton aria-label="Switch theme type" onClick={onClickChangeThemeType}>
      {palette.type === 'light'
        ? <LightModeOnIcon className={classes.icon} fontSize="medium" />
        : <DarkModeOnIcon className={classes.icon} fontSize="medium" />
      }
    </IconButton>
  </div>
);

export default withStyles(styles)(ThemeChanger);
