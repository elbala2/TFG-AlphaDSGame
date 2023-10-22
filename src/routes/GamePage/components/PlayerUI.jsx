import { useState } from 'react';

import { connect } from 'react-redux';

import LeftPlayerUI from './LeftPlayerUI';

import styles from '../Main.module.scss';
import BoardUI from './BoardUI';
import TradeUI from './TradeUI';

const PlayerUI = ({
  playerIndex,
  handleNextPlayer,
  player,
  className,
}) => {
  const [tradeOpen, setTradeOpen] = useState(false);

  return (
    <div className={`bgColor viewPage d-lg-flex px-lg-5 ${styles.mainCard} ${className ?? ''}`} type={player.color}>
      <LeftPlayerUI
        playerIndex={playerIndex}
        handleNextPlayer={handleNextPlayer}
        handleTrade={() => setTradeOpen(prevstate => !prevstate)}
      />
      {tradeOpen ? (
        <TradeUI
          playerIndex={playerIndex}
          onCancel={() => setTradeOpen(false)}
        />
      ) : (
        <BoardUI
          playerIndex={playerIndex}
        />
      )}
    </div>
  );
};

function stateToProps(state, { playerIndex }) {
  return {
    player: state.game.players[playerIndex],
  };
}

function dispatchToProps(dispatch) {
  return {
  };
}

export default connect(stateToProps, dispatchToProps)(PlayerUI);
