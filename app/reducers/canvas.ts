import { AnyAction } from 'redux';
import { Stage } from 'react-konva';
import { DISTANCE_BETWEEN_PROCESSES } from '../components/CanvasStage';

export const prefix = '@map/';
export const CHANGE_CANVAS_SIZE = `${prefix}CHANGE_CANVAS_SIZE`;
export const SET_STAGE_REF = `${prefix}SET_STAGE_REF`;

export const MESSAGE_SENDING_STARTED = `${prefix}MESSAGE_SENDING_STARTED`;
export const MESSAGE_SENDING_ABORTED = `${prefix}MESSAGE_SENDING_ABORTED`;
export const MESSAGE_SENDING_FINISHED = `${prefix}MESSAGE_SENDING_FINISHED`;

export const PROCESS_CREATE = `${prefix}PROCESS_CREATE`;

export const EVENT_CREATE = `${prefix}EVENT_CREATE`;

export const RESET_STATE = `${prefix}RESET_STATE`;

export const VECTOR_TIMESTAMPS_CALCULATED = `${prefix}VECTOR_TIMESTAMPS_CALCULATED`;
export const RESET_VECTOR_TIMESTAMPS = `${prefix}RESET_VECTOR_TIMESTAMPS`;

export type eventType = {
  id: string;
  processId: string;
  x: number;
};

export type processType = {
  id: string;
  events: eventType[];
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

  timestampsMatrix: object | null;
};

function createDefaultState(): canvasStateType {
  const defaultState: canvasStateType = {
    canvasWidth: 900,
    canvasHeight: 500,

    processes: [
      {
        id: 'p1',
        events: []
      },
      {
        id: 'p2',
        events: []
      },
      {
        id: 'p3',
        events: []
      }
    ],
    messages: [],

    isMessageSendingState: false,

    processNameCounter: 4,
    eventNameCounter: 0,

    timestampsMatrix: null
  };

  return defaultState;
}

function createSampleState(): canvasStateType {
  const defaultState: canvasStateType = {
    canvasWidth: 900,
    canvasHeight: 500,

    processes: [
      {
        id: 'p1',
        events: [
          { id: 'A', processId: 'p1', x: 100 },
          { id: 'B', processId: 'p1', x: 250 },
          { id: 'C', processId: 'p1', x: 450 },
          { id: 'D', processId: 'p1', x: 650 },
          { id: 'E', processId: 'p1', x: 750 }
        ]
      },
      {
        id: 'p2',
        events: [
          { id: 'F', processId: 'p2', x: 240 },
          { id: 'G', processId: 'p2', x: 450 },
          { id: 'H', processId: 'p2', x: 570 }
        ]
      },
      {
        id: 'p3',
        events: [
          { id: 'I', processId: 'p3', x: 175 },
          { id: 'J', processId: 'p3', x: 480 },
          { id: 'K', processId: 'p3', x: 800 }
        ]
      }
    ],
    messages: [],

    isMessageSendingState: false,

    processNameCounter: 4,
    eventNameCounter: 11,

    timestampsMatrix: null
  };

  defaultState.messages.push(
    ...[
      {
        id: 'B->G',
        // @ts-ignore
        eventFrom: defaultState.processes[0].events[1],
        // @ts-ignore
        eventTo: defaultState?.processes[1]?.events[1]
      },
      {
        id: 'I->F',
        // @ts-ignore
        eventFrom: defaultState.processes[2].events[0],
        // @ts-ignore
        eventTo: defaultState?.processes[1]?.events[0]
      },
      {
        id: 'H->D',
        // @ts-ignore
        eventFrom: defaultState.processes[1].events[2],
        // @ts-ignore
        eventTo: defaultState.processes[0].events[3]
      },
      {
        id: 'E->K',
        // @ts-ignore
        eventFrom: defaultState.processes[0].events[4],
        // @ts-ignore
        eventTo: defaultState.processes[2].events[2]
      }
    ]
  );

  return defaultState;
}

function createSample2State(): canvasStateType {
  const defaultState: canvasStateType = {
    canvasWidth: 900,
    canvasHeight: 500,

    processes: [
      {
        id: 'p1',
        events: [
          {
            id: 'A',
            processId: 'p1',
            x: 89
          },
          {
            id: 'B',
            processId: 'p1',
            x: 186
          },
          {
            id: 'C',
            processId: 'p1',
            x: 294
          },
          {
            id: 'D',
            processId: 'p1',
            x: 391
          },
          {
            id: 'E',
            processId: 'p1',
            x: 501
          },
          {
            id: 'F',
            processId: 'p1',
            x: 580
          },
          {
            id: 'G',
            processId: 'p1',
            x: 682
          }
        ]
      },
      {
        id: 'p2',
        events: [
          {
            id: 'H',
            processId: 'p2',
            x: 180
          },
          {
            id: 'I',
            processId: 'p2',
            x: 291
          },
          {
            id: 'J',
            processId: 'p2',
            x: 620
          }
        ]
      },
      {
        id: 'p3',
        events: [
          {
            id: 'K',
            processId: 'p3',
            x: 139
          },
          {
            id: 'L',
            processId: 'p3',
            x: 367
          },
          {
            id: 'M',
            processId: 'p3',
            x: 480
          }
        ]
      }
    ],
    messages: [
      {
        id: 'B->I',
        eventFrom: {
          id: 'B',
          processId: 'p1',
          x: 186
        },
        eventTo: {
          id: 'I',
          processId: 'p2',
          x: 291
        }
      },
      {
        id: 'H->C',
        eventFrom: {
          id: 'H',
          processId: 'p2',
          x: 180
        },
        eventTo: {
          id: 'C',
          processId: 'p1',
          x: 294
        }
      },
      {
        id: 'D->M',
        eventFrom: {
          id: 'D',
          processId: 'p1',
          x: 391
        },
        eventTo: {
          id: 'M',
          processId: 'p3',
          x: 480
        }
      },
      {
        id: 'L->E',
        eventFrom: {
          id: 'L',
          processId: 'p3',
          x: 367
        },
        eventTo: {
          id: 'E',
          processId: 'p1',
          x: 501
        }
      },
      {
        id: 'F->J',
        eventFrom: {
          id: 'F',
          processId: 'p1',
          x: 580
        },
        eventTo: {
          id: 'J',
          processId: 'p2',
          x: 620
        }
      }
    ],

    isMessageSendingState: false,

    processNameCounter: 4,
    eventNameCounter: 0,

    timestampsMatrix: null
  };

  return defaultState;
}

export default function canvas(
  state = createDefaultState(),
  action: AnyAction
) {
  switch (action.type) {
    case RESET_STATE:
      switch (action.payload.type) {
        case 'default':
          return createDefaultState();
        case 'sample':
          return createSampleState();
        case 'sample2':
          return createSample2State();
        default:
          return createDefaultState();
      }
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
        processNameCounter: state.processNameCounter + 1,
        canvasHeight: state.canvasHeight + DISTANCE_BETWEEN_PROCESSES
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
                id: String.fromCharCode(65 + state.eventNameCounter),
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
    case VECTOR_TIMESTAMPS_CALCULATED:
      return {
        ...state,
        timestampsMatrix: action.payload.timestampsMatrix
      };
    case RESET_VECTOR_TIMESTAMPS:
      return {
        ...state,
        timestampsMatrix: null
      };

    default:
      return state;
  }
}
