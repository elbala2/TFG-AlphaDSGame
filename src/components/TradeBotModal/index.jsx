import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';

import { aceptTrade, clearCardConfig, setCardConfig, clearSelected } from '../../stores/gameStore/actions';


import styles from './tradeModal.module.scss';
import { TradeCards } from '../../utils/ApiConf';
import Button from '../UI/Button';
import Modal from '../UI/Modal';
import Cards from '../Cards';
import { bindActionCreators } from 'redux';


const TradeBotModal = ({
  aceptTrade,
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

  async function handleTrade() {
    const tradePlayers = players.filter(f => f.cards.find(f => f.selected) !== undefined);
    if (tradePlayers.length === 2) {
      await TradeCards(id, tradePlayers[0], tradePlayers[1])
        .then((res) => {
          aceptTrade(res);
          clearCardConfig();
        })
    }
  }
  if (!cardConfig?.length) return '';
  const cardConfigTrade = cardConfig[0]?.needed[step];
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
          .filter(player => player.id === cardConfigTrade?.player || player.id === actualPlayer)
          .map((player) => {
            const selected = cardConfigTrade?.player === player.id ? cardConfigTrade?.cards ?? [] : [];
            return (
              <div className={styles.playerContainer} id={player.id} key={player.id} type={player.id}>
                <h3 className={styles.title}>{player.name}</h3>
                <div className={styles.playerCardsContainer}>
                  <Cards
                    actualPlayer={player.id}
                    titleStyles={{ fontSize: 'smaller' }}
                    blocked={actualPlayer === player.id ? cardConfig[0]?.blocked : []}
                    selected={selected}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.modalbuttoncontainer}>
          <Button
            variants='outlined secondary'
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

    players: state.game.players,
    actualPlayer: state.game.actualPlayer,
    cardConfig: state.game.cardConfig,
  };
}

function dispatchToProps(dispatch) {
  return {
    aceptTrade: bindActionCreators(aceptTrade, dispatch),
    setCardConfig: bindActionCreators(setCardConfig, dispatch),
    clearCardConfig: bindActionCreators(clearCardConfig, dispatch),
    clearSelected: bindActionCreators(clearSelected, dispatch),
  };
}

export default connect(stateToProps, dispatchToProps)(TradeBotModal);
