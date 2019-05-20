// @flow
import { connect } from 'react-redux';
import Announcers from './torrentsTable.component';
import { changeSearchFilterText, changeTorrentSort } from './torrentsTable.actions';
import { deleteTorrent } from '../../modules/joal-api';

const filterTorrents = (torrents, searchFilter) => {
  if (searchFilter.trim().length === 0) {
    return torrents;
  }
  const filterText = searchFilter.toLowerCase();
  return torrents.filter(t => t.torrentName.toLowerCase().includes(filterText));
};

const sortTorrents = (torrents, sortProperty, sortDirection) => {
  if (sortProperty === '' || sortProperty === undefined || sortProperty === null) {
    return torrents;
  }

  // Spread the array to sort on a copy of the original, it will prevent side effects on the original array
  return [...torrents].sort((t1, t2) => {
    if (t1[sortProperty] < t2[sortProperty]) return sortDirection === 'asc' ? -1 : 1;
    if (t1[sortProperty] === t2[sortProperty]) return 0;
    return sortDirection === 'asc' ? 1 : -1;
  });
};

function mapStateToProps(state) {
  return {
    announcers: sortTorrents(
      filterTorrents(state.api.announcers, state.app.torrentsTable.searchFilter),
      state.app.torrentsTable.sortProperty,
      state.app.torrentsTable.sortDirection
    ),
    searchFilter: state.app.torrentsTable.searchFilter,
    sortProperty: state.app.torrentsTable.sortProperty,
    sortDirection: state.app.torrentsTable.sortDirection,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFilterTextChange: (text) => dispatch(changeSearchFilterText(text)),
    onSortChange: (sortProperty, sortDirection) => dispatch(changeTorrentSort(sortProperty, sortDirection)),
    onClickDeleteTorrent: (infoHash) => deleteTorrent(infoHash),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Announcers);
