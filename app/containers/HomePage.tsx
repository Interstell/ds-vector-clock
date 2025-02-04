import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/Home';
import { calculateVectorTimestamps, resetState } from '../actions/canvas';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      resetState,
      calculateVectorTimestamps
    },
    dispatch
  );
}

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(Home);
