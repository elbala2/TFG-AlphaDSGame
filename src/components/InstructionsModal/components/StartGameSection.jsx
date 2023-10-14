import PropTypes from 'prop-types'
import React from 'react'

import { connect } from 'react-redux'

import { INSTRUCTIONS_TABS } from '..'

import HomePageIMG from '../../../resources/instructionsImgs/HomePage.png';
import HomePlayerInPutsIMG from '../../../resources/instructionsImgs/HomePlayerInPuts.png';
import MainPageIMG from '../../../resources/instructionsImgs/MainPage.png';

export const StartGameSection = ({
  className,
  dictionary,
}) => {
  return (
    <section className={className}>
      <h4 id={INSTRUCTIONS_TABS.START_GAME} className=''>{dictionary[INSTRUCTIONS_TABS.START_GAME]}</h4>
      <hr className='mt-0' />
      <div className='text-center'>
        <img
          src={HomePageIMG}
          className='pageImg mb-3'
          alt='homePage'
        />
      </div>
      <p className='px-4'>{dictionary.homPageExplanation}</p>
      <div className='d-flex align-items-center px-4'>
        <img
          src={HomePlayerInPutsIMG}
          className='mediumImg'
          alt='homePagePlayerInputs'
        />
        <p className='ps-4'>
          {dictionary.homePlayerInputsExplanation}
        </p>
      </div>
      <p className='px-4'>{dictionary.homPageTransitionExplanation}</p>
      <div className='text-center'>
        <img
          src={MainPageIMG}
          className='pageImg mb-3'
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