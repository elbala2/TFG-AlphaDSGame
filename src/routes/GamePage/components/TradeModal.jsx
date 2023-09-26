import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { aceptTrade } from '../../../stores/gameStore/actions';

import styles from './Styles/tradeModal.module.scss';
import { TradeCards } from '../../../utils/ApiConf';
import Button from '../../../components/UI/Button';
import Modal from '../../../components/UI/Modal';
import Cards from '../../../components/Cards';
import { bindActionCreators } from 'redux';

const TradeModal = ({
  isOpen,
  onClose,
  players,
  aceptTrade,
  dictionary,
}) => {
  const { id } = useParams();

  const [acept1, setacept1] = useState(false);
  const [acept2, setacept2] = useState(false);

  useEffect(() => {
    const tradePlayers = players.filter(f => f.cards.find(f => f.selected) !== undefined);
    if (acept1 && acept2 && tradePlayers.length === 2) {
      TradeCards(id, tradePlayers[0], tradePlayers[1])
        .then((res) => aceptTrade(res))
      setacept1(false);
      setacept2(false);
      onClose();
    }
  }, [acept1, acept2, aceptTrade, id, onClose, players])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={dictionary.title}
    >
      <div className={styles.modalContainer}>
        <div className={styles.playersContainer}>
          {players.map((player, index) => {
            return (
              <div className={styles.playerContainer} id={index} key={player.id} type={index}>
                <h3 className={styles.title}>{player.name}</h3>
                <div className={styles.playerCardsContainer}>
                  <Cards actualPlayer={index} titleStyles={{ fontSize: 'smaller' }}/>
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
            {acept1 ? dictionary.cancel : dictionary.accept}
          </Button>
          <Button
            variants={acept2 ? 'outlined secondary' : 'primary'}
            onClick={() => setacept2(x => !x)}
          >
            {acept2 ? dictionary.cancel : dictionary.accept}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

function stateToProps(state) {
  return {
    players: state.game.players,
    dictionary: {
      ...state.lang.dictionary.tradeModal,
      ...state.lang.dictionary.utils,
    },
  };
}

function dispatchToProps(dispatch) {
  return {
    aceptTrade: bindActionCreators(aceptTrade, dispatch)
  };
}

export default connect(stateToProps, dispatchToProps)(TradeModal);
