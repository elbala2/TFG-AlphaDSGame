import { useDispatch, useSelector } from 'react-redux';
import { aceptTrade, discardCardConfig } from '../../../Store/actions';
import { useEffect, useState } from 'react';

import Cartas from './Cartas';

import styles from './Styles/tradeModal.module.scss';
import { TradeCards } from '../../../utils/ApiConf';
import Button from '../../UI/Button';
import Modal from '../../UI/Modal';

const TradeBotModal = ({
  isOpen,
  onClose,
}) => {
  const dispatch = useDispatch();
  const { players, id, cardConfig } = useSelector((state) => ({ players: state.players, id: state.id, cardConfig: state.cardConfig }));

  const [acept1, setacept1] = useState(false);
  const [acept2, setacept2] = useState(false);

  useEffect(() => {
    const tradePlayers = players.filter(f => f.cards.find(f => f.selected) !== undefined);
    if (acept1 && acept2 && tradePlayers.length === 2) {
      TradeCards(id, tradePlayers[0], tradePlayers[1])
        .then((res) => dispatch(aceptTrade(res)))
      setacept1(false);
      setacept2(false);
      onClose();
    }
  }, [acept1, acept2, dispatch, id, onClose, players])

  return (
    <Modal
      isOpen={cardConfig.length}
      onClose={() => dispatch(discardCardConfig(cardConfig.slice(1, cardConfig.length)))}
      title='Seleccione las cartas que quiere intercambiar'
    >
      <div className={styles.modalContainer}>
        <div className={styles.playersContainer}>
          {players.map((player, index) => {
            return (
              <div className={styles.playerContainer} id={index} key={player.id} type={index}>
                <h3 className={styles.title}>{player.name}</h3>
                <div className={styles.playerCardsContainer}>
                  <Cartas actualPlayer={index} titleStyles={{ fontSize: 'smaller' }}/>
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.modalbuttoncontainer}>
          <Button
            variants={acept1 ? 'outlined secondary' : 'primary'}
            onClick={() => setacept1(x => !x)}
          >
            {acept1 ? 'Cancelar' : 'Aceptar'}
          </Button>
          <Button
            variants={acept2 ? 'outlined secondary' : 'primary'}
            onClick={() => setacept2(x => !x)}
          >
            {acept2 ? 'Cancelar' : 'Aceptar'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default TradeBotModal;
