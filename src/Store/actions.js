export const MOVER_ACTION = 'MOVER';
export const ROTAR_ACTION = 'ROTAR';
export const SETTARGET_ACTION = 'SETTARGET';
export const CARDSELECTED_ACTION = 'CARDSELECTED';
export const CLEAR_CARDS_ACTION = 'CLEAR_CARDS_ACTION';
export const NEXTPLAYER = 'NEXTPLAYER';
export const ACEPTTRADE = 'ACEPTTRADE';
export const FIX = 'FIX';
export const CONFIG = 'CONFIG';
export const DESCARTAR = 'DESCARTAR';
export const START = 'START';
export const SETSTATE = 'SETSTATE';
export const SET_CARD_CONFIG = 'SET_CARD_CONFIG';
export const CLEAR_CARD_CONFIG = 'CLEAR_CARD_CONFIG';
export const RESET = 'RESET';

export const mover = (callbackRes) => {
  return {
    type: MOVER_ACTION,
    ...callbackRes,
  }
}

export const rotar = (marketId, dir) => {
  console.log('rotar')
  return {
    type: ROTAR_ACTION,
    id: marketId,
    dir,
  }
}

export const setTarget = target => {
  return {
    type: SETTARGET_ACTION,
    target,
  }
}

export const setCardSelected = (playerId, id) => {
  return {
    type: CARDSELECTED_ACTION,
    cardId: id,
    playerId,
  }
}

export const clearSelected = () => {
  return {
    type: CLEAR_CARDS_ACTION,
  }
}

export const nextPlayer = (callbackRes) => {
  return {
    type: NEXTPLAYER,
    newstate: callbackRes,
  }
}

export const aceptTrade = (callbackRes) => {
  return {
    type: ACEPTTRADE,
    ...callbackRes,
  }
}

export const fix = (callbackRes) => {
  return {
    type: FIX,
    ...callbackRes,
  }
}

export const initialConfig = (callbackRes) => {
  return {
    type: CONFIG,
    callbackRes,
  }
}

export const descartar = (callbackRes) => {
  return {
    type: DESCARTAR,
    ...callbackRes,
  }
}

export const start = (callbackRes) => {
  return {
    type: START,
    callbackRes,
  }
}

export const setState = (callbackRes) => {
  return {
    type: SETSTATE,
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