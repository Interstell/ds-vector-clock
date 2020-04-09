import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import CanvasStage from '../components/CanvasStage';
import { appStateType } from '../reducers/types';
import { createNewProcess, setStageRef } from '../actions/canvas';

function mapStateToProps(state: appStateType) {
  return {
    canvasWidth: state.canvas.canvasWidth,
    canvasHeight: state.canvas.canvasHeight,
    processes: state.canvas.processes,
    messages: state.canvas.messages
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      setStageRef,
      createNewProcess
    },
    dispatch
  );
}

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(CanvasStage);
