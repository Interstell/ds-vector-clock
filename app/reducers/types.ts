import { Dispatch as ReduxDispatch, Store as ReduxStore, Action } from 'redux';
import { canvasStateType } from './canvas';

export type appStateType = {
  canvas: canvasStateType;
};

export type GetState = () => appStateType;

export type Dispatch = ReduxDispatch<Action<string>>;

export type Store = ReduxStore<appStateType, Action<string>>;
