// @ts-nocheck
/* eslint-disable */
import {ActionCreator, AnyAction, Reducer} from 'redux';

export const getType = (creator: ActionCreator<AnyAction>) => creator().type;

export const createRootReducer = (initialState) => <S>(reducerMap): Reducer<S> => {
  const map = reducerMap.reduce((acc, [reducer, ...actions]) => createMap(actions, reducer, acc), {});

  return (state = initialState, action) => (map.hasOwnProperty(action.type)
    ? map[action.type].reduce((nextState, reducer) => reducer(nextState, action), state)
    : state);
};

const createMap = (actions, reducer, prevMap) => actions.reduce((acc, action) => {
  const type = getType(action);

  if (!acc.hasOwnProperty(type)) {
    acc[type] = [];
  }

  acc[type].push(reducer);

  return acc;
}, prevMap);