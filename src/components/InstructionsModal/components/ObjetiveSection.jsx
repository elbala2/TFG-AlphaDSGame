import PropTypes from 'prop-types'
import React from 'react'

import { connect } from 'react-redux'

import { INSTRUCTIONS_TABS } from '..'

import BoardObjetive from '../../../resources/instructionsImgs/boardObjetive.png';
import MainMissionImg from '../../../resources/instructionsImgs/MainMisionImg.png';

function ObjetiveSection({
  className,
  dictionary,
}) {
  return (
    <section className={className}>
      <h4 id={INSTRUCTIONS_TABS.OBJETIVE} className=''>{dictionary[INSTRUCTIONS_TABS.OBJETIVE]}</h4>
      <hr className='mt-0' />
      <div className='d-flex align-items-center px-4 mb-3'>
        <img
          src={MainMissionImg}
          className='scale-60 rounded-3'
          alt='MainMission'
        />
        <p className='ps-4'>
          {dictionary.mainMissionExplanation}
        </p>
      </div>
      <div className='d-flex align-items-center px-4 mb-3'>
        <p className='pe-4'>
          {dictionary.boardObjetiveExplanation}
        </p>
        <img
          src={BoardObjetive}
          className='scale-80 rounded-3'
          alt='BoardObjetive'
        />
      </div>
    </section>
  )
}

ObjetiveSection.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ObjetiveSection)