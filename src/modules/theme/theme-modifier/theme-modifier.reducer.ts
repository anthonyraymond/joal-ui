import { createReducer } from 'redux-starter-kit';
import {
  CHANGE_THEME_TYPE
} from './theme-modifier.actions';


const initialState = {
  palette: {
    type: localStorage.getItem('themeType') || 'light'
  }
};

export default createReducer(initialState, {
  [CHANGE_THEME_TYPE]: (state) => {
    const newTheme = state.palette.type === 'light' ? 'dark' : 'light';
    localStorage.setItem('themeType', newTheme);

    state.palette.type = newTheme
  }
});
