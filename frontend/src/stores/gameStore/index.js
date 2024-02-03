import {
  ACCEPT_TRADE,
  CARD_SELECTED_ACTION,
  FIX,
  MOVER_ACTION,
  NEXT_PLAYER,
  ROTATE_ACTION,
  DISCARD,
  RESET,
  SET_STATE,
  SET_CARD_CONFIG,
  CLEAR_CARD_CONFIG,
  CLEAR_CARDS_ACTION,
  SELECT_SLAB,
} from './actions';
import initialState from './InitialState';

export default function gameReducer(state = initialState, action) {
  if (action.type == null) return state;

  const {
    normalMarket,
    actualPlayer,
    players,
    selectedSlab,
  } = state;
  
  switch (action.type) {
    case RESET: 
    return {
      id: undefined,
      ...state,
    };
    
    case SET_STATE:
      return {
        ...state,
        ...action.callbackRes,
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
      const playerId = action.playerId;
      const pIndex = players.findIndex((p, i) => playerId ? p.id === playerId : i === actualPlayer)
      players[pIndex].cards[action.cardId].selected = !players[pIndex].cards[action.cardId].selected;
      players[pIndex] = { ...players[pIndex] };
      return {
        ...state,
        players: [...players],
      };

    case SELECT_SLAB:
      return {
        ...state,
        selectedSlab: selectedSlab === action.id ? undefined : action.id, 
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
