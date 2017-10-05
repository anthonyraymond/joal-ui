// @flow
import { connect } from 'react-redux';
import EventHistoryComponent from './eventHistory.component';
// import type { StateType } from '../../types';

function mapStateToProps(/* state: StateType */) {
  return {
    events: []
  };
}

export default connect(mapStateToProps)(EventHistoryComponent);
