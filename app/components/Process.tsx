import React from 'react';
import { Arrow, Text, Stage } from 'react-konva';
import { debounce } from 'lodash';
import ClockEvent from '../containers/ClockEvent';
import { processType } from '../reducers/canvas';

type Props = {
  process: processType;
  x: number;
  y: number;
  canvasWidth: number;
  canvasHeight: number;
  stageRef: Stage;
  createNewEvent: (process: processType, x: number) => void;
};

export default function Process(props: Props) {
  const { x, y, canvasWidth, stageRef, process, createNewEvent } = props;

  const { id, events } = process;

  const onArrowHover = debounce(() => {
    // @ts-ignore
    stageRef.container().style.cursor = 'pointer';
  }, 100);

  const onArrowUnhover = debounce(() => {
    // @ts-ignore
    stageRef.container().style.cursor = 'default';
  }, 100);

  const onArrowClick = (e: any) => {
    const newEventX = e.evt.layerX;
    createNewEvent(process, newEventX);
  };

  return (
    <>
      <Text x={x - 30} y={y - 11} text={id} fontSize={22} />
      <Arrow
        points={[x, y, canvasWidth - 50, y]}
        stroke="black"
        onMouseEnter={onArrowHover}
        onMouseLeave={onArrowUnhover}
        onClick={onArrowClick}
        strokeWidth={5}
      />
      {events &&
        events.map(event => (
          <ClockEvent key={event.id} event={event} x={event.x} y={y} />
        ))}
    </>
  );
}
