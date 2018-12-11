// @flow
import { connect } from 'react-redux';
import EventHistoryComponent from './event-history.component';

function mapStateToProps() {
  return {
    events: []
  };
}

export default connect(mapStateToProps)(EventHistoryComponent);
