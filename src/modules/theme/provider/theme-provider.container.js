import { connect } from 'react-redux';
import ThemeProviderComponent from './theme-provider.component';


function mapStateToProps(state) {
  return {
    themeType: state.theme.palette.type
  };
}

export default connect(mapStateToProps)(ThemeProviderComponent);
