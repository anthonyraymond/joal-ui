// @flow
import update from 'immutability-helper';
import createReducer from '../../reducers/createReducer';
import {
  TORRENT_SEARCH_FILTER_TEXT_CHANGED,
  TORRENT_SORT_CHANGED
} from './torrentsTable.actions';
import type {
  Handler,
  Action
} from '../../types';

const initialState = {
  searchFilter: '',
  sortProperty: '',
  sortDirection: '',
  currentPage: 1,
  torrentsPerPage: 10
};

const handlers: Handler<> = {
  [TORRENT_SEARCH_FILTER_TEXT_CHANGED](state, action: Action<string>) {
    return update(state, {
      searchFilter: { $set: action.text }
    });
  },
  [TORRENT_SORT_CHANGED](state, action: Action<string>) {
    return update(state, {
      sortProperty: { $set: action.sortProperty },
      sortDirection: { $set: action.sortDirection }
    });
  }
};

export default createReducer(initialState, handlers);
