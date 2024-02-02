import PropTypes from 'prop-types'
import React from 'react'

import { connect } from 'react-redux'

import { INSTRUCTIONS_TABS } from '..'

import HomePageIMG from '../../../resources/instructionsImgs/HomePage.png';
import HomePlayerInPutsIMG from '../../../resources/instructionsImgs/HomePlayerInPuts.png';
import MainPageIMG from '../../../resources/instructionsImgs/MainPage.png';

function StartGameSection({
  className,
  dictionary,
}) {
  return (
    <section className={className}>
      <h4 id={INSTRUCTIONS_TABS.START_GAME} className=''>{dictionary[INSTRUCTIONS_TABS.START_GAME]}</h4>
      <hr className='mt-0' />
      <div className='text-center'>
        <img
          src={HomePageIMG}
          className='scale-100 rounded-3 mb-3'
          alt='homePage'
        />
      </div>
      <p className='px-4 mb-3'>{dictionary.homPageExplanation}</p>
      <div className='d-flex align-items-center px-4 mb-3'>
        <img
          src={HomePlayerInPutsIMG}
          className='scale-30 rounded-3'
          alt='homePagePlayerInputs'
        />
        <p className='ps-4'>
          {dictionary.homePlayerInputsExplanation}
        </p>
      </div>
      <p className='px-4 mb-3'>{dictionary.homPageTransitionExplanation}</p>
      <div className='text-center'>
        <img
          src={MainPageIMG}
          className='scale-100 rounded-3 mb-3'
          alt='mainPage'
        />
      </div>
      <p className='px-4'>{dictionary.mainPageStartExplanation}</p>
    </section>
  )
}

StartGameSection.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(StartGameSection)