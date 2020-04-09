import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { appStateType } from '../reducers/types';
import ClockEvent from '../components/ClockEvent';
import {
  abortSendingMessage,
  finishSendingMessage,
  startSendingMessage
} from '../actions/canvas';

function mapStateToProps(state: appStateType) {
  return {
    stageRef: state.canvas.stageRef,
    messageSendingEvent: state.canvas.messageSendingEvent,
    isMessageSendingState: state.canvas.isMessageSendingState,
    messages: state.canvas.messages
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    { startSendingMessage, abortSendingMessage, finishSendingMessage },
    dispatch
  );
}

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(ClockEvent);
