// @flow
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import LightModeOnIcon from '@material-ui/icons/Brightness2Outlined';
import DarkModeOnIcon from '@material-ui/icons/Brightness2';
import { withStyles } from '@material-ui/core/styles';

import { Palette } from '../types';

const styles = () => ({
  icon: {
    fill: '#FFF'
  }
});

interface ThemeModifierProps {
  classes: any,
  palette: Palette,
  onClickChangeThemeType: () => void
}

const ThemeModifier: React.FC<ThemeModifierProps> = ({ classes, palette, onClickChangeThemeType }) => (
  <div>
    <IconButton aria-label="Switch theme type" onClick={onClickChangeThemeType}>
      {palette.type === 'light'
        ? <LightModeOnIcon className={classes.icon} />
        : <DarkModeOnIcon className={classes.icon} />
      }
    </IconButton>
  </div>
);

export default withStyles(styles)(ThemeModifier);
