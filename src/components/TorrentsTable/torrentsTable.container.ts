import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Announcers from './torrentsTable.component';
import { changeSearchFilterText, changeTorrentSort } from './torrentsTable.actions';
import { deleteTorrent } from '../../modules/joal-api';
import { createSelector } from 'reselect'

import { JoalState } from '../../reducers/types';
import { Announcer as AnnouncerType } from '../../modules/joal-api/types';

const getSearchFilter = (state: JoalState) => state.app.torrentsTable.searchFilter;
const getAnnouncers = (state: JoalState) => state.api.announcers;
const getFilteredAnnouncers = createSelector(
  [ getSearchFilter, getAnnouncers ],
  (searchFilter: string, announcers: Array<AnnouncerType>) => {
    if (searchFilter.trim().length === 0) {
      return announcers;
    }
    const filterText = searchFilter.toLowerCase();
    return announcers.filter(a => a.torrentName.toLowerCase().includes(filterText));
  }
)

const getSortProperty = (state: JoalState) => state.app.torrentsTable.sortProperty;
const getSortDirection = (state: JoalState) => state.app.torrentsTable.sortDirection;
const getSortedAndFilteredAnnouncers = createSelector(
  [ getSortProperty, getSortDirection, getFilteredAnnouncers ],
  (sortProperty: string, sortDirection: string, filteredAnnouncers: Array<AnnouncerType>) => {
    if (sortProperty === '' || sortProperty === undefined || sortProperty === null) {
      return filteredAnnouncers;
    }

    // Spread the array to sort on a copy of the original, it will prevent side effects on the original array
    return [...filteredAnnouncers].sort((t1: any, t2: any) => {
      if (t1[sortProperty] < t2[sortProperty]) return sortDirection === 'asc' ? -1 : 1;
      if (t1[sortProperty] === t2[sortProperty]) return 0;
      return sortDirection === 'asc' ? 1 : -1;
    });
  }
)

function mapStateToProps(state: JoalState) {
  return {
    announcers: getSortedAndFilteredAnnouncers(state),
    searchFilter: state.app.torrentsTable.searchFilter,
    sortProperty: state.app.torrentsTable.sortProperty,
    sortDirection: state.app.torrentsTable.sortDirection,
  };
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onFilterTextChange: (text: string) => dispatch(changeSearchFilterText(text)),
    onSortChange: (sortProperty: string , sortDirection: string) => dispatch(changeTorrentSort(sortProperty, sortDirection)),
    onClickDeleteTorrent: (infoHash: string) => deleteTorrent(infoHash),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Announcers);
