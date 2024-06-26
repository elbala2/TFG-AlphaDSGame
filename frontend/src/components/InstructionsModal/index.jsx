import PropTypes from 'prop-types'
import React from 'react'

import { connect } from 'react-redux'

import Modal from '../UI/Modal';

import StartGameSection from './components/StartGameSection';
import ObjectivesSection from './components/ObjectivesSection';
import BuyAndPlaceComponents from './components/BuyAndPlaceComponents';
import TradeCardsSection from './components/TradeCardsSection';

import './styles.scss';

export const INSTRUCTIONS_TABS = {
  START_GAME: 'startGame',
  OBJECTIVE: 'objective',
  BUY_COMPONENTS: 'buyComponents',
  TRADE_CARDS: 'tradeCards',
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
              key={sectionId}
              href={`#${sectionId}`}
              className='sectionLink me-3'
            >
              {dictionary[sectionId]}
            </a>
          ))}
        </div>
        <div className='sectionContent'>
            <StartGameSection className='mb-4'/>
            <ObjectivesSection className='mb-4'/>
            <BuyAndPlaceComponents className='mb-4'/>
            <TradeCardsSection className='mb-4' />
        </div>
      </div>
    </Modal>
  )
}

InstructionsModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,

  dictionary: PropTypes.object.isRequired,
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