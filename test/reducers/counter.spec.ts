import canvas from '../../app/reducers/canvas';
import {
  INCREMENT_COUNTER,
  DECREMENT_COUNTER
} from '../../app/actions/canvas';

describe('reducers', () => {
  describe('counter', () => {
    it('should handle initial state', () => {
      expect(canvas(undefined, {})).toMatchSnapshot();
    });

    it('should handle INCREMENT_COUNTER', () => {
      expect(canvas(1, { type: INCREMENT_COUNTER })).toMatchSnapshot();
    });

    it('should handle DECREMENT_COUNTER', () => {
      expect(canvas(1, { type: DECREMENT_COUNTER })).toMatchSnapshot();
    });

    it('should handle unknown action type', () => {
      expect(canvas(1, { type: 'unknown' })).toMatchSnapshot();
    });
  });
});
