/* eslint-disable no-const-assign */
/* eslint-disable array-callback-return */
import { StartGame } from '../utils/ApiConf';
import {
  ACEPTTRADE,
  CARDSELECTED_ACTION,
  FIX,
  MOVER_ACTION,
  NEXTPLAYER,
  ROTAR_ACTION,
  SETTARGET_ACTION,
  CONFIG,
  DESCARTAR,
  START,
} from './actions';
import initialState from './InitialState';

const getRiskFixCardType = type => {
  switch (type) {
    case 'Complex Model':
      return 'Simple Model';
    case 'Danger Data':
      return 'Protected Data';
    case 'No Data':
      return 'Data Base';
    case 'Old Software':
      return 'Open Source';
    case 'Old Technology':
      return 'New Technology';
    case 'Slow Model':
      return 'Fast Model';
    case 'Virus':
      return 'Antivirus';
    case 'Working Alone':
      return 'Team Spirit';
    case 'Wrong Model':
      return 'Right Model';
    default:
      return true;
  }
};

const playerReducer = async (state = initialState, action) => {
  if (action.type == null) return state;

  switch (action.type) {
    case CONFIG:
      const res = StartGame(action.config)
      return {
        ...state,
        ...res,
      };
    default:
      return initialState;
  }
};

export default playerReducer;
