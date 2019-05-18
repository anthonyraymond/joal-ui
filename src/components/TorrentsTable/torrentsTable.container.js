// @flow
import { connect } from 'react-redux';
import Announcers from './torrentsTable.component';
import { changeSearchFilterText, changeTorrentSort } from './torrentsTable.actions';
import { deleteTorrent } from '../../modules/joal-api';
import type { StateType, Dispatch } from '../../types';

const filterTorrents = (torrents, searchFilter) => {
  if (searchFilter.trim().length === 0) {
    return torrents;
  }
  const filterText = searchFilter.toLowerCase();
  return torrents.filter(t => t.torrentName.toLowerCase().includes(filterText));
};

function mapStateToProps(state: StateType) {
  return {
    announcers: filterTorrents(state.api.announcers, state.app.torrentsTable.searchFilter),
    searchFilter: state.app.torrentsTable.searchFilter,
    sortProperty: state.app.torrentsTable.sortProperty,
    sortDirection: state.app.torrentsTable.sortDirection,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    onFilterTextChange: (text) => dispatch(changeSearchFilterText(text)),
    onSortChange: (sortProperty, sortDirection) => dispatch(changeTorrentSort(sortProperty, sortDirection)),
    onClickDeleteTorrent: (infoHash) => deleteTorrent(infoHash),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Announcers);
