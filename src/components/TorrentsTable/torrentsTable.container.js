// @flow
import { connect } from 'react-redux';
import Announcers from './torrentsTable.component';
import { changeSearchFilterText } from './torrentsTable.actions';
import { deleteTorrent } from '../../modules/joal-api';
import type { StateType, Dispatch } from '../../types';

const filterTorrents = (torrents, searchFilter) => (
  torrents.filter(t => t.torrentName.includes(searchFilter))
);

function mapStateToProps(state: StateType) {
  return {
    announcers: filterTorrents(state.api.announcers, state.app.torrentsTable.searchFilter),
    searchFilter: state.app.torrentsTable.searchFilter
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    onFilterTextChange: (text) => dispatch(changeSearchFilterText(text)),
    onClickDeleteTorrent: (infoHash) => deleteTorrent(infoHash)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Announcers);
