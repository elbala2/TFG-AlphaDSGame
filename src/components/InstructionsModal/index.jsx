import PropTypes from 'prop-types'
import React from 'react'

import { connect } from 'react-redux'

import Modal from '../UI/Modal';

import StartGameSection from './components/StartGameSection';

import './styles.scss';
import ObjetiveSection from './components/ObjetiveSection';

export const INSTRUCTIONS_TABS = {
  START_GAME: 'startGame',
  OBJETIVE: 'objective',
  BUY_SLABS: 'buySlabs',
  TRADE_CARDS: 'tradeCards',
  FINISH_GAME: 'finishGame',
};

function InstructionsModal({
  open,
  onClose,

  dictionary,
}) {
  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      title={dictionary.title}
      fullScreen
    >
      <div className='sidePanelLayout'>
        <div className='sidePanel'>
          {Object.values(INSTRUCTIONS_TABS).map(sectionId => (
            <a
              href={`#${sectionId}`}
              className='sectionLink me-3'
            >
              {dictionary[sectionId]}
            </a>
          ))}
        </div>
        <div className='sectionContent'>
            <StartGameSection className='mb-4'/>
            <ObjetiveSection />
        </div>
      </div>
    </Modal>
  )
}

InstructionsModal.propTypes = {
}

function mapStateToProps(state) {
  return ({
    dictionary: {
      ...state.lang.dictionary.instructionsModal,
      ...state.lang.dictionary.utils,
    },
  });
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(InstructionsModal)