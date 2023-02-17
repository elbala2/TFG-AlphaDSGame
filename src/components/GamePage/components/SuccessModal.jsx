import { Modal } from '@fluentui/react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import styles from './Styles/SuccessModal.module.scss'
import Button from '../../UI/Button';

const SuccessModal = () => {
  const players = useSelector(state => state.players)
  const [closeModal, setCloseModal] = useState(false);

  return (
    <Modal
      isOpen
      onDismiss={() => setCloseModal(true)}
    >
      <div className={styles.modal}>
        <h1 className={styles.title}>Game Over</h1>
        {players
          .sort((a, b) => b.puntos - a.puntos)
          .map((player, index) => (
            index === 0
            ? <p className={styles.winnerMSG}>El ganador es: {player.name} ({player.points} puntos)</p>
            : <p className={styles.loserMSG}>{index + 1}: {player.name} ({player.points} puntos)</p>
          ))
        }
        <Button
          onClick={() => setCloseModal(true)}
        >
          Volver a la pantalla de inicio
        </Button>
      </div>
      {closeModal && <Navigate to='/' />}
    </Modal>
  );
}

export default SuccessModal;