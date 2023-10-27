import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux'

import { DragDropContext } from 'react-beautiful-dnd';

import { mover } from '../../stores/gameStore/actions';
import { MoveSlab } from '../../utils/ApiConf';

function DragDropProvider({
  actualPlayer,
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
      onDragEnd={({ draggableId, destination }) => {
        if (
          whereIsPilar === actualPlayer
          || !draggableId
          || !destination?.droppableId
        ) return;
        const { droppableId } = destination;
        const slabIndex = parseInt(draggableId);
        const target = droppableId.replace('boardDrop_', '').split('-').map(n => parseInt(n));
        const slab = slabIndex < 4 ? normalMarket[slabIndex] : specialMarket[slabIndex - 4];
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
  actualPlayer: PropTypes.number.isRequired,
  player: PropTypes.object.isRequired,
  normalMarket: PropTypes.array.isRequired,
  specialMarket: PropTypes.array.isRequired,
  whereIsPilar: PropTypes.number.isRequired,
  mover: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

function stateToProps(state) {
  return {
    actualPlayer: state.game.actualPlayer,
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