// @flow
import { connect } from 'react-redux';
import NavigationBar from './navigationBar.component';
import { push } from 'connected-react-router';

const mapStateToProps = (state) => {
  return {
    currentPath: state.router.location.pathname
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClickDashboard: () => dispatch(push('/')),
    onClickSettings: () => dispatch(push('/settings')),
    onClickLogs: () => dispatch(push('/history'))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
