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
  RESET,
  SETSTATE,
  SETTRADE,
} from './actions';
import initialState from './InitialState';

const playerReducer = (state = initialState, action) => {
  if (action.type == null) return state;

  const {
    normalMarket,
    specialMarket, 
    actualPlayer,
    players,
  } = state;

  switch (action.type) {
    case RESET: 
      return initialState;

    case START:
    case SETSTATE:
    case CONFIG:
      return {
        ...state,
        ...action.callbackRes,
      };

    case SETTARGET_ACTION:
      return {
        ...state,
        target: action.target,
      };

    case CARDSELECTED_ACTION:
      const playerid = typeof action.playerId !== 'undefined' ? action.playerId : actualPlayer;
      players[playerid].cards[action.cardId].selected =
        !players[playerid].cards[action.cardId].selected;
      break;

    case MOVER_ACTION:
      players[actualPlayer] = action.player;
      return {
        ...state,
        normalMarket: action.normalMarket,
        specialMarket: action.specialMarket,
      };

    case ROTAR_ACTION:
      const id = action.id < 4 ? action.id : action.id - 4;
      const slabs = action.id > 3 ? specialMarket : normalMarket;
      slabs[id].rotation = (slabs[id].rotation + action.dir) % 4;
      return {
        ...state,
      };

    case ACEPTTRADE: 
      return {
        ...state,
        players: action.players,
      };

    case NEXTPLAYER:
      return {
        ...action.newstate,
      };

    case DESCARTAR:
      players[actualPlayer].cards = action.cards;
      return {
        ...state,
        players,
      };

    case FIX:
      return {
        ...state,
        players: action.players,
        specialMarket: action.specialMarket,
      };

    case SETTRADE:
      action.callbackRes.forEach(x => {
        x.config.forEach(config => {
          if (config.needed.length) {
            
          }
        })
      })
      console.log('🚀 ~ file: reducer.js:95 ~ playerReducer ~ cardConfigAux:', action.callbackRes);
      const newCardConfig = []
      return {
        ...state,
        cardConfig: newCardConfig,
      }

    default:
      break;
  }

  return {
    ...state,
  };
};

export default playerReducer;
