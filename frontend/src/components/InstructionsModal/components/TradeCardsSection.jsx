import PropTypes from 'prop-types'
import React from 'react'

import { connect } from 'react-redux'

import { INSTRUCTIONS_TABS } from '..'

import TradeUIIMG from '../../../resources/instructionsImgs/TradeUI.png'

function TradeCardsSection({
  className,
  dictionary,
}) {
  return (
    <section className={className}>
      <h4 id={INSTRUCTIONS_TABS.TRADE_CARDS} className=''>{dictionary[INSTRUCTIONS_TABS.TRADE_CARDS]}</h4>
      <hr className='mt-0' />
      <div className='text-center'>
        <img
          src={TradeUIIMG}
          className='scale-100 rounded-3 mb-3'
          alt='TradeUIIMG'
        />
      </div>
      <p>
        {dictionary.tradeExplanation}
      </p>
    </section>
  )
}

TradeCardsSection.propTypes = {
  className: PropTypes.string.isRequired,
  dictionary: PropTypes.string.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(TradeCardsSection)