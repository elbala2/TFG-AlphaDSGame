import { DefaultButton, Icon, Modal } from '@fluentui/react';
import { useDispatch, useSelector } from 'react-redux';
import { aceptTrade } from '../../../Store/actions';
import { useState } from 'react';

import Cartas from './Cartas';

import styles from './Styles/tradeModal.module.scss';
import { TradeCards } from '../../../utils/ApiConf';

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
      onDismiss={onClose}
      containerClassName={styles.modal}
      className={{ className: styles.backdrop }}
    >
      <div className={styles.header}>
        <h4 className='flex-fill'>
          Selecciona las cartas que quiere intercambiar
        </h4>
        <div className={styles.closebutton} onClick={onClose}>
          <Icon iconName='cancel' style={{ fontSize: 'x-large' }} />
        </div>
      </div>
      <hr className='my-0' />
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
          <DefaultButton
            text={acept1 ? 'Cancelar' : 'Aceptar'}
            className={acept1 ? styles.closebutton : styles.button}
            onClick={() => aceptHandler(1)}
          />
          <DefaultButton
            text={acept2 ? 'Cancelar' : 'Aceptar'}
            className={acept2 ? styles.closebutton : styles.button}
            select={acept2}
            onClick={() => aceptHandler(2)}
          />
        </div>
      </div>
    </Modal>
  );
};

export default TradeModal;
