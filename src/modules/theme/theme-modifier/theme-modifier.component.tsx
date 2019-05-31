import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import LightModeOnIcon from '@material-ui/icons/Brightness2Outlined';
import DarkModeOnIcon from '@material-ui/icons/Brightness2';

import { Palette } from '../types';


interface ThemeModifierProps {
  palette: Palette,
  onClickChangeThemeType: () => void
}

const ThemeModifier: React.FC<ThemeModifierProps> = (props) => {
  const { palette, onClickChangeThemeType } = props;

  return (
    <div>
      <IconButton aria-label="Switch theme type" onClick={onClickChangeThemeType}>
        {palette.type === 'light'
          ? <LightModeOnIcon htmlColor="#fff" />
          : <DarkModeOnIcon htmlColor="#fff" />
        }
      </IconButton>
    </div>
  );
}

export default ThemeModifier;
