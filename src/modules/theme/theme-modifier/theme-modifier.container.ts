import { connect } from 'react-redux';
import ThemeModifier from './theme-modifier.component';
import { changeThemeType } from './theme-modifier.actions';

const mapStateToProps = (state) => ({
  palette: state.theme.palette
});

const mapDispatchToProps = (dispatch) => ({
  onClickChangeThemeType: () => dispatch(changeThemeType()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ThemeModifier);
