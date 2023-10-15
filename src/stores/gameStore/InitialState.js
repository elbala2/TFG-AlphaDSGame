
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
  whereIsPilar: 0,
  cardConfig: [],
  players: [
    { name: 'Player 1',
      cards: [],
      board: [
        [null, null, null, null],
        [{}, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
      way: [],
    },
  ],
}

export default initialState;