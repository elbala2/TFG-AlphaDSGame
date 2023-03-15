
const initialState = {
  id: 0,
  normalMarket: [],
  specialMarket: [],
  start: 1,
  slabs: [],
  cards: [],
  target: null,
  finished: false,
  actualPlayer: 0,
  pos: [1, 0, 0],
  players: [
    { name: 'Player 1', cards: [], board: [
      [null, null, null, null],
      [{}, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ] }
  ],
}

export default initialState;