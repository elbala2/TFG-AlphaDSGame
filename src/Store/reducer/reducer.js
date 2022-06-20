/* eslint-disable no-const-assign */
/* eslint-disable array-callback-return */
import {
  ACEPTTRADE,
  CARDSELECTED_ACTION,
  FIX,
  MOVER_ACTION,
  NEXTPLAYER,
  ROTAR_ACTION,
  SETTARGET_ACTION,
  CONFIG,
  DESCARTAR,
  START,
  RESET,
} from '../actions';
import initialState from '../InitialState';

const getRiskFixCardType = type => {
  switch (type) {
    case 'Complex Model':
      return 'Simple Model';
    case 'Danger Data':
      return 'Protected Data';
    case 'No Data':
      return 'Data Base';
    case 'Old Software':
      return 'Open Source';
    case 'Old Technology':
      return 'New Technology';
    case 'Slow Model':
      return 'Fast Model';
    case 'Virus':
      return 'Antivirus';
    case 'Working Alone':
      return 'Team Spirit';
    case 'Wrong Model':
      return 'Right Model';
    default:
      return true;
  }
};

const rotaLinks = casilla => {
  const { linker, rotation } = casilla;
  console.log(casilla);
  //arriba,derecha,abajo,izquierda
  let result = [...linker];
  for (var j = rotation; j > 0; j--) {
    result = [result.pop()].concat(result);
  }
  return result;
};

const compruebaCasilla = (casilla, idDestino, casillasTablero, here = false) => {
  const arriba = 0;
  const derecha = 1;
  const abajo = 2;
  const izquierda = 3;

  let hecho = true;
  if (idDestino[0] === 0 && idDestino[1] === 2) {
    hecho = rotaLinks(casilla)[arriba] === 1;
  }
  let casillaEnTablero = null;
  //comprueba el de arriba del destino
  if (idDestino[0] - 1 >= 0) {
    casillaEnTablero = casillasTablero[idDestino[0] - 1][idDestino[1]];
    if (casillaEnTablero !== null && (!here || !casillaEnTablero.wasHere))
      if ((rotaLinks(casilla)[arriba] && rotaLinks(casillaEnTablero)[abajo]) === 1 && hecho)
        return 1;
  }

  //comprueba el de la derecha del destino
  if (idDestino[1] + 1 <= 3) {
    casillaEnTablero = casillasTablero[idDestino[0]][idDestino[1] + 1];
    if (casillaEnTablero !== null && (!here || !casillaEnTablero.wasHere))
      if ((rotaLinks(casilla)[derecha] && rotaLinks(casillaEnTablero)[izquierda]) === 1 && hecho)
        return 2;
  }

  //comprueba el de abajo del destino
  if (idDestino[0] + 1 <= 3) {
    casillaEnTablero = casillasTablero[idDestino[0] + 1][idDestino[1]];
    if (casillaEnTablero !== null && (!here || !casillaEnTablero.wasHere))
      if ((rotaLinks(casilla)[abajo] && rotaLinks(casillaEnTablero)[arriba]) === 1 && hecho)
        return 3;
  }

  //comprueba el de la izquierda del destino
  if (idDestino[1] - 1 >= 0) {
    casillaEnTablero = casillasTablero[idDestino[0]][idDestino[1] - 1];
    if (casillaEnTablero !== null && (!here || !casillaEnTablero.wasHere))
      if ((rotaLinks(casilla)[izquierda] && rotaLinks(casillaEnTablero)[derecha]) === 1 && hecho)
        return 4;
  }
  return 0;
};

