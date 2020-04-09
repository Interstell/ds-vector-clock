import React from 'react';
import { Arrow } from 'react-konva';
import { messageType, processType } from '../reducers/canvas';
import { COORD_CENTER, DISTANCE_BETWEEN_PROCESSES } from './CanvasStage';

type Props = {
  message: messageType;
  processes: processType[];
};

export default function Message(props: Props) {
  const { message, processes } = props;
  const { eventFrom, eventTo } = message;
  const processFromIndex = processes.findIndex(
    ({ id }) => id === eventFrom.processId
  );
  const processToIndex = processes.findIndex(
    ({ id }) => id === eventTo.processId
  );
  return (
    <>
      <Arrow
        points={[
          eventFrom.x,
          COORD_CENTER.y + DISTANCE_BETWEEN_PROCESSES * processFromIndex,
          eventTo.x,
          COORD_CENTER.y + DISTANCE_BETWEEN_PROCESSES * processToIndex
        ]}
        stroke="green"
        dash={[7, 3]}
        strokeWidth={5}
      />
    </>
  );
}
