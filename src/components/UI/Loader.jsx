import React from 'react'
import PropTypes from 'prop-types'

import Styles from './Styles/Loader.module.scss'

function Loader({
  className = '',
}) {
  return (
    <div className={className}>
      <span className={Styles.loader} />
    </div>
  )
}

Loader.propTypes = {
  className: PropTypes.string,
}

export default Loader
