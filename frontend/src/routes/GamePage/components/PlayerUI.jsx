import { useContext, useEffect, useState } from 'react';

import { connect } from 'react-redux';

import { PlayerContext } from '../../../components/PlayerProvider';

import LeftPlayerUI from './LeftPlayerUI';
import BoardUI from './BoardUI';
import TradeUI from './TradeUI';

import styles from '../Main.module.scss';

const PlayerUI = ({
  className,
  handleNextPlayer,
}) => {
  const { player } = useContext(PlayerContext)

  const [tradeOpen, setTradeOpen] = useState(false);

  useEffect(() => {
    setTradeOpen(false);
  }, [player.id]);

  if (!player.id) return '';

  return (
    <div className={`bgColor viewPage d-lg-flex px-lg-5 ${styles.mainCard} ${className ?? ''}`} type={player.color}>
      <LeftPlayerUI
        handleNextPlayer={handleNextPlayer}
        handleTrade={() => setTradeOpen(prevstate => !prevstate)}
      />
      {tradeOpen ? (
        <TradeUI onCancel={() => setTradeOpen(false)} />
      ) : (
        <BoardUI />
      )}
    </div>
  );
};

function stateToProps(state) {
  return {
  };
}

function dispatchToProps(dispatch) {
  return {
  };
}

export default connect(stateToProps, dispatchToProps)(PlayerUI);
