// @flow
import React from 'react';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import Dashboard from './dashboard.component';
import type { StateType } from '../../types';


type Props = {
  isStarted: boolean
};

const DashboardPage = (props: Props) => {
  const { isStarted } = props;

  return (
    <div>
      <Dashboard isStarted={isStarted} />
      <ReactTooltip place="top" type="dark" effect="float" />
    </div>
  );
};


function mapStateToProps(state: StateType) {
  return {
    isStarted: state.api.client.isStarted
  };
}

export default connect(mapStateToProps)(DashboardPage);
