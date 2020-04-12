import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { appStateType } from '../reducers/types';
import VectorTimestamps from '../components/VectorTimestamps';

function mapStateToProps(state: appStateType) {
  return {
    processes: state.canvas.processes,
    timestampsMatrix: state.canvas.timestampsMatrix
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators({}, dispatch);
}

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(VectorTimestamps);
