import { useState } from 'react';

import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DragDropContext } from 'react-beautiful-dnd';

import { mover } from '../../../stores/gameStore/actions';
import { MoveSlab } from '../../../utils/ApiConf';

import TradeModal from './TradeModal';
import LeftPlayerUI from './LeftPlayerUI';

import styles from '../Main.module.scss';
import RigthUI from './RigthUI';

const PlayerUI = ({
  playerIndex,
  handleNextPlayer,
  player,
  normalMarket,
  specialMarket,
  whereIsPilar,
  mover,
}) => {
  const { id } = useParams();
  const [tradeModalOpen, setTradeModalOpen] = useState(false);

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
      <div className={styles.mainCard} type={player.color}>
        <LeftPlayerUI
          playerIndex={playerIndex}
          handleNextPlayer={handleNextPlayer}
          handleTrade={() => setTradeModalOpen(prevstate => !prevstate)}
        />
        <RigthUI
          playerIndex={playerIndex}
        />
      </div>
      <TradeModal
        isOpen={tradeModalOpen}
        onClose={() => setTradeModalOpen(prevstate => !prevstate)}
      />
    </DragDropContext>
  );
};

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

export default connect(stateToProps, dispatchToProps)(PlayerUI);
