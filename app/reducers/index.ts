import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import canvas from './canvas';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    canvas
  });
}
