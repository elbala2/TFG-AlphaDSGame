import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux';

import styles from './board.module.scss';
import { Droppable } from 'react-beautiful-dnd';
import Slab from '../Slab';

function Board({
  board,
  way,
}) {

  function isWayPart(x, y) {
    const xcoord = 0;
    const ycoord = 1;

    let res = false;
    way.every(step => {
      res = step[xcoord] === x && step[ycoord] === y;
      return !res;
    })
    return res;
  }

  function renderSlab(slab, x, y) {
    if (!slab) {
      return (
        <Droppable droppableId={`boardDrop_${y}-${x}`}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className='h-100 w-100'
            >
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      );
    }

    return <Slab slab={slab} isWayPart={isWayPart(x, y)} />
  }

  return (
    <div className={`${styles.board}`}>
      {board.map((f, i) => {
        return (
          <div key={`col${i}`} className={`${styles.boardRow}`}>
            {f.map((casilla, j) => {
              return (
                <div
                  key={`fila${j}`}
                  className={`${styles.slabChessContainer}`}
                >
                  {renderSlab(casilla, j, i)}
                </div>
              );
            })}
          </div>
        );          
      })}
    </div>
  )
}
Board.propTypes = {}

function stateToProps(state, { playerIndex }) {
  return {
    board: state.game.players[playerIndex].board,
    way: state.game.players[playerIndex].way,
  };
}

function dispatchToProps(dispatch) {
  return {
  };
}

export default connect(stateToProps, dispatchToProps)(Board);
