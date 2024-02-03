import PropTypes from 'prop-types'
import React from 'react'

import { connect } from 'react-redux'

import { getCardIMG } from '../../utils/GetSlabImg';

import Button from '../UI/Button';

import './styles.scss';

const Card = ({
  card,
  onDiscard,
  dictionary,
  className = '',
  ...other
}) => {
  return (
    <div
      {...other}
      id={card.id}
      type={card.type}
      className={`gameCard ${className}`}
      cardselected={card.selected ? '' : undefined}
    >
      {!other.disabled && onDiscard && (
        <Button
          variants='outlined secondary transparent'
          className='discardButton'
          onClick={onDiscard}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Button>
      )}
      <p className='title'>{dictionary.types[card.type]}</p>
      <img
        alt='card'
        draggable={false}
        className='cardimg'
        src={getCardIMG(card.subType)}
      />
      <p className='title'>{dictionary.subTypes[card.subType]}</p>
    </div>  )
}

Card.propTypes = {
}

function mapStateToProps(state) {
  return ({
    dictionary: {
      ...state.lang.dictionary.cards,
      ...state.lang.dictionary.utils
    },
  });
}

function mapDispatchToProps(dispatch) {
  return ({
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(Card)