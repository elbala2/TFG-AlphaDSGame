import { useDispatch, useSelector } from 'react-redux';
import { aceptTrade } from '../../../Store/actions';
import { useState } from 'react';

import Cartas from './Cartas';

import styles from './Styles/tradeModal.module.scss';
import { TradeCards } from '../../../utils/ApiConf';
import Button from '../../UI/Button';
import Modal from '../../UI/Modal';

const TradeModal = (props) => {
  const dispatch = useDispatch();
  const players = useSelector((state) => state.players);
  const id = useSelector((state) => state.id);
  const [acept1, setacept1] = useState(false);
  const [acept2, setacept2] = useState(false);

  const { onClose, isOpen } = props;

  const aceptHandler = (fun) => {
    const tradePlayers = players.filter(f => f.cards.find(f => f.selected) !== undefined);
    // eslint-disable-next-line default-case
    switch (fun) {
      case 1:
        if (!acept1 && acept2 && tradePlayers.length === 2) {
          TradeCards(id, tradePlayers[0], tradePlayers[1]).then((res) => {
            dispatch(aceptTrade(res));
          })
          onClose();
        }
        setacept1((prevstate) => !prevstate);
        break;

      case 2:
        if (acept1 && !acept2 && tradePlayers.length === 2) {
          TradeCards(id, tradePlayers[0], tradePlayers[1]).then((res) => {
            dispatch(aceptTrade(res));
          })
          onClose();
        }
        setacept2((prevstate) => !prevstate);
        break;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title='Seleccione las cartas que quiere intercambiar'
    >
      <div className={styles.modalContainer}>
        <div className={styles.playersContainer}>
          {players.map((player, index) => {
            console.log(player, index)
            return (
              <div className={styles.playerContainer} id={index} key={index} type={index}>
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
            onClick={() => aceptHandler(1)}
          >
            {acept1 ? 'Cancelar' : 'Aceptar'}
          </Button>
          <Button
            variants={acept2 ? 'outlined secondary' : 'primary'}
            onClick={() => aceptHandler(2)}
          >
            {acept2 ? 'Cancelar' : 'Aceptar'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default TradeModal;
