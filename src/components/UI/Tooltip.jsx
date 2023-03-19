import React from 'react'
import PropTypes from 'prop-types'

import Styles from './Styles/Tooltip.module.scss'

function Tooltip({
  title,
  children,
}) {
  return (
    <div className={Styles.container}>
      <div className={Styles.hidden}>{title}</div>
      {children}
    </div>
  )
}

Tooltip.propTypes = {
  title: PropTypes.any.isRequired,
  children: PropTypes.any.isRequired,
}

export default Tooltip
