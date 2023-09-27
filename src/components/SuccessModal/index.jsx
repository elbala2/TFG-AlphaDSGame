import { useState } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

import Modal from '../UI/Modal';
import Button from '../UI/Button';

import styles from './SuccessModal.module.scss';

const SuccessModal = ({
  dictionary,
  players,
  finished,
}) => {
  const [closeModal, setCloseModal] = useState(false);

  return (
    <Modal
      isOpen={finished}
      onClose={() => setCloseModal(true)}
      title={dictionary.gameOver}
    >
      <div className='d-flex flex-column'>
        {players
          .sort((a, b) => b.points - a.points)
          .map((player, index) =>
            index === 0 ? (
              <p key={index} className={styles.winnerMSG}>
                {dictionary.winnerAnnouncement}: <b>{player.name}</b> ({player.points} {dictionary.points})
              </p>
            ) : (
              <p key={index} className={styles.loserMSG}>
                {index + 1}: {player.name} ({player.points} {dictionary.points})
              </p>
            ),
          )}
        <Button onClick={() => setCloseModal(true)}>
          {dictionary.goBackHome}
        </Button>
      </div>
      {closeModal && <Navigate to='/' />}
    </Modal>
  );
};

function stateToProps(state) {
  return {
    players: state.game.players,
    finished: state.game.finished,
    dictionary: {
      ...state.lang.dictionary.successModal,
      ...state.lang.dictionary.utils,
    },
  };
}

function dispatchToProps(dispatch) {
  return {
  };
}

export default connect(stateToProps, dispatchToProps)(SuccessModal);
