/* eslint-disable no-param-reassign */
import _ from 'lodash';
import { messageType, processType } from '../reducers/canvas';

// eslint-disable-next-line import/prefer-default-export
export function calculateTimestampsMatrix(
  processes: processType[],
  messages: messageType[]
) {
  const matrix = processes.reduce<any>((accP, process, pIndex) => {
    accP[process.id] = process.events.reduce<any>((accE, event, eIndex) => {
      accE[event.id] = _.times(processes.length, _.constant(0));
      accE[event.id][pIndex] = eIndex + 1;
      return accE;
    }, {});
    return accP;
  }, {});

  const sortedMessages = _.sortBy(messages, m => m.eventTo.x);

  // eslint-disable-next-line no-restricted-syntax
  for (const { eventFrom, eventTo } of sortedMessages) {
    const sendingPid = eventFrom.processId;
    const receivingPid = eventTo.processId;
    const sendingEid = eventFrom.id;
    const receivingEid = eventTo.id;

    matrix[receivingPid][receivingEid] = matrix[sendingPid][
      sendingEid
    ].map((_e: any, i: number) =>
      Math.max(
        matrix[sendingPid][sendingEid][i],
        matrix[receivingPid][receivingEid][i]
      )
    );

    const nextEventIds = processes
      .find(p => p.id === receivingPid)
      ?.events.filter(e => e.x > eventTo.x)
      .map(e => e.id);
    nextEventIds?.forEach(nextEventId => {
      matrix[receivingPid][nextEventId] = matrix[receivingPid][
        receivingEid
      ].map((_e: any, i: number) =>
        Math.max(
          matrix[receivingPid][receivingEid][i],
          matrix[receivingPid][nextEventId][i]
        )
      );
    });
  }

  return matrix;
}
