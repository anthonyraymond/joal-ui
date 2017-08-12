// @flow
import React from 'react';
import ClientInfo from '../ClientInfo';
import UiConfigChangerButton from '../UiConfigChanger';
import Announcers from '../Announcers';
import QueuedTorrents from '../QueuedTorrents';

type Props = {
  isStarted: boolean,
  shouldDisplayConfigChangerButton: boolean
};

const Dashboard = (props: Props) => (
  <div className="row">
    <div className="col-lg-3 col-md-4 col-xs-12">
      {props.shouldDisplayConfigChangerButton &&
        <UiConfigChangerButton style={{ position: 'relative', zIndex: 99999, marginBottom: 6 }} />
      }
      <ClientInfo />
    </div>
    {props.isStarted &&
      <div className="col-lg-9 col-md-8 col-xs-12">
        <h2>Currently seeding</h2>
        <div style={{ paddingLeft: 15, paddingRight: 15 }}>
          <Announcers />
        </div>
        <h2>Queued torrents</h2>
        <div style={{ paddingLeft: 15, paddingRight: 15 }}>
          <QueuedTorrents />
        </div>
      </div>
    }
  </div>
);

export default Dashboard;
