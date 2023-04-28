import { useDispatch, useSelector } from 'react-redux';
import { aceptTrade, clearCardConfig, setCardConfig, clearSelected } from '../../../Store/actions';

import Cartas from './Cartas';

import styles from './Styles/tradeModal.module.scss';
import { TradeCards } from '../../../utils/ApiConf';
import Button from '../../UI/Button';
import Modal from '../../UI/Modal';
import { useState } from 'react';

const TradeBotModal = () => {
  const dispatch = useDispatch();
  const { players, id, cardConfig, actualPlayer } = useSelector((state) => ({ players: state.players, id: state.id, actualPlayer: state.actualPlayer, cardConfig: state.cardConfig }));
  const [step, setStep] = useState(0);

  async function handleTrade() {
    const tradePlayers = players.filter(f => f.cards.find(f => f.selected) !== undefined);
    if (tradePlayers.length === 2) {
      await TradeCards(id, tradePlayers[0], tradePlayers[1])
        .then((res) => {
          dispatch(aceptTrade(res));
          dispatch(clearCardConfig());
        })
    }
  }

  const cardConfigTrade = cardConfig[0]?.needed.pop(step)
  console.log(cardConfigTrade)
  return (
    <Modal
      isOpen={cardConfig.length}
      onClose={() => dispatch(setCardConfig(cardConfig.slice(1, cardConfig.length)))}
      title='Seleccione las cartas que quiere intercambiar'
    >
      <div className={styles.modalContainer}>
        <div className={styles.playersContainer}>
          {players.map((player, index) => {
            const selected = cardConfigTrade?.player === player.id ? cardConfigTrade?.cards ?? [] : [];
            return (
              <div className={styles.playerContainer} id={index} key={player.id} type={index}>
                <h3 className={styles.title}>{player.name}</h3>
                <div className={styles.playerCardsContainer}>
                  <Cartas
                    actualPlayer={index}
                    titleStyles={{ fontSize: 'smaller' }}
                    blocked={actualPlayer === index ? cardConfig[0]?.blocked : []}
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
              else dispatch(setCardConfig(cardConfig.slice(1, cardConfig.length)))
              dispatch(clearSelected())
            }}
          >
            Cancelar
          </Button>
          <Button
            variants='primary'
            onClick={handleTrade}
          >
            Aceptar
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default TradeBotModal;
