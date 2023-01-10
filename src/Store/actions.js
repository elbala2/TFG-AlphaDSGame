export const MOVER_ACTION = 'MOVER';
export const ROTAR_ACTION = 'ROTAR';
export const SETTARGET_ACTION = 'SETTARGET';
export const CARDSELECTED_ACTION = 'CARDSELECTED';
export const NEXTPLAYER = 'NEXTPLAYER';
export const ACEPTTRADE = 'ACEPTTRADE';
export const FIX = 'FIX';
export const CONFIG = 'CONFIG';
export const DESCARTAR = 'DESCARTAR';
export const START = 'START';
export const SETSTATE = 'SETSTATE';
export const RESET = 'RESET';

export const mover = (callbackRes) => {
  return {
    type: MOVER_ACTION,
    ...callbackRes,
  }
}

export const rotar = (marketId) => {
  return {
    type: ROTAR_ACTION,
    id: marketId,
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
  console.log(callbackRes)
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

export const reset = () => {
  return {
    type: RESET,
  }
}