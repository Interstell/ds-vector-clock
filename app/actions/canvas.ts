import { Stage } from 'react-konva';
import {
  eventType,
  processType,
  CHANGE_CANVAS_SIZE,
  MESSAGE_SENDING_STARTED,
  SET_STAGE_REF,
  MESSAGE_SENDING_ABORTED,
  PROCESS_CREATE,
  EVENT_CREATE,
  MESSAGE_SENDING_FINISHED,
  RESET_STATE,
  VECTOR_TIMESTAMPS_CALCULATED,
  RESET_VECTOR_TIMESTAMPS
} from '../reducers/canvas';
import { Dispatch, GetState } from '../reducers/types';
import { calculateTimestampsMatrix } from '../clock/vector-clock';

export function resetState(type: string) {
  return {
    type: RESET_STATE,
    payload: {
      type
    }
  };
}

export function resetVectorTimestamps() {
  return {
    type: RESET_VECTOR_TIMESTAMPS
  };
}

export function changeCanvasSize(width: number, height: number) {
  return {
    type: CHANGE_CANVAS_SIZE,
    payload: {
      width,
      height
    }
  };
}

export function setStageRef(stageRef: Stage) {
  return (dispatch: Dispatch, getState: GetState) => {
    const {
      canvas: { timestampsMatrix }
    } = getState();
    dispatch({
      type: SET_STAGE_REF,
      payload: {
        stageRef
      }
    });
    if (timestampsMatrix !== null) {
      dispatch(resetVectorTimestamps());
    }
  };
}

export function startSendingMessage(messageSendingEvent: eventType) {
  return {
    type: MESSAGE_SENDING_STARTED,
    payload: { messageSendingEvent }
  };
}

export function abortSendingMessage() {
  return {
    type: MESSAGE_SENDING_ABORTED
  };
}

export function finishSendingMessage(eventTo: eventType) {
  return {
    type: MESSAGE_SENDING_FINISHED,
    payload: {
      eventTo
    }
  };
}

export function createNewProcess() {
  return {
    type: PROCESS_CREATE
  };
}

export function createNewEvent(process: processType, x: number) {
  return {
    type: EVENT_CREATE,
    payload: {
      x,
      process
    }
  };
}

export function calculateVectorTimestamps() {
  return (dispatch: Dispatch, getState: GetState) => {
    const {
      canvas: { processes, messages }
    } = getState();
    if (messages.length === 0) {
      return;
    }
    const timestampsMatrix = calculateTimestampsMatrix(processes, messages);

    dispatch({
      type: VECTOR_TIMESTAMPS_CALCULATED,
      payload: {
        timestampsMatrix
      }
    });
  };
}
