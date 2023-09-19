import React from 'react'
import PropTypes from 'prop-types'

import { useDispatch, useSelector } from 'react-redux';

import styles from './board.module.scss';
import { Droppable } from 'react-beautiful-dnd';
import Slab from '../Slab';
import { setTarget } from '../../Store/actions';

function Board({
  playerIndex,
}) {
  const {  start, board, way } = useSelector(state => ({
    start: state.start,
    pos: state.pos,
    board: state.players[playerIndex].board,
    way: state.players[playerIndex].way,
  }))

  const dispatch = useDispatch();

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
                  onDragOver={(event) => {
                    if (!casilla)
                      event.preventDefault();
                  }}
                  onDrop={() => {
                    if (!casilla)
                      dispatch(setTarget([ i, j ]));
                  }}
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

export default Board
