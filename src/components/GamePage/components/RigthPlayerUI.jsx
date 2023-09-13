import React from 'react'
import PropTypes from 'prop-types'

import styles from '../Main.module.scss';
import Tablero from './Tablero';

function RigthPlayerUI({
  playerIndex,
}) {
  return (
    <div className={`ps-4 ${styles.halfCard}`}>
      <Tablero playerIndex={playerIndex} />
    </div>
  )
}

RigthPlayerUI.propTypes = {}

export default RigthPlayerUI
