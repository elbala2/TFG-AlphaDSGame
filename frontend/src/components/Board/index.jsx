import React from 'react'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Droppable } from 'react-beautiful-dnd';

import { mover, selectSlab } from '../../stores/gameStore/actions';

import Slab from '../Slab';

import styles from './board.module.scss';
import { MoveSlab } from '../../utils/ApiConf';

function Board({
  player: { id: playerId, board, way, cards },
  selectedSlab,

  normalMarket,
  specialMarket,

  mover,
  selectSlab,
}) {
  const { id } = useParams();

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
        <Droppable droppableId={`${playerId}_boardDrop_${x}-${y}`} isDropDisabled={false}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              className={`h-100 w-100 ${selectedSlab ? styles.clickable : ''}`}
              onClick={() => {
                const slab = normalMarket.find(s => s.id === selectedSlab) ?? specialMarket.find(s => s.id === selectedSlab);

                MoveSlab(
                  id,
                  slab.id,
                  [x, y],
                  slab.rotation,
                  cards.filter(c => c.selected),
                ).then((res) => {
                  mover(res);
                  selectSlab();
                });
              }}
              {...provided.droppableProps}
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
            {f.map((slab, j) => {
              return (
                <div
                  key={`fila${j}`}
                  className={`${styles.slabChessContainer}`}
                >
                  {renderSlab(slab, j, i)}
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

function stateToProps(state) {
  return {
    selectedSlab: state.game.selectedSlab,
    normalMarket: state.game.normalMarket,
    specialMarket: state.game.specialMarket,
  };
}

function dispatchToProps(dispatch) {
  return {
    mover: bindActionCreators(mover, dispatch),
    selectSlab: bindActionCreators(selectSlab, dispatch),
  };
}

export default connect(stateToProps, dispatchToProps)(Board);
