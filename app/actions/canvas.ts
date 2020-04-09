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
  RESET_STATE
} from '../reducers/canvas';

export function resetState() {
  return {
    type: RESET_STATE
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
  return {
    type: SET_STAGE_REF,
    payload: {
      stageRef
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

// todo delete process

export function createNewEvent(process: processType, x: number) {
  return {
    type: EVENT_CREATE,
    payload: {
      x,
      process
    }
  };
}

// todo delete event
