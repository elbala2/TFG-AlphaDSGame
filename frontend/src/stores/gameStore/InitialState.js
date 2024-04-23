
const initialState = {
  normalMarket: [],
  specialMarket: [],
  start: 1,
  slabs: [],
  cards: [],
  finished: false,
  actualPlayer: undefined,
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