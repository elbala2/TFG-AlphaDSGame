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
        const rotation = (slabIndex < 4 ? normalMarket[slabIndex] : specialMarket[slabIndex - 4]).rotation;
        const cards = player.cards.filter(c => c.selected);
        MoveSlab(
          id,
          slabIndex,
          target,
          rotation,
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

function stateToProps(state, { playerIndex }) {
  return {
    player: state.game.players[playerIndex],
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