import { randomInt } from "mathjs"

const genCostes = () => {
  const blue = randomInt(0, 4);
  const red = randomInt(0, 4 - blue);
  const green = randomInt(0, 4 - blue - red);
  if (blue + red + green === 0) return [1, 0, 1]
  return [blue, red, green];
}

const genCasillasMercado = () => {
  const genCasilla = (min, max) => {
    return {
      puntos: randomInt(min, max),
      costes: genCostes(),
      rotation: 0
    };
  }

  const res = []
  for (let i = 0; i < 6; i++) {
    res.push({
      type: 'normal',
      linker: [0,1,0,1], //arriba,derecha,abajo,izquierda
      ...genCasilla(0, 2)
    })
  }

  for (let i = 0; i < 12; i++) {
    res.push({
      type: 'normal',
      linker: [0,1,1,0], //arriba,derecha,abajo,izquierda
      ...genCasilla(0, 2)
    })
  }

  for (let i = 0; i < 6; i++) {
    res.push({
      type: 'normal',
      linker: [1,1,1,1], //arriba,derecha,abajo,izquierda
      ...genCasilla(0, 2)
    })
  }

  for (let i = 0; i < 14; i++) {
    res.push({
      type: 'normal',
      linker: [1,0,1,1], //arriba,derecha,abajo,izquierda
      ...genCasilla(0, 2)
    })
  }

  res.push({
    type: 'gold',
    linker: [0,1,1,0], //arriba,derecha,abajo,izquierda
    ...genCasilla(2, 4)
  })

  res.push({
    type: 'gold',
    linker: [0,1,0,1], //arriba,derecha,abajo,izquierda
    ...genCasilla(2, 4)
  })

  res.push({
    type: 'gold',
    linker: [1,1,1,1], //arriba,derecha,abajo,izquierda
    ...genCasilla(2, 4)
  })

  res.push({
    type: 'gold',
    linker: [1,0,1,1], //arriba,derecha,abajo,izquierda
    ...genCasilla(2, 4)
  })

  res.push({
    type: 'silver',
    linker: [0,1,1,0], //arriba,derecha,abajo,izquierda
    ...genCasilla(1, 3)
  })

  res.push({
    type: 'silver',
    linker: [0,1,0,1], //arriba,derecha,abajo,izquierda
    ...genCasilla(1, 3)
  })

  res.push({
    type: 'silver',
    linker: [1,1,1,1], //arriba,derecha,abajo,izquierda
    ...genCasilla(1, 3)
  })

  res.push({
    type: 'silver',
    linker: [1,0,1,1], //arriba,derecha,abajo,izquierda
    ...genCasilla(1, 3)
  })

  const blueTitle = ['Graphical exploring', 'Numerical Exploring','Data Cleaning'];
  const blueDescription = ['Using graphical tools to view your data', 'Using mathematical tools to view your data', 'Preparing your data for analysis'];
  const blueCostes = [[2, 1, 0], [1, 0, 1], [2, 0, 2]];
  for (let i = 0; i < 3; i++) {
    res.push({
      type: 'blue',
      isSpecial: true,
      isRisk: false,
      title: blueTitle[i],
      description: blueDescription[i],
      linker: [1,1,1,1], //arriba,derecha,abajo,izquierda
      ...genCasilla(2, 4),
      costes: blueCostes[i],
    })
  }

  const redTitle = ['Pattern Recognition', 'Outlier Detection', 'Model Evaluation'];
  const redDescription = ['Looking for patterns in your data', 'Looking for strange data in your data', 'How good is the model?'];
  const redCostes = [[0, 1, 2], [1, 0, 1], [2, 1, 1]];
  for (let i = 0; i < 3; i++) {
    res.push({
      type: 'red',
      isSpecial: true,
      isRisk: false,
      title: redTitle[i],
      description: redDescription[i],
      linker: [1,1,1,1], //arriba,derecha,abajo,izquierda
      ...genCasilla(2, 4),
      costes: redCostes[i],
    })
  }

  const yellowTitle = ['Graphical exploring', 'Numerical Exploring', 'Data Cleaning'];
  const yellowDescription = ['Using graphical tools to view your data', 'Using mathematical tools to view your data', 'Preparing your data for analysis'];
  const yellowCostes = [[0, 1, 1], [0, 1, 2], [1, 2, 1]];
  for (let i = 0; i < 3; i++) {
    res.push({
      type: 'yellow',
      isSpecial: true,
      isRisk: false,
      title: yellowTitle[i],
      description: yellowDescription[i],
      linker: [1,1,1,1], //arriba,derecha,abajo,izquierda
      ...genCasilla(2, 4),
      costes: yellowCostes[i],
    })
  }

  const greenTitle = ['Mobile Application', 'Storytelling', 'Deployment'];
  const greenDescription = ['An app for your mobile phone', 'To present the results to the users', 'To develop the final product'];
  const greenCostes = [[1, 2, 0], [2, 1, 1], [0, 1, 1]];
  for (let i = 0; i < 3; i++) {
    res.push({
      type: 'green',
      isSpecial: true,
      isRisk: false,
      title: greenTitle[i],
      description: greenDescription[i],
      linker: [1,1,1,1], //arriba,derecha,abajo,izquierda
      ...genCasilla(2, 4),
      costes: greenCostes[i],
    })
  }
  const risks = [];
  risks.push({
    type: 'Complex Model',
    description: 'Use Simple Model to fix the risk',
    isSpecial: true,
    isRisk: true,
    costes: 2,
    contador: 0,
    puntos: 4,
  },{
    type: 'Danger Data',
    description: 'Use Protected Data to fix the risk',
    isSpecial: true,
    isRisk: true,
    costes: 1,
    contador: 0,
    puntos: 4,
  },{
    type: 'No Data',
    description: 'Use Data Base to fix the risk',
    isSpecial: true,
    isRisk: true,
    costes: 2,
    contador: 0,
    puntos: 4,
  },{
    type: 'Old Software',
    description: 'Use Open Source to fix the risk',
    isSpecial: true,
    isRisk: true,
    costes: 1,
    contador: 0,
    puntos: 4,
  },{
    type: 'Old Technology',
    description: 'Use New Technology to fix the risk',
    isSpecial: true,
    isRisk: true,
    costes: 2,
    contador: 0,
    puntos: 4,
  },{
    type: 'Slow Model',
    description: 'Use Fast Model to fix the risk',
    isSpecial: true,
    isRisk: true,
    costes: 1,
    contador: 0,
    puntos: 4,
  },{
    type: 'Virus',
    description: 'Use Antivirus to fix the risk',
    isSpecial: true,
    isRisk: true,
    costes: 2,
    contador: 0,
    puntos: 4,
  },{
    type: 'Working Alone',
    description: 'Use Team Spirit to fix the risk',
    isSpecial: true,
    isRisk: true,
    costes: 1,
    contador: 0,
    puntos: 4,
  },{
    type: 'Wrong Model',
    description: 'Use Right Model to fix the risk',
    isSpecial: true,
    isRisk: true,
    costes: 2,
    contador: 0,
    puntos: 4,
  });
  return res.concat(risks.sort(() => Math.random() - 0.5).slice(0, 3));
}

