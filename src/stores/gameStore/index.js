import {
  ACCEPT_TRADE,
  CARD_SELECTED_ACTION,
  FIX,
  MOVER_ACTION,
  NEXT_PLAYER,
  ROTATE_ACTION,
  SET_TARGET_ACtion,
  DISCARD,
  RESET,
  SET_STATE,
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
  
  switch (action.type) {
    case RESET: 
    return initialState;
    
    case SET_STATE:
      return {
        ...state,
        ...action.callbackRes,
      };

    case SET_TARGET_ACtion:
      return {
        ...state,
        target: action.target,
      };

    case CLEAR_CARDS_ACTION:
      if (action.playerId) {
        players[action.playerId].cards.forEach(card => card.selected = false)
      } else {
        players.forEach(player => player.cards.forEach(card => card.selected = false))
      }
      return {
        ...state,
        players: [...players],
      };

    case CARD_SELECTED_ACTION:
      const playerid = typeof action.playerId !== 'undefined' ? action.playerId : actualPlayer;
      players[playerid].cards[action.cardId].selected = !players[playerid].cards[action.cardId].selected;
      players[playerid] = { ...players[playerid] };
      return {
        ...state,
        players: [...players],
      };

    case MOVER_ACTION:
      players.splice(action.player.id, 1, action.player);
      return {
        ...state,
        players: [...players],
        normalMarket: action.normalMarket,
        specialMarket: action.specialMarket,
      };

    case ROTATE_ACTION:
      const id = action.id < 4 ? action.id : action.id - 4;
      normalMarket[id].rotation = (normalMarket[id].rotation + action.dir) % 4;
      return {
        ...state,
        normalMarket: [...normalMarket],
      };

    case ACCEPT_TRADE:
      return {
        ...state,
        players: action.players,
      };

    case NEXT_PLAYER:
      return {
        ...action.newState,
      };

    case DISCARD:
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

  return state;
};
