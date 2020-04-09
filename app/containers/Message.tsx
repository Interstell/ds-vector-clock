import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { appStateType } from '../reducers/types';
import Message from '../components/Message';

function mapStateToProps(state: appStateType) {
  return {
    processes: state.canvas.processes
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators({}, dispatch);
}

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(Message);
