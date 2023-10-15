import { useState } from 'react';
import { Navigate } from 'react-router-dom';

import Button from '../../UI/Button'
import Modal from '../../UI/Modal';

import styles from './FailModal.module.scss'
import { connect } from 'react-redux';

const FailModal = ({
  dictionary,
}) => {
  const [closeModal, setCloseModal] = useState(false);
  return (
    <Modal
      isOpen
      onClose={() => setCloseModal(true)}
      title={dictionary.gameOver}
    >
      <div>
        <p className={styles.errorMSG}>{dictionary.systemCompromised}</p>
        <Button
          variants=''
          onClick={() => setCloseModal(true)}
        >
          {dictionary.goBackHome}
        </Button>
      </div>
      {closeModal && <Navigate to='/' />}
    </Modal>
  );
}

function stateToProps(state) {
  return {
    dictionary: {
      ...state.lang.dictionary.failModal,
      ...state.lang.dictionary.utils,
    },
  };
}

function dispatchToProps(dispatch) {
  return {
  };
}

export default connect(stateToProps, dispatchToProps)(FailModal);