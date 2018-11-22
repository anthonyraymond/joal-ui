// @flow
import React from 'react';
import ReactTooltip from 'react-tooltip';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  leechers: {
    color: '#3498DB',
    marginRight: 12
  },
  seeders: {
    color: '#27AE60'
  }
});

type Props = {
  classes: {},
  className?: string,
  leechers?: number,
  seeders?: ?number
};

const PeerStats = (props: Props) => {
  const {
    className: classNameProps, classes, leechers, seeders
  } = props;
  const leechersText = (leechers === null || leechers === undefined) ? '?' : leechers;
  const seedersText = (seeders === null || seeders === undefined) ? '?' : seeders;

  return (
    <div className={classNameProps}>
      <div>
        <span className={classes.leechers} data-for="leechers" data-tip="Leechers">
          <i className="fa fa-cloud-download" aria-hidden="true" />
          {` ${leechersText}`}
        </span>
        <span className={classes.seeders} data-for="seeders" data-tip="Seeders">
          <i className="fa fa-cloud-upload" aria-hidden="true" />
          {` ${seedersText}`}
        </span>
      </div>
      <ReactTooltip id="leechers" />
      <ReactTooltip id="seeders" />
    </div>
  );
};
PeerStats.defaultProps = {
  className: '',
  leechers: undefined,
  seeders: undefined
};

export default withStyles(styles)(PeerStats);
