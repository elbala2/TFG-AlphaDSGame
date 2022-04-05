export const mover = (origen) => {
  return {
    type: 'MOVER',
    idOrigen: origen.id,
  }
}

export const rotar = (origen) => {
  return {
    type: 'ROTAR',
    idOrigen: origen.id,
  }
}

export const setTarget = target => {
  return {
    type: 'SETTARGET',
    target,
  }
}

export const setCardSelected = card => {
  return {
    type: 'CARDSELECTED',
    cardId: card.id,
  }
}