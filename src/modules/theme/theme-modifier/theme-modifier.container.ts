import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import ThemeModifier from './theme-modifier.component';
import { changeThemeType } from './theme-modifier.actions';

import { JoalState } from '../../../reducers/types';

const mapStateToProps = (state: JoalState) => ({
  palette: state.theme.palette
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onClickChangeThemeType: () => dispatch(changeThemeType()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ThemeModifier);
