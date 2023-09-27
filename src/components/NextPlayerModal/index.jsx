import React from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom';

import { connect, useDispatch } from 'react-redux';

import Modal from '../UI/Modal'
import Button from '../UI/Button'

import { NextTurn } from '../../utils/ApiConf';
import { nextPlayer } from '../../stores/gameStore/actions';
import { bindActionCreators } from 'redux';

function NexPlayerModal({
  isOpen,
  onClose,
  nextPlayer,
  dictionary,
}) {
  const { id } = useParams();

  function onSubmit() {
    NextTurn(id).then(res => nextPlayer(res))
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      title={dictionary.title}
      onClose={onClose}
    >
      <div className='m-5'>
        <Button
          className='mx-2'
          variants='secondary outlined'
          onClick={onClose}
        >
          {dictionary.cancel}
        </Button>
        <Button
          variants='secondary'
          onClick={onSubmit}
        >
          {dictionary.endTurn}
        </Button>
      </div>
    </Modal>
  )
}

NexPlayerModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

function stateToProps(state) {
  return {
    dictionary: {
      ...state.lang.dictionary.nextPlayerModal,
      ...state.lang.dictionary.utils,
    },
  };
}

function dispatchToProps(dispatch) {
  return {
    nextPlayer: bindActionCreators(nextPlayer, dispatch),
  };
}

export default connect(stateToProps, dispatchToProps)(NexPlayerModal);
