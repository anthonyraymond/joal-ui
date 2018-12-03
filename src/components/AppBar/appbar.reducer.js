// @flow
import update from 'immutability-helper';
import createReducer from '../../reducers/createReducer';
import {
  CHANGE_THEME,
} from './appbar.actions';
import type {
  Handler
} from '../../types';

const initialState = {
  type: localStorage.getItem('themeProfile') || 'light'
};

const handlers: Handler<> = {
  [CHANGE_THEME](state) {
    const newTheme = state.type === 'light' ? 'dark' : 'light';
    localStorage.setItem('themeProfile', newTheme);
    return update(state, {
      type: { $set: newTheme }
    });
  },
};

export default createReducer(initialState, handlers);
