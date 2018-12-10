// @flow
import update from 'immutability-helper';
import createReducer from '../../../reducers/createReducer';
import {
  CHANGE_THEME_TYPE
} from './theme-modifier.actions';
import type {
  Handler
} from '../../../types';

const initialState = {
  palette: {
    type: localStorage.getItem('themeType') || 'light'
  }
};

const handlers: Handler<> = {
  [CHANGE_THEME_TYPE](state) {
    const newTheme = state.palette.type === 'light' ? 'dark' : 'light';
    localStorage.setItem('themeType', newTheme);
    return update(state, {
      palette: {
        type: { $set: newTheme }
      }
    });
  },
};

export default createReducer(initialState, handlers);
