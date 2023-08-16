import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import Modal from '../../UI/Modal';
import Button from '../../UI/Button';

import styles from './Styles/SuccessModal.module.scss';

const SuccessModal = () => {
  const { players, finished } = useSelector((state) => ({
    players: state.players,
    finished: state.finished,
  }));
  const [closeModal, setCloseModal] = useState(false);

  return (
    <Modal
      isOpen={finished}
      onClose={() => setCloseModal(true)}
      title='Game Over'
    >
      <div className='d-flex flex-column'>
        {players
          .sort((a, b) => b.points - a.points)
          .map((player, index) =>
            index === 0 ? (
              <p key={index} className={styles.winnerMSG}>
                El ganador es: <b>{player.name}</b> ({player.points} puntos)
              </p>
            ) : (
              <p key={index} className={styles.loserMSG}>
                {index + 1}: {player.name} ({player.points} puntos)
              </p>
            ),
          )}
        <Button onClick={() => setCloseModal(true)}>
          Volver a la pantalla de inicio
        </Button>
      </div>
      {closeModal && <Navigate to='/' />}
    </Modal>
  );
};

export default SuccessModal;
