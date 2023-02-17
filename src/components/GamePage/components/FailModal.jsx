import { Modal } from '@fluentui/react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

import Button from '../../UI/Button'

import styles from './Styles/FailModal.module.scss'

const FailModal = () => {
  const [closeModal, setCloseModal] = useState(false);
  return (
    <Modal
      isOpen
      onDismiss={() => setCloseModal(true)}
    >
      <div className={styles.modal}>
        <h1 className={styles.title}>Game Over</h1>
        <p className={styles.errorMSG}>El sistema se vio comprometido</p>
        <Button
          variants=''
          onClick={() => setCloseModal(true)}
        >
          Volver a la pantalla de inicio
        </Button>
      </div>
      {closeModal && <Navigate to='/' />}
    </Modal>
  );
}

export default FailModal;