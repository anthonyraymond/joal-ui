// @flow
import { connect } from 'react-redux';
import NavigationBar from './navigationBar.component';
import { push } from 'connected-react-router';
import type { StateType } from '../../types';

function mapStateToProps(state: StateType) {
  return {
    currentPath: state.router.location.pathname
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onClickDashboard: () => dispatch(push('/')),
    onClickSettings: () => dispatch(push('/settings')),
    onClickLogs: () => dispatch(push('/history'))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
