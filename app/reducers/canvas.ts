import { AnyAction } from 'redux';
import { Stage } from 'react-konva';

export const prefix = '@map/';
export const CHANGE_CANVAS_SIZE = `${prefix}CHANGE_CANVAS_SIZE`;
export const SET_STAGE_REF = `${prefix}SET_STAGE_REF`;

export const MESSAGE_SENDING_STARTED = `${prefix}MESSAGE_SENDING_STARTED`;
export const MESSAGE_SENDING_ABORTED = `${prefix}MESSAGE_SENDING_ABORTED`;
export const MESSAGE_SENDING_FINISHED = `${prefix}MESSAGE_SENDING_FINISHED`;

export const PROCESS_CREATE = `${prefix}PROCESS_CREATE`;

export const EVENT_CREATE = `${prefix}EVENT_CREATE`;

export const RESET_STATE = `${prefix}RESET_STATE`;

export type eventType = {
  id: string;
  processId: string;
  x: number;
};

export type processType = {
  id: string;
  events?: eventType[];
};

export type messageType = {
  id: string;
  eventFrom: eventType;
  eventTo: eventType;
};

export type canvasStateType = {
  canvasWidth: number;
  canvasHeight: number;

  processes: processType[];
  messages: messageType[];

  stageRef?: Stage;

  isMessageSendingState: boolean;
  messageSendingEvent?: eventType;

  processNameCounter: number;
  eventNameCounter: number;
};

function createDefaultState(): canvasStateType {
  const defaultState: canvasStateType = {
    canvasWidth: 900,
    canvasHeight: 600,

    processes: [
      {
        id: 'p1',
        events: [
          {
            id: 'A',
            processId: 'p1',
            x: 120
          },
          {
            id: 'B',
            processId: 'p1',
            x: 200
          }
        ]
      },
      {
        id: 'p2',
        events: [
          {
            id: 'C',
            processId: 'p2',
            x: 150
          }
        ]
      },
      {
        id: 'p3',
        events: [
          { id: 'D', processId: 'p3', x: 100 },
          { id: 'E', processId: 'p3', x: 250 }
        ]
      }
    ],
    messages: [],

    isMessageSendingState: false,

    processNameCounter: 4,
    eventNameCounter: 5
  };

  defaultState.messages.push({
    id: 'A->C',
    // @ts-ignore
    eventFrom: defaultState.processes[0].events[0],
    // @ts-ignore
    eventTo: defaultState.processes[1].events[0]
  });

  return defaultState;
}

export default function canvas(
  state = createDefaultState(),
  action: AnyAction
) {
  switch (action.type) {
    case RESET_STATE:
      return createDefaultState();
    case CHANGE_CANVAS_SIZE:
      return {
        ...state,
        canvasWidth: action.payload.width,
        canvasHeight: action.payload.height
      };
    case SET_STAGE_REF:
      return {
        ...state,
        stageRef: action.payload.stageRef
      };
    case MESSAGE_SENDING_STARTED:
      return {
        ...state,
        isMessageSendingState: true,
        messageSendingEvent: action.payload.messageSendingEvent
      };
    case MESSAGE_SENDING_ABORTED:
      return {
        ...state,
        isMessageSendingState: false,
        messageSendingEvent: null
      };
    case MESSAGE_SENDING_FINISHED:
      return {
        ...state,
        isMessageSendingState: false,
        messageSendingEvent: null,
        messages: [
          ...state.messages,
          {
            id: `${state.messageSendingEvent?.id}->${action.payload.eventTo.id}`,
            eventFrom: state.messageSendingEvent,
            eventTo: action.payload.eventTo
          }
        ]
      };
    case PROCESS_CREATE:
      return {
        ...state,
        processes: [
          ...state.processes,
          { id: `p${state.processNameCounter}`, events: [] }
        ],
        processNameCounter: state.processNameCounter + 1
      };
    case EVENT_CREATE: {
      const processIndex = state.processes.findIndex(
        p => p === action.payload.process
      );
      return {
        ...state,
        processes: [
          ...state.processes.slice(0, processIndex),
          {
            ...action.payload.process,
            events: [
              ...action.payload.process.events,
              {
                id: String.fromCharCode(
                  state.eventNameCounter <= 25
                    ? 65 + state.eventNameCounter
                    : 97 + (state.eventNameCounter % 26)
                ),
                processId: action.payload.process.id,
                x: action.payload.x
              }
            ]
          },
          ...state.processes.slice(processIndex + 1)
        ],
        eventNameCounter: state.eventNameCounter + 1
      };
    }

    default:
      return state;
  }
}
