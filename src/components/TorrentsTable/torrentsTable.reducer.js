import { createReducer } from 'redux-starter-kit';
import {
  TORRENT_SEARCH_FILTER_TEXT_CHANGED,
  TORRENT_SORT_CHANGED
} from './torrentsTable.actions';

const initialState = {
  searchFilter: '',
  sortProperty: '',
  sortDirection: '',
  currentPage: 1,
  torrentsPerPage: 10
};


export default createReducer(initialState, {
  [TORRENT_SEARCH_FILTER_TEXT_CHANGED]: (state, action) => {
    state.searchFilter = action.text
  },
  [TORRENT_SORT_CHANGED]: (state, action) => {
    state.sortProperty = action.sortProperty;
    state.sortDirection = action.sortDirection;
  }
});
