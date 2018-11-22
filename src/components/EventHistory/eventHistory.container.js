// @flow
import { connect } from 'react-redux';
import EventHistoryComponent from './eventHistory.component';

function mapStateToProps() {
  return {
    events: []
  };
}

export default connect(mapStateToProps)(EventHistoryComponent);
