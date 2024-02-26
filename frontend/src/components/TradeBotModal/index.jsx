import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import { acceptTrade, clearCardConfig, setCardConfig, clearSelected } from '../../stores/gameStore/actions';


import styles from './tradeModal.module.scss';
import { TradeCards } from '../../utils/ApiConf';
import Button from '../UI/Button';
import Modal from '../UI/Modal';
import Cards from '../Cards';
import { bindActionCreators } from 'redux';


const TradeBotModal = ({
  acceptTrade,
  setCardConfig,
  clearCardConfig,
  clearSelected,
  players,
  cardConfig,
  actualPlayer,
  dictionary,
}) => {
  const { id } = useParams();
  const [step, setStep] = useState(0);
  const [slabStep] = useState(0);

  async function handleTrade() {
    const tradePlayers = players.filter(f => f.cards.find(f => f.selected) !== undefined);
    if (tradePlayers.length === 2) {
      await TradeCards(id, tradePlayers[0], tradePlayers[1])
        .then((res) => {
          acceptTrade(res);
          clearCardConfig();
          clearSelected();
        })
    }
  }

  if (!cardConfig?.length) return '';
  const cardConfigTrade = cardConfig[0];
  const playerConf = cardConfigTrade.needed[slabStep];

  const actPlayer = players.find(p => p.id === actualPlayer);
  const tradePlayer = players.find(p => p.id === playerConf.playerId);

  return (
    <Modal
      isOpen={cardConfig.length}
      onClose={() => {
        setCardConfig(cardConfig.slice(1, cardConfig.length));
        clearCardConfig();
      }}
      title={dictionary.title(tradePlayer.name)}
    >
      <div className={styles.modalContainer}>
        <div className={styles.playersContainer}>
          <div className={`bgColor shadow ${styles.playerContainer}`} type={actPlayer.color}>
            <h3 className='p-3'>{actPlayer.name}</h3>
            <div className='px-3 pb-3'>
              <Cards
                player={actPlayer}
                className='medium'
                blocked={cardConfigTrade?.blockedIds}
                selected={playerConf?.cardIds}
              />
            </div>
          </div>
          <div className={styles.exChangeIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
            </svg>
          </div>
          <div className={`bgColor shadow ${styles.playerContainer}`} type={tradePlayer.color}>
            <h3 className='p-3'>{tradePlayer.name}</h3>
            <div className='px-3 pb-3'>
              <Cards
                disabled
                player={tradePlayer}
                className='small'
                blocked={cardConfigTrade?.blockedIds}
                selected={playerConf?.cardIds}
              />
            </div>
          </div>
        </div>
        <div className='d-flex pt-3'>
          <div className='flex-fill' />
          <Button
            variants='outlined secondary'
            className='me-3'
            onClick={() => {
              if (step + 1 < cardConfig.length) setStep(s => s + 1)
              else setCardConfig(cardConfig.slice(1, cardConfig.length))
              clearSelected()
            }}
          >
            {dictionary.cancel}
          </Button>
          <Button
            variants='primary'
            onClick={handleTrade}
          >
            {dictionary.accept}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

function stateToProps(state) {
  return {
    dictionary: {
      ...state.lang.dictionary.tradeModal,
      ...state.lang.dictionary.utils,
    },

    players: [...state.game.players],
    actualPlayer: state.game.actualPlayer,
    cardConfig: state.game.cardConfig,
  };
}

function dispatchToProps(dispatch) {
  return {
    acceptTrade: bindActionCreators(acceptTrade, dispatch),
    setCardConfig: bindActionCreators(setCardConfig, dispatch),
    clearCardConfig: bindActionCreators(clearCardConfig, dispatch),
    clearSelected: bindActionCreators(clearSelected, dispatch),
  };
}

export default connect(stateToProps, dispatchToProps)(TradeBotModal);
