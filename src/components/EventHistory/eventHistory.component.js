// @flow
import React from 'react';

type Props = {
  events: Array<string>
};

const EventHistory = ({ events }: Props) => (
  <div>
    {events}
  </div>
);

export default EventHistory;
