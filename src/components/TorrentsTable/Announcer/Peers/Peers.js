// @flow
import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  leechers: {
    color: theme.palette.primary.light,
    marginRight: 12
  },
  seeders: {
    color: theme.palette.primary.light
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
        <Tooltip title="leechers" aria-label="leechers" placement="top">
          <span className={classes.leechers} data-for="leechers" data-tip="Leechers">
            <i className="fa fa-cloud-download" aria-hidden="true" />
            {` ${leechersText}`}
          </span>
        </Tooltip>
        <Tooltip title="leechers" aria-label="seeders" placement="top">
          <span className={classes.seeders} data-for="seeders" data-tip="Seeders">
            <i className="fa fa-cloud-upload" aria-hidden="true" />
            {` ${seedersText}`}
          </span>
        </Tooltip>
      </div>
    </div>
  );
};
PeerStats.defaultProps = {
  className: '',
  leechers: undefined,
  seeders: undefined
};

export default withStyles(styles)(PeerStats);
