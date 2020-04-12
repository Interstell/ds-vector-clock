import React from 'react';
import { ReactReduxContext, Provider } from 'react-redux';
import _ from 'lodash';

// @ts-ignore
import Konva from 'konva';
import { Stage, Layer, Line } from 'react-konva';
import Process from '../containers/Process';
import { messageType, processType } from '../reducers/canvas';
import Message from '../containers/Message';
import VectorTimestamps from '../containers/VectorTimestamps';

type Props = {
  canvasWidth: number;
  canvasHeight: number;
  processes: processType[];
  messages: messageType[];
  setStageRef: (stage: Stage | null) => void;
  createNewProcess: () => void;
};

export const COORD_CENTER = {
  x: 50,
  y: 50
};
export const DISTANCE_BETWEEN_PROCESSES = 120;
const PLUS_SIZE = 20;
const PLUS_OFFSET = 30;
// const MAX_PROCESSES = 5;

export default function CanvasStage(props: Props) {
  const {
    canvasHeight,
    canvasWidth,
    processes,
    setStageRef,
    createNewProcess,
    messages
  } = props;

  const onAddProcessClick = () => {
    createNewProcess();
  };

  return (
    <div className="box">
      <ReactReduxContext.Consumer>
        {({ store }) => (
          <Stage
            width={canvasWidth}
            height={canvasHeight}
            ref={stage => setStageRef(stage)}
          >
            <Provider store={store}>
              <Layer>
                {messages.map(message => (
                  <Message key={message.id} message={message} />
                ))}
                {processes.map((process, index) => (
                  <Process
                    key={process.id}
                    process={process}
                    x={COORD_CENTER.x}
                    y={COORD_CENTER.y + DISTANCE_BETWEEN_PROCESSES * index}
                  />
                ))}
                <Line
                  points={[
                    COORD_CENTER.x,
                    COORD_CENTER.y - 2.5,
                    COORD_CENTER.x,
                    COORD_CENTER.y +
                      DISTANCE_BETWEEN_PROCESSES * (processes.length - 1) +
                      2.5
                  ]}
                  stroke="black"
                  strokeWidth={5}
                />
                <Line
                  points={[
                    COORD_CENTER.x,
                    COORD_CENTER.y +
                      DISTANCE_BETWEEN_PROCESSES * (processes.length - 1) +
                      PLUS_OFFSET,
                    COORD_CENTER.x,
                    COORD_CENTER.y +
                      DISTANCE_BETWEEN_PROCESSES * (processes.length - 1) +
                      PLUS_OFFSET +
                      PLUS_SIZE
                  ]}
                  stroke="green"
                  strokeWidth={5}
                  onClick={onAddProcessClick}
                />
                <Line
                  points={[
                    COORD_CENTER.x - PLUS_SIZE / 2,
                    COORD_CENTER.y +
                      DISTANCE_BETWEEN_PROCESSES * (processes.length - 1) +
                      PLUS_OFFSET +
                      PLUS_SIZE / 2,
                    COORD_CENTER.x + PLUS_SIZE / 2,
                    COORD_CENTER.y +
                      DISTANCE_BETWEEN_PROCESSES * (processes.length - 1) +
                      PLUS_OFFSET +
                      PLUS_SIZE / 2
                  ]}
                  stroke="green"
                  strokeWidth={5}
                  onClick={onAddProcessClick}
                />
                <VectorTimestamps />
              </Layer>
            </Provider>
          </Stage>
        )}
      </ReactReduxContext.Consumer>
    </div>
  );
}
