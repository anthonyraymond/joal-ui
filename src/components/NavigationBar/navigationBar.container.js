// @flow
import { connect } from 'react-redux';
import NavigationBar from './navigationBar.component';
import { history } from '../../store/configureStore';
import type { StateType } from '../../types';

function mapStateToProps(state: StateType) {
  return {
    currentPath: state.router.location.pathname
  };
}

function mapDispatchToProps() {
  return {
    onClickDashboard: () => history.push('/'),
    onClickSettings: () => history.push('/settings'),
    onClickLogs: () => history.push('/history')
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
