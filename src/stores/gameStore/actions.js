export const MOVER_ACTION = 'MOVER';
export const ROTATE_ACTION = 'ROTATE';
export const CARD_SELECTED_ACTION = 'CARD_SELECTED';
export const CLEAR_CARDS_ACTION = 'CLEAR_CARDS_ACTION';
export const NEXT_PLAYER = 'NEXT_PLAYER';
export const ACCEPT_TRADE = 'ACCEPT_TRADE';
export const FIX = 'FIX';
export const CONFIG = 'CONFIG';
export const DISCARD = 'DISCARD';
export const START = 'START';
export const SET_STATE = 'SET_STATE';
export const SET_CARD_CONFIG = 'SET_CARD_CONFIG';
export const CLEAR_CARD_CONFIG = 'CLEAR_CARD_CONFIG';
export const RESET = 'RESET';

export const mover = (callbackRes) => {
  return {
    type: MOVER_ACTION,
    ...callbackRes,
  }
}

export const rotate = (marketId, dir) => {
  return {
    type: ROTATE_ACTION,
    id: marketId,
    dir,
  }
}

export const setCardSelected = (playerId, id) => {
  return {
    type: CARD_SELECTED_ACTION,
    cardId: id,
    playerId,
  }
}

export const clearSelected = (playerId) => {
  return {
    type: CLEAR_CARDS_ACTION,
    playerId,
  }
}

export const nextPlayer = (callbackRes) => {
  return {
    type: NEXT_PLAYER,
    newState: callbackRes,
  }
}

export const acceptTrade = (callbackRes) => {
  return {
    type: ACCEPT_TRADE,
    ...callbackRes,
  }
}

export const fix = (callbackRes) => {
  return {
    type: FIX,
    ...callbackRes,
  }
}

export const discard = (callbackRes) => {
  return {
    type: DISCARD,
    ...callbackRes,
  }
}

export const setState = (callbackRes) => {
  return {
    type: SET_STATE,
    callbackRes,
  }
}

export const setCardConfig = (cardConfig) => {
  return {
    type: SET_CARD_CONFIG,
    cardConfig,
  }
}

export const clearCardConfig = () => {
  return {
    type: CLEAR_CARD_CONFIG,
  }
}

export const reset = () => {
  return {
    type: RESET,
  }
}