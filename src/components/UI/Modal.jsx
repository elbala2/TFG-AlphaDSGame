import React from 'react'
import PropTypes from 'prop-types'

import styles from './Styles/Modal.module.scss'
import Button from './Button'

function Modal({
  children,
  isOpen,
  onClose,
  title,
}) {
  if (!isOpen) return '';
  return (
    <div className={styles.back}>
      <div className={styles.content}>
        <div className='d-flex py-2'>
          <h4 className='flex-fill'>{title}</h4>
          <Button variants='secondary' className='p-0' onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{ height: '30px', width: '' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
        </div>
        <hr className='my-0' />
        <div>
          {children}
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  children: PropTypes.any.isRequired,
}

export default Modal
