import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './Styles/Button.scss'
import Loader from './Loader'

const commonClasses = 'btn-normal'

const classes = {
  primary: 'primary',
  secondary: 'secondary',
  danger: 'danger',
  error: 'danger',
  outlined: 'btn-outlined',
}

function Button({
  children,
  className,
  variants,
  loading: forcedLoading,
  disabled: forcedDisabled,
  onClick,
  style,
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  async function clickHandler(event) {
    setLoading(true)
    try {
      await onClick()
    } catch (e) {
      console.log(e)
      setError(e)
      setTimeout(() => setError(false), 1000)
    }
    setLoading(false)
  }

  function getClassName() {
    const res = variants?.trim().split(/ |,/).map((variant) => classes[variant.toLowerCase()] || '') || [classes.primary]
    res.push(commonClasses, className)
    if (error) res.push(classes.error)
    return res.join(' ')
  }

  return (
    <>
      <button
        type='button'
        className={getClassName()}
        disabled={forcedDisabled || forcedLoading  || loading}
        onClick={clickHandler}
        style={style}
      >
        {error  ? (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" height={24}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <span className='ms-2'>Error</span>
          </>
        ) : (
          <>
            {(forcedLoading || loading) && <Loader className='me-1' />}
            {children}
          </>
        )}
      </button>
    </>
  )
}

Button.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  variants: PropTypes.string,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object,
}

export default Button
