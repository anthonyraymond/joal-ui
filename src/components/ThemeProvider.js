// @flow
import React from 'react';
import { connect } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import primary from '@material-ui/core/colors/purple';
import secondary from '@material-ui/core/colors/lightBlue';
import CssBaseline from '@material-ui/core/CssBaseline';


const materialUiThemeCreator = (themeProfile: 'light' | 'dark') => createMuiTheme({
  palette: {
    primary: {
      light: primary[300],
      main: primary[500],
      dark: primary[700],
    },
    secondary: {
      light: secondary[300],
      dark: secondary[500],
      main: secondary[700],
    },
    type: themeProfile
  },
  typography: {
    useNextVariants: true,
  },
});

type Props = {
  children: {},
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

function mapStateToProps(state) {
  return {
    themeType: state.app.theme.type
  };
}

export default connect(mapStateToProps)(ThemeProvider);
