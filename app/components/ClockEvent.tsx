import React, { useState } from 'react';
import { Circle, Stage, Text, Arrow } from 'react-konva';
import { debounce } from 'lodash';
import { eventType, messageType } from '../reducers/canvas';

const MESSAGE_STATES = {
  NONE: 'NONE',
  START: 'START',
  END: 'END',
  WAITING: 'WAITING'
};

const CIRCLE_COLORS = {
  [MESSAGE_STATES.NONE]: '#3F51B5',
  [MESSAGE_STATES.START]: '#4CAF50',
  [MESSAGE_STATES.END]: '#F44336',
  [MESSAGE_STATES.WAITING]: '#FFEB3B'
};

type Props = {
  event: eventType;
  x: number;
  y: number;
  stageRef: Stage;
  startSendingMessage: (messageSendingEvent: eventType) => void;
  abortSendingMessage: () => void;
  finishSendingMessage: (eventTo: eventType) => void;
  isMessageSendingState: boolean;
  messageSendingEvent?: eventType;
  messages: messageType[];
};

export default function ClockEvent(props: Props) {
  const {
    event,
    x,
    y,
    stageRef,
    isMessageSendingState,
    messageSendingEvent,
    startSendingMessage,
    abortSendingMessage,
    finishSendingMessage,
    messages
  } = props;

  const [messageState, setMessageState] = useState(MESSAGE_STATES.NONE);

  const isInWaitingState =
    isMessageSendingState &&
    messageSendingEvent &&
    messageSendingEvent?.processId !== event.processId &&
    messageSendingEvent?.x < x &&
    !messages.some(msg => msg.eventTo.id === event.id);

  if (messageState !== MESSAGE_STATES.WAITING && isInWaitingState) {
    setMessageState(MESSAGE_STATES.WAITING);
  } else if (!isInWaitingState && messageState === MESSAGE_STATES.WAITING) {
    setMessageState(MESSAGE_STATES.NONE);
  }

  if (
    messageState === MESSAGE_STATES.START &&
    messageSendingEvent?.id !== event.id
  ) {
    setMessageState(MESSAGE_STATES.NONE);
  }

  const onArrowHover = debounce(() => {
    // @ts-ignore
    stageRef.container().style.cursor = 'pointer';
  }, 100);

  const onArrowUnhover = debounce(() => {
    // @ts-ignore
    stageRef.container().style.cursor = 'default';
  }, 100);

  const onEventClick = () => {
    if (messageState === MESSAGE_STATES.NONE) {
      if (!isMessageSendingState) {
        startSendingMessage(event);
        setMessageState(MESSAGE_STATES.START);
      }
    } else if (messageState === MESSAGE_STATES.START) {
      abortSendingMessage();
      setMessageState(MESSAGE_STATES.NONE);
    } else if (messageState === MESSAGE_STATES.WAITING) {
      finishSendingMessage(event);
    }
  };

  return (
    <>
      <Text text={event.id} x={x - 15} y={y + 10} fontSize={20} />
      {messageState === MESSAGE_STATES.START && (
        <Arrow
          points={[x, y, x + 30, y]}
          stroke={CIRCLE_COLORS.START}
          strokeWidth={5}
        />
      )}
      <Circle
        x={x}
        y={y}
        radius={7}
        fill={CIRCLE_COLORS[messageState]}
        onMouseEnter={onArrowHover}
        onMouseLeave={onArrowUnhover}
        onClick={onEventClick}
      />
    </>
  );
}
