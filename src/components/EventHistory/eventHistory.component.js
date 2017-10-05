// @flow
import React from 'react';
import IconWarning from 'material-ui/svg-icons/alert/warning';
import { orange500 } from 'material-ui/styles/colors';

type Props = {
  events: Array<string>
};

const EventHistory = ({ events }: Props) => {
  if (events) {
    // TODO: implement me. this if is just a placeholder to prevent no-unused-params
  }
  return (
    <div>
      <div className="row">
        <div style={{ marginTop: 25 }} className="text-center col-xs-12">
          <IconWarning
            viewBox="0 0 24 20"
            style={{ height: 240, width: 200 }}
            color={orange500}
          />
        </div>
        <div className="text-center col-xs-12">
          <b>Hey it looks like you discovered the super secret tab !</b>
        </div>
        <div className="text-center col-xs-12">
          This tab will tell you what was the last actions JOAL has performed. Unfortunately this is still under development, check it back later ;)
        </div>
      </div>
    </div>
  );
};

export default EventHistory;
