// @flow
import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

type Props = {
  active: boolean
};

const FetchingIndicator = (props: Props) => {
  const { active, ...rest } = props;

  if (!active) {
    return (<div />);
  }
  return (
    <div className="text-center" style={{ position: 'relative' }}>
      {active && <CircularProgress {...rest} />}
    </div>
  );
};

export default FetchingIndicator;
