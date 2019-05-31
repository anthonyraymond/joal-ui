import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import NavigationBar from './navigationBar.component';
import { push } from 'connected-react-router';

import { JoalState } from '../../reducers/types';

const mapStateToProps = (state: JoalState) => {
  return {
    currentPath: state.router.location.pathname
  };
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onClickDashboard: () => dispatch(push('/')),
    onClickSettings: () => dispatch(push('/settings')),
    onClickLogs: () => dispatch(push('/history'))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
