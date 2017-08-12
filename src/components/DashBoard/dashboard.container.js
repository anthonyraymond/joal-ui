// @flow
import React from 'react';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import isElectron from 'is-electron';
import Dashboard from './dashboard.component';
import type { StateType } from '../../types';


type Props = {
  isStarted: boolean,
  shouldDisplayConfigChangerButton: boolean
};

const DashboardPage = (props: Props) => {
  const { isStarted, shouldDisplayConfigChangerButton } = props;

  return (
    <div>
      <Dashboard
        isStarted={isStarted}
        shouldDisplayConfigChangerButton={shouldDisplayConfigChangerButton}
      />
      <ReactTooltip place="top" type="dark" effect="float" />
    </div>
  );
};


function mapStateToProps(state: StateType) {
  return {
    isStarted: state.api.client.isStarted,
    shouldDisplayConfigChangerButton: !isElectron()
  };
}

export default connect(mapStateToProps)(DashboardPage);
