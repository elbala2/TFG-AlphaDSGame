import { createStore } from "redux"
import initialState from "./InitialState"

const rotaLinks = (casilla) => {
  const { linker, rotation } = casilla
  //arriba,derecha,abajo,izquierda
  let result = [...linker]
  for (var j = rotation; j > 0; j--) {
    result = [result.pop()].concat(result)
  }
  return result
}

const compruebaCasilla = (casilla, idDestino, casillasTablero, inicio) => {
  const arriba    = 0;
  const derecha   = 1;
  const abajo     = 2;
  const izquierda = 3;

  let valido = false;
  let i = 0;
  if (idDestino[0] === inicio && idDestino[1] === 0) {
    return rotaLinks(casilla)[izquierda] === 1
  }
  while (!valido && i < 4) {
    let casillaEnTablero = null;
    switch(i) {
      case 0: //comprueba el de arriba del destino
        if (idDestino[0] - 1 < 0) break;
        casillaEnTablero = casillasTablero[idDestino[0] - 1][idDestino[1]];
        if (! casillaEnTablero) break;
        valido = (rotaLinks(casilla)[arriba] && rotaLinks(casillaEnTablero)[abajo]) === 1;
        break;

      case 1: //comprueba el de la derecha del destino
        if (idDestino[1] + 1 > 3) break;
        casillaEnTablero = casillasTablero[idDestino[0]][idDestino[1] + 1];
        if (! casillaEnTablero) break;
        valido = (rotaLinks(casilla)[derecha] && rotaLinks(casillaEnTablero)[izquierda]) === 1;
        break;
      
      case 2: //comprueba el de abajo del destino
        if (idDestino[0] + 1 > 3) break;
        casillaEnTablero = casillasTablero[idDestino[0] + 1][idDestino[1]];
        if (! casillaEnTablero) break;
        valido = (rotaLinks(casilla)[abajo] && rotaLinks(casillaEnTablero)[arriba]) === 1;
        break;

      case 3: //comprueba el de la izquierda del destino
        if (idDestino[1] - 1 < 0) break;
        casillaEnTablero = casillasTablero[idDestino[0]][idDestino[1] - 1];
        if (! casillaEnTablero) break;
        valido = (rotaLinks(casilla)[izquierda] && rotaLinks(casillaEnTablero)[derecha]) === 1;
        break;
      
      default:
    }
    i++;
  }
  return valido;
}

const reducer = (state=initialState, action) => {
  if (action.type == null) return state
  const {
    market: {
      normal: {
        casillas: casillasNormales
      }, 
    special: {
      casillas: casillasEspeciales
      }
    }, 
    tablero: {
      casillas: casillasTablero, 
      inicio
    }, 
    cartas,
    target,
  } = state;

  let newtarget = target;

  if (action.type === 'MOVER'){
    const idDestino = target;
    const { idOrigen } = action
    if (idDestino == null || casillasTablero[idDestino[0]][idDestino[1]]) {
      throw Error;
    }
    const casillasOrigen = idOrigen > 3 ? casillasEspeciales : casillasNormales;
    const newidOrigen = idOrigen < 4 ? idOrigen : idOrigen - 4;
    const casilla = casillasOrigen[newidOrigen];

    const costes = casilla.costes;
    if (cartas.filter(f => f.selected && f.type[0] === 'Domain' ).length < costes[0]) throw Error('No se han seleccionado suficientes cartas de tipo domain') 
    if (cartas.filter(f => f.selected && f.type[0] === 'Computer Science' ).length < costes[1]) throw Error('No se han seleccionado suficientes cartas de tipo computer science') 
    if (cartas.filter(f => f.selected && f.type[0] === 'Mathematics' ).length < costes[2]) throw Error('No se han seleccionado suficientes cartas de tipo mathematics') 

    let i = cartas.length - 1;

    while(i >= 0 && costes[0] + costes[1] + costes[2] > 0) {
      let { selected, type } = cartas[i];
      if (selected && costes[0] > 0 && type[0] === 'Domain') {
        cartas.splice(i,1)
        costes[0] -= 1;
      }
      if (selected && costes[1] > 0 && type[0] === 'Computer Science') {
        cartas.splice(i,1)
        costes[1] -= 1;
      }
      if (selected && costes[2] > 0 && type[0] === 'Mathematics') {
        cartas.splice(i,1)
        costes[2] -= 1;
      }
      i--;
    }

    if ( !compruebaCasilla(casilla, idDestino, casillasTablero, inicio)) {
      throw Error(`Posicion ${idDestino[0]} ${idDestino[1]} no valida`);
    }

    casillasOrigen[newidOrigen] = null;
    casillasTablero[idDestino[0]][idDestino[1]] = casilla;
    newtarget = null; 
  }

  if (action.type === 'ROTAR') {
    const id = action.id < 4 ? action.id : action.id - 4;
    const casillas = action.id > 3 ? casillasEspeciales : casillasNormales;
    casillas[id].rotation = (casillas[id].rotation + 1) % 4;
  }

  if (action.type === 'SETTARGET') {
    newtarget = action.target;
  }
  
  if (action.type === 'CARDSELECTED') {
    cartas[action.cardId].selected = !cartas[action.cardId].selected;
  }

  return {
    market: {
      normal: {
        casillas: [...casillasNormales],
      },
      special: {
        casillas: [...casillasEspeciales],
      },
    },
    tablero: {
      casillas: [...casillasTablero],
      inicio,
    },
    cartas: [...cartas],
    target: newtarget,
  };
  
}

const store = createStore(reducer);

export default store;