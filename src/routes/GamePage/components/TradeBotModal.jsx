import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { aceptTrade, clearCardConfig, setCardConfig, clearSelected } from '../../../Store/actions';

import Cartas from './Cards';

import styles from './Styles/tradeModal.module.scss';
import { TradeCards } from '../../../utils/ApiConf';
import Button from '../../../components/UI/Button';
import Modal from '../../../components/UI/Modal';


const TradeBotModal = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { players, cardConfig, actualPlayer } = useSelector((state) => ({ players: state.players, actualPlayer: state.actualPlayer, cardConfig: state.cardConfig }));
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
  if (!cardConfig?.length) return '';
  const cardConfigTrade = cardConfig[0]?.needed[step];
  return (
    <Modal
      isOpen={cardConfig.length}
      onClose={() => {
        dispatch(setCardConfig(cardConfig.slice(1, cardConfig.length)));
        dispatch(clearCardConfig());
      }}
      title='Seleccione las cartas que quiere intercambiar'
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
                  <Cartas
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
