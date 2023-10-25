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
  const [slabStep, setSlabStep] = useState(0);

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
  return (
    <Modal
      isOpen={cardConfig.length}
      onClose={() => {
        setCardConfig(cardConfig.slice(1, cardConfig.length));
        clearCardConfig();
      }}
      title={dictionary.title}
    >
      <div className={styles.modalContainer}>
        <div className={styles.playersContainer}>
          {players
          .sort((p1, p2) => {
            if (p1.id === actualPlayer) return -1;
            if (p2.id === actualPlayer) return 1;
            return 0;
          })
          .map((player, index) => {
            if (player.id !== actualPlayer && playerConf.player !== player.id) return '';

            return (
              <div className={`bgColor shadow ${styles.playerContainer}`} id={player.id} key={player.id} type={player.color}>
                <h3 className='p-3'>{player.name}</h3>
                <div className='px-3 pb-3'>
                  <Cards
                    playerIndex={player.id}
                    className={index > 0 ? 'small' : 'medium'}
                    disabled={player.id !== actualPlayer}
                    blocked={cardConfig[0]?.blocked}
                    selected={playerConf?.cards}
                  />
                </div>
              </div>
            );
          })}
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
