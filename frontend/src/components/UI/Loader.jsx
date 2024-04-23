import React from 'react'
import PropTypes from 'prop-types'

import Styles from './Styles/Loader.module.scss'

function Loader({
  className = '',
}) {
  return (
    <div className={className}>
      <svg xmlns="http://www.w3.org/2000/svg" className={Styles.loader} width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M12 3a9 9 0 1 0 9 9"></path>
      </svg>
    </div>
  )
}

Loader.propTypes = {
  className: PropTypes.string,
}

export default Loader
