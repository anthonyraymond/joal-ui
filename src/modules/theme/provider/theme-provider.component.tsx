// @flow
import React, { ReactNode } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import primary from '@material-ui/core/colors/blue';
import secondary from '@material-ui/core/colors/lightGreen';
import CssBaseline from '@material-ui/core/CssBaseline';


const materialUiThemeCreator = (themeType: 'light' | 'dark') => createMuiTheme({
  palette: {
    primary: {
      light: primary[300],
      main: primary[500],
      dark: primary[700],
    },
    secondary: {
      light: secondary[300],
      main: secondary[500],
      dark: secondary[700],
    },
    type: themeType
  },
  typography: {
    useNextVariants: true,
  },
});

type Props = {
  children: ReactNode,
  themeType: 'light' | 'dark'
};

const ThemeProvider = (props: Props) => {
  const { children, themeType } = props;
  return (
    <MuiThemeProvider theme={materialUiThemeCreator(themeType)}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
