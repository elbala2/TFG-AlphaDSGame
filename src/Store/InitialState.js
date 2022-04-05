const initialState = {
  market: {
    normal: {
      casillas: [
      {
        id: 0,
        img: '',
        type: 'normal',
        linker: [0,1,0,1], //arriba,derecha,abajo,izquierda
        costes: [0, 0, 3],
        rotation: 0,
      },
      {
        id: 1,
        img: '',
        type: 'gold',
        linker: [0,1,1,0],
        costes: [1, 2, 3],
        rotation: 0,
      },
      {
        id: 2,
        img: '',
        type: 'silver',
        linker: [1,1,1,1],
        costes: [1, 2, 3],
        rotation: 0,
      },
      {
        id: 3,
        img: '',
        type: 'normal',
        linker: [1,1,1,1],
        costes: [1, 2, 3],
        rotation: 0,
      },
    ]
    },
    special: {
      casillas: [
        {
          id: 4,
          img: '',
          type: 'red',
          linker: [1,1,1,1],
          costes: [1, 2, 3],
          rotation: 0,
        },
      ], 
    },
  },
  tablero: {
    casillas:   
    [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ],
    inicio: 1,
  },
  cartas: [
    {
      id: 0,
      type: ['Mathematics', 'Fast Model'],
      selected: false,
    },
    {
      id: 1,
      type: ['Mathematics', 'Fast Model'],
      selected: false,
    },
    {
      id: 2,
      type: ['Mathematics', 'Fast Model'],
      selected: false,
    },
      {
      id: 3,
      type: ['Mathematics', 'Fast Model'],
      selected: false,
    },
  ],
  target: null,
}

export default initialState;