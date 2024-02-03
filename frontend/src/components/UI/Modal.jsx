import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import Button from './Button'

import styles from './Styles/Modal.module.scss'

function Modal({
  children,
  isOpen,
  onClose,
  title,
  fullScreen,
}) {
  if (!isOpen) return '';
  return ReactDOM.createPortal(
    <div className={styles.back} onClick={onClose}>
      <div
        className={`${styles.content} ${fullScreen ? styles.fullScreen : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='d-flex align-items-center p-2'>
          <h4 className='flex-fill ps-2 pt-1 m-0'>{title}</h4>
          <Button variants='secondary outlined' className='p-0 border-0' onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{ height: '30px', width: '' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
        </div>
        <hr className='my-0' />
        <div className={styles.childrenContainer}>
          {children}
        </div>
      </div>
    </div>,
    document.getElementById('modal'),
  )
}

Modal.propTypes = {
  children: PropTypes.any.isRequired,
}

export default Modal
