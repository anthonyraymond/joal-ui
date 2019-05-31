import { connect } from 'react-redux';
import ThemeProviderComponent from './theme-provider.component';

import { JoalState } from '../../../reducers/types';

const mapStateToProps= (state: JoalState) => {
  return {
    themeType: state.theme.palette.type
  };
}

export default connect(mapStateToProps)(ThemeProviderComponent);
