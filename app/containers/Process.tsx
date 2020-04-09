import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { appStateType } from '../reducers/types';
import Process from '../components/Process';
import { changeCanvasSize, createNewEvent } from '../actions/canvas';

function mapStateToProps(state: appStateType) {
  return {
    canvasWidth: state.canvas.canvasWidth,
    canvasHeight: state.canvas.canvasHeight,
    stageRef: state.canvas.stageRef,

    isMessageSendingState: state.canvas.isMessageSendingState,
    messageSendingEvent: state.canvas.messageSendingEvent
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators({ changeCanvasSize, createNewEvent }, dispatch);
}

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(Process);