const playerReducer = (state = initialState, action) => {
  if (action.type == null) return state;
  const {
    market: {
      normal: { casillas: casillasNormales },
      special: { casillas: casillasEspeciales },
    },
    casillas: casillasGenerales,
    cartas: cartasGenerales,
    actualplayer,
    target,
    inicio,
    players,
    pos,
  } = state;

  console.log(state)

  switch (action.type) {
    case RESET: 
      return initialState;
    case START: 
      players.map(player => {
        cartasGenerales.push(...player.cartas);
        player.cartas = [];
        player.haComprado = false;
        for (var i = 0; i < 4; i++) {
          player.cartas = player.cartas.concat(cartasGenerales.shift());
        }
      });

      while (casillasNormales.length > 0) casillasGenerales.push(casillasNormales.shift());

      while (casillasNormales.length < 4) {
        let casilla = casillasGenerales.shift();
        if (!casilla.isSpecial) casillasNormales.push(casilla);
        else {
          if (casillasEspeciales.length < 4) casillasEspeciales.push(casilla);
          else casillasGenerales.push(casilla);
        }
      }
      return {
        ...state,
      };
    case CONFIG:
      const start = ['redStart', 'greenStart', 'blueStart', 'yellowStart'];
      const { players: playersConfig, inicio: inicioConfig } = action.config;
      players.forEach((player, index) => {
        player.name = playersConfig[index].name;
        player.type = playersConfig[index].type;
        if (inicioConfig !== 1) {
          player.tablero[inicio][0] = null;
          player.tablero[inicioConfig][0] = {
            type: start[index],
            linker: [1, 1, 1, 1],
            rotation: 0,
          };
        }
        if (index === 0) {
          player.tablero[inicioConfig][0].isHere = true;
        }
      });
      return {
        inicio: inicioConfig,
        pos: [inicio, 0, 0],
        actualplayer: 0,
        ...state,
      };

    case MOVER_ACTION:
      const { tablero: casillasTablero, cartas } = state.players[actualplayer];

      const idDestino = target;
      const { idOrigen } = action;
      if (idDestino == null || casillasTablero[idDestino[0]][idDestino[1]]) {
        throw Error;
      }
      const casillasOrigen = idOrigen > 3 ? casillasEspeciales : casillasNormales;
      const newidOrigen = idOrigen < 4 ? idOrigen : idOrigen - 4;
      const casilla = casillasOrigen[newidOrigen];

      const costes = casilla.costes;
      if (cartas.filter(f => f.selected && f.type[0] === 'Domain').length < costes[0])
        throw Error('No se han seleccionado suficientes cartas de tipo domain');
      if (cartas.filter(f => f.selected && f.type[0] === 'Computer Science').length < costes[1])
        throw Error('No se han seleccionado suficientes cartas de tipo computer science');
      if (cartas.filter(f => f.selected && f.type[0] === 'Mathematics').length < costes[2])
        throw Error('No se han seleccionado suficientes cartas de tipo mathematics');

      let i = cartas.length - 1;

      while (i >= 0 && costes[0] + costes[1] + costes[2] > 0) {
        let { selected, type } = cartas[i];
        if (selected && costes[0] > 0 && type[0] === 'Domain') {
          cartasGenerales.push(cartas.splice(i, 1)[0]);
          costes[0] -= 1;
        }
        if (selected && costes[1] > 0 && type[0] === 'Computer Science') {
          cartasGenerales.push(cartas.splice(i, 1)[0]);
          costes[1] -= 1;
        }
        if (selected && costes[2] > 0 && type[0] === 'Mathematics') {
          cartasGenerales.push(cartas.splice(i, 1)[0]);
          costes[2] -= 1;
        }
        i--;
      }
      if (compruebaCasilla(casilla, idDestino, casillasTablero) === 0)
        throw Error(
          `Posicion ${idDestino[0]} ${idDestino[1]} no valida, ${compruebaCasilla(
            casilla,
            idDestino,
            casillasTablero,
            inicio,
          )}`,
        );

      casillasGenerales.push(casillasOrigen.splice(newidOrigen, 1)[0]);
      casillasTablero[idDestino[0]][idDestino[1]] = casilla;
      if (!players[actualplayer].completed && casillasTablero[0][2] !== null)
        players[actualplayer].puntos += 10;
      players[actualplayer].completed = casillasTablero[0][2] !== null;
      players[actualplayer].puntos += casilla.puntos;
      players[actualplayer].haComprado = true;
      return {
        ...state,
        target: null,
      };

    case ROTAR_ACTION:
      const id = action.id < 4 ? action.id : action.id - 4;
      const casillas = action.id > 3 ? casillasEspeciales : casillasNormales;
      casillas[id].rotation = (casillas[id].rotation + 1) % 4;
      break;

    case SETTARGET_ACTION:
      return {
        ...state,
        target: action.target,
      };

    case CARDSELECTED_ACTION:
      const playerid = typeof action.playerId !== 'undefined' ? action.playerId : actualplayer;
      players[playerid].cartas[action.cardId].selected =
        !players[playerid].cartas[action.cardId].selected;
      break;

    case NEXTPLAYER:
      if (actualplayer === players.length - 1) {
        var auxPos = pos;
        var success;
        if (pos !== null) {
          if (pos[0] === 0 && pos[1] === 2) {
            players[auxPos[2]].tablero[inicio][0].isHere = true;
            auxPos = [inicio, 0, auxPos[2] + 1];
            success = auxPos[2] === players.length - 1 || true;
          } else {
            switch (
              compruebaCasilla(
                players[pos[2]].tablero[pos[0]][pos[1]],
                [pos[0], pos[1]],
                players[pos[2]].tablero,
                true,
              )
            ) {
              case 1:
                auxPos = [pos[0] - 1, pos[1], pos[2]];
                players[pos[2]].tablero[pos[0]][pos[1]].wasHere = true;
                break;
              case 2:
                auxPos = [pos[0], pos[1] + 1, pos[2]];
                players[pos[2]].tablero[pos[0]][pos[1]].wasHere = true;
                break;
              case 3:
                auxPos = [pos[0] + 1, pos[1], pos[2]];
                players[pos[2]].tablero[pos[0]][pos[1]].wasHere = true;
                break;
              case 4:
                auxPos = [pos[0], pos[1] - 1, pos[2]];
                players[pos[2]].tablero[pos[0]][pos[1]].wasHere = true;
                break;
              default:
                break;
            }
          }
        } else {
          auxPos = [inicio, 0, 0];
        }

        players.map(player => {
          cartasGenerales.push(...player.cartas);
          player.cartas = [];
          player.haComprado = false;
          for (var i = 0; i < 4; i++) {
            player.cartas = player.cartas.concat(cartasGenerales.shift());
          }
        });

        while (casillasNormales.length > 0) casillasGenerales.push(casillasNormales.shift());

        while (casillasNormales.length < 4) {
          let casilla = casillasGenerales.shift();
          if (!casilla.isSpecial) casillasNormales.push(casilla);
          else {
            if (casillasEspeciales.length < 4) casillasEspeciales.push(casilla);
            else casillasGenerales.push(casilla);
          }
        }
        return {
          ...state,
          pos: auxPos,
          success,
          actualplayer: (actualplayer + 1) % players.length,
        };
      }
      return {
        ...state,
        actualplayer: (actualplayer + 1) % players.length,
      };

    case ACEPTTRADE:
      const auxPlayer = [];
      players.map(player => {
        if (player.cartas.filter(f => f.selected).length >= 1) auxPlayer.push(player);
      });

      if (auxPlayer.length !== 2) throw Error('Selecciona cartas de dos jugadores');
      if (
        auxPlayer[0].cartas.filter(f => f.selected).length !==
        auxPlayer[1].cartas.filter(f => f.selected).length
      )
        throw Error('No se han seleccionado las cartas correctamente');

      let auxCarts = auxPlayer[0].cartas.filter(f => f.selected);
      auxPlayer[0].cartas = auxPlayer[0].cartas.filter(f => !f.selected);
      auxCarts.map(cart => {
        cart.selected = false;
      });
      auxPlayer[1].cartas = auxPlayer[1].cartas.concat(auxCarts);
      auxCarts = auxPlayer[1].cartas.filter(f => f.selected);
      auxPlayer[1].cartas = auxPlayer[1].cartas.filter(f => !f.selected);
      auxCarts.map(cart => {
        cart.selected = false;
      });
      auxPlayer[0].cartas = auxPlayer[0].cartas.concat(auxCarts);
      break;

    case FIX:
      const riesgo = casillasEspeciales[action.riskId];
      const cartasAux = players[actualplayer].cartas.filter(
        f => f.selected && f.type[1] === getRiskFixCardType(riesgo.type),
      );
      console.log(action.riskId, casillasEspeciales);
      for (let i = 0; i < riesgo.costes; i++) {
        const carta = cartasAux[i];
        cartasGenerales.push(
          players[actualplayer].cartas.splice(players[actualplayer].cartas.indexOf(carta), 1),
        );
      }
      casillasEspeciales.splice(action.riskId, 1);
      players[actualplayer].puntos += riesgo.puntos;
      break;

    case DESCARTAR:
      cartasGenerales.push(players[actualplayer].cartas.splice(action.id, 1));
      break;

    default:
      break;
  }

  return {
    ...state,
  };
};

export default playerReducer;
