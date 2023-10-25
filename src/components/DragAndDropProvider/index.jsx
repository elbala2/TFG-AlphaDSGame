import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux'

import { DragDropContext } from 'react-beautiful-dnd';

import { mover } from '../../stores/gameStore/actions';
import { MoveSlab } from '../../utils/ApiConf';

function DragDropProvider({
  playerIndex,
  player,
  normalMarket,
  specialMarket,
  whereIsPilar,
  mover,
  children,
}) {
  const { id } = useParams();
  return (
    <DragDropContext
      onDragEnd={({ draggableId, destination: { droppableId } }) => {
        if (whereIsPilar === playerIndex) return;
        const slabIndex = parseInt(draggableId);
        const target = droppableId.replace('boardDrop_', '').split('-').map(n => parseInt(n));
        const slab = slabIndex < 4 ? normalMarket[slabIndex] : specialMarket[slabIndex - 4];
        console.log('🚀 ~ file: index.jsx:25 ~ droppableId:', droppableId);
        console.log('🚀 ~ file: index.jsx:27 ~ slabIndex:', slab, slab);
        console.log('🚀 ~ file: index.jsx:32 ~ player:', player);
        const cards = player.cards.filter(c => c.selected);
        MoveSlab(
          id,
          slabIndex,
          target,
          slab.rotation,
          cards,
        ).then((res) => {
          mover(res);
        });
      }}
    >
      {children}
    </DragDropContext>
  )
}

DragDropProvider.propTypes = {
}

function stateToProps(state) {
  return {
    player: state.game.players[state.game.actualPlayer],
    normalMarket: state.game.normalMarket,
    whereIsPilar: state.game.whereIsPilar,
    specialMarket: state.game.specialMarket,
  };
}

function dispatchToProps(dispatch) {
  return {
    mover: bindActionCreators(mover, dispatch),
  };
}

export default connect(stateToProps, dispatchToProps)(DragDropProvider)