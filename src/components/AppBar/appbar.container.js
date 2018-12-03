// @flow
import { connect } from 'react-redux';
import AppBarComponent from './appbar.component';
import { changeTheme } from './appbar.actions';
import type { StateType, Dispatch } from '../../types';

function mapStateToProps(state: StateType) {
  return {
    isLightTheme: state.app.theme.type === 'light'
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return ({
    onRequestThemeChange: () => dispatch(changeTheme())
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(AppBarComponent);
