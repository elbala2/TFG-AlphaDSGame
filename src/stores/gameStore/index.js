import _ from 'lodash';
import {
  ACEPTTRADE,
  CARDSELECTED_ACTION,
  FIX,
  MOVER_ACTION,
  NEXTPLAYER,
  ROTAR_ACTION,
  SETTARGET_ACTION,
  DESCARTAR,
  RESET,
  SETSTATE,
  SET_CARD_CONFIG,
  CLEAR_CARD_CONFIG,
  CLEAR_CARDS_ACTION,
} from './actions';
import initialState from './InitialState';

export default function gameReducer(state = initialState, action) {
  if (action.type == null) return state;

  const {
    normalMarket,
    actualPlayer,
    players,
  } = state;

  console.log(action, _.cloneDeep(state))

  switch (action.type) {
    case RESET: 
      return initialState;

    case SETSTATE:
      return {
        ...state,
        ...action.callbackRes,
      };

    case SETTARGET_ACTION:
      return {
        ...state,
        target: action.target,
      };

    case CLEAR_CARDS_ACTION:
      players.forEach(player => player.cards.forEach(card => card.selected = false))
      return {
        ...state,
        players: _.cloneDeep(players),
      };

    case CARDSELECTED_ACTION:
      const playerid = typeof action.playerId !== 'undefined' ? action.playerId : actualPlayer;
      players[playerid].cards[action.cardId].selected = !players[playerid].cards[action.cardId].selected;
      return {
        ...state,
        players: _.cloneDeep(players),
      };

    case MOVER_ACTION:
      players[actualPlayer] = action.player;
      return {
        ...state,
        players: _.cloneDeep(players),
        normalMarket: action.normalMarket,
        specialMarket: action.specialMarket,
      };

    case ROTAR_ACTION:
      const id = action.id < 4 ? action.id : action.id - 4;
      normalMarket[id].rotation = (normalMarket[id].rotation + action.dir) % 4;
      return {
        ...state,
        normalMarket: _.cloneDeep(normalMarket),
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

    case SET_CARD_CONFIG:
      return {
        ...state,
        cardConfig: action.cardConfig,
      }

    case CLEAR_CARD_CONFIG:
      return {
        ...state,
        cardConfig: [],
      }

    default:
      break;
  }

  return _.cloneDeep(state);
};