const genCartasMercado = () => {
  const res =[];
  for (let i = 0; i < 4; i++) {
    res.push({
      type: ['Mathematics', 'Fast Model'],
      selected: false,
    },{
      type: ['Mathematics', 'Simple Model'],
      selected: false,
    },{
      type: ['Mathematics', 'Right Model'],
      selected: false,
    },{
      type: ['Computer Science', 'New Technology'],
      selected: false,
    },{
      type: ['Computer Science', 'Antivirus'],
      selected: false,
    },{
      type: ['Computer Science', 'Open Source'],
      selected: false,
    },{
      type: ['Domain', 'Data Base'],
      selected: false,
    },{
      type: ['Domain', 'Protected Data'],
      selected: false,
    },{
      type: ['Domain', 'Team Spirit'],
      selected: false,
    })
  }

  return res;
}


const initialState = {
  market: {
    normal: {
      casillas: []
    },
    special: {
      casillas: []
    },
  },
  inicio: 1,
  casillas: genCasillasMercado().sort(() => Math.random() - 0.5),
  cartas: genCartasMercado().sort(() => Math.random() - 0.5),
  target: null,
  success: null,
  actualplayer: 0,
  pos: null,
  players: [
    {
      misionCompleted: false,
      mision: 'red',
      name: 'Player 1',
      type: 0,
      puntos: 0,
      completed: false,
      haComprado: false,
      tablero: [
          [null, null, null, null],
          [{
            type: 'redStart',
            linker: [1,1,1,1],
            rotation: 0,
            isHere: true,
          }, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      cartas: []
    },
    {
      misionCompleted: false,
      mision: 'green',
      name: 'Player 2',
      type: 0,
      puntos: 0,
      haComprado: false,
      completed: false,
      tablero: [
          [null, null, null, null],
          [{
            type: 'greenStart',
            linker: [1,1,1,1],
            rotation: 0,
          }, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      cartas: []
    },
    {
      misionCompleted: false,
      mision: 'blue',
      name: 'Player 3',
      type: 0,
      puntos: 0,
      haComprado: false,
      completed: false,
      tablero: [
          [null, null, null, null],
          [{
            type: 'blueStart',
            linker: [1,1,1,1],
            rotation: 0,
          }, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      cartas: []
    },
    {
      misionCompleted: false,
      mision: 'yellow',
      name: 'Player 4',
      type: 0,
      puntos: 0,
      haComprado: false,
      completed: false,
      tablero: [
          [null, null, null, null],
          [{
            type: 'yellowStart',
            linker: [1,1,1,1],
            rotation: 0,
          }, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      cartas: []
    }
  ],
}

export default initialState;