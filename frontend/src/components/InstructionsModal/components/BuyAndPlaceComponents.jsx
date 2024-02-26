import React from 'react'

import { connect } from 'react-redux'

import MarketExampleIMG from '../../../resources/instructionsImgs/MarketExample.png';
import SpecialComponentsIMG from '../../../resources/instructionsImgs/SpecialComponents.png';
import MainComponentsIMG from '../../../resources/instructionsImgs/MainComponents.png';
import RiskIMG from '../../../resources/instructionsImgs/Risk.png';
import CardsIMG from '../../../resources/instructionsImgs/Cards.png';
import PlacingComponentIMG from '../../../resources/instructionsImgs/UI placing component.png';
import PlacingComponentFinishIMG from '../../../resources/instructionsImgs/UI placing component finish.png';

import { INSTRUCTIONS_TABS } from '..'

function BuyAndPlaceComponents({
  className,
  dictionary,
}) {
  return (
    <section className={className}>
      <h4 id={INSTRUCTIONS_TABS.BUY_COMPONENTS} className=''>{dictionary[INSTRUCTIONS_TABS.BUY_COMPONENTS]}</h4>
      <hr className='mt-0' />
      <div className='text-center'>
        <img
          src={MarketExampleIMG}
          className='scale-80 rounded-3 mb-3'
          alt='MarketExampleIMG'
        />
      </div>
      <p className='px-4 mb-3'>
        {dictionary.marketExplanation}
      </p>
      <div className='d-flex align-items-center w-100 px-4 mb-3'>
        <img
          src={MainComponentsIMG}
          className='scale-20 rounded'
          alt='MainComponentsIMG'
        />
        <p className='ps-4'>
          {dictionary.normalComponentExplanation}
        </p>
      </div>
      <div className='d-flex align-items-center w-100 px-4 mb-3'>
        <p className='pe-4'>
          {dictionary.specialComponentExplanation}
        </p>
        <img
          src={SpecialComponentsIMG}
          className='scale-20 rounded-3'
          alt='SpecialComponentsIMG'
        />
      </div>
      <div className='d-flex align-items-center w-100 px-4 mb-3'>
        <img
          src={RiskIMG}
          className='scale-30 rounded-3'
          alt='RiskIMG'
        />
        <p className='ps-4'>
          {dictionary.riskExplanation}
        </p>
      </div>
      <div className='text-center'>
        <img
          src={CardsIMG}
          className='scale-50 rounded-3 mb-3'
          alt='CardsIMG'
        />
      </div>
      <p className='px-4 mb-3'>
        {dictionary.cardsExplanation}
      </p>
      <div className='text-center'>
        <img
          src={PlacingComponentIMG}
          className='scale-70 rounded-3 mb-3'
          alt='PlacingComponentIMG'
        />
      </div>
      <p className='px-4 mb-3'>
        {dictionary.placingExplanation}
      </p>
      <div className='text-center'>
        <img
          src={PlacingComponentFinishIMG}
          className='scale-70 rounded-3 mb-3'
          alt='PlacingComponentFinishIMG'
        />
      </div>
    </section>
  )
}

BuyAndPlaceComponents.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(BuyAndPlaceComponents)