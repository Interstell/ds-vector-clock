import React from 'react';
import { Label, Tag, Text } from 'react-konva';
import { processType } from '../reducers/canvas';
// eslint-disable-next-line import/no-cycle
import { COORD_CENTER, DISTANCE_BETWEEN_PROCESSES } from './CanvasStage';

type Props = {
  processes: processType[];
  timestampsMatrix: object;
};

export default function VectorTimestamps(props: Props) {
  const { processes, timestampsMatrix } = props;

  if (!timestampsMatrix) {
    return null;
  }
  return (
    <>
      {Object.entries(timestampsMatrix).flatMap(
        ([processId, eventsTimestamps]) => {
          return Object.entries(eventsTimestamps).map(([eventId, coords]) => {
            const x = processes
              .find(p => p.id === processId)
              ?.events.find(e => e.id === eventId)?.x;
            const y =
              COORD_CENTER.y +
              DISTANCE_BETWEEN_PROCESSES *
                processes.findIndex(p => p.id === processId);
            return (
              <Label key={eventId} x={x} y={y} opacity={0.75}>
                <Tag
                  fill="yellow"
                  pointerDirection="down"
                  pointerWidth={10}
                  pointerHeight={10}
                />
                <Text
                  // @ts-ignore
                  text={`(${coords.join(',')})`}
                  fontSize={22}
                  padding={3}
                  fill="black"
                />
              </Label>
            );
          });
        }
      )}
    </>
  );
}
