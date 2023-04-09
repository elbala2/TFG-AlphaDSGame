import React from 'react'
import PropTypes from 'prop-types'

import { useDispatch, useSelector } from 'react-redux';

import Modal from '../../UI/Modal'
import Button from '../../UI/Button'

import { NextTurn } from '../../../utils/ApiConf';
import { nextPlayer } from '../../../Store/actions';

function NexPlayerModal({
  isOpen,
  onClose,
}) {
  const dispatch = useDispatch();

  const id = useSelector((state) => state.id);

  function onSubmit() {
    NextTurn(id).then(res => dispatch(nextPlayer(res)))
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      title='¿Esta seguro de terminar el turno?'
      onClose={onClose}
    >
      <div>
        <Button
          className='mx-2'
          variants='secondary outlined'
          onClick={onClose}
        >
          Cerrar
        </Button>
        <Button
          variants='secondary'
          onClick={onSubmit}
        >
          Terminar el turno
        </Button>
      </div>
    </Modal>
  )
}

NexPlayerModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default NexPlayerModal
