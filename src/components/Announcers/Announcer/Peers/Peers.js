// @flow
import React from 'react';
import ReactTooltip from 'react-tooltip';
import styles from './styles.css';

type Props = {
  leechers: ?number,
  seeders: ?number
};

const PeerStats = (props: Props) => {
  let { leechers, seeders } = props;
  if (leechers === undefined) leechers = '?';
  if (seeders === undefined) seeders = '?';

  return (
    <div>
      <div>
        <span className={styles.leechers} data-for="seeders" data-tip="Seeders">
          <i className="fa fa-cloud-download" aria-hidden="true" />
          {' '}{leechers}
        </span>
        <span className={styles.seeders} data-for="leechers" data-tip="Leechers">
          <i className="fa fa-cloud-upload" aria-hidden="true" />
          {' '}{seeders}
        </span>
      </div>
      <ReactTooltip id="seeders" />
      <ReactTooltip id="leechers" />
    </div>
  );
};
PeerStats.defaultProps = {
  leechers: undefined,
  seeders: undefined
};

export default PeerStats;
