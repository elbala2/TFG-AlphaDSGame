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
export const RESET = 'RESET';

export const mover = (marketId) => {
  return {
    type: MOVER_ACTION,
    idOrigen: marketId,
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

export const nextPlayer = () => {
  return {
    type: NEXTPLAYER,
  }
}

export const aceptTrade = () => {
  return {
    type: ACEPTTRADE,
  }
}

export const fix = (id) => {
  return {
    type: FIX,
    riskId: id - 4,
  }
}

export const initialConfig = (config) => {
  return {
    type: CONFIG,
    config,
  }
}

export const descartar = (id) => {
  return {
    type: DESCARTAR,
    id,
  }
}

export const start = () => {
  return {
    type: START,
  }
}

export const reset = () => {
  return {
    type: RESET,
  }
}