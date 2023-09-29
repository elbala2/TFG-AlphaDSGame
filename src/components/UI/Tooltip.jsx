import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import PropTypes from 'prop-types'

function Tooltip({
  children,
  parentRef,
  ...other
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const elementRef = parentRef?.current;
    if (!elementRef) return;
    elementRef.onmouseenter = () => setShow(true); 
    elementRef.onmouseleave = () => setShow(false); 
    return () => {
      if (!elementRef) return;
      elementRef.onmouseenter = undefined; 
      elementRef.onmouseleave = undefined; 
    };
  }, [parentRef]);

  if (!parentRef?.current || !show) return '';

  const { top, left, width, height } = parentRef.current.getBoundingClientRect();

  return ReactDOM.createPortal(
    <div
      {...other}
      className={`bg-white rounded ${other.className ?? ''}`}
      style={{
        top: top + height,
        left: left + (width / 2),
        translate: '-50% 0%',
        position: 'absolute',
      }}
    >
      {children}
    </div>,
    document.getElementById('modal'),
  )
}

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  parentRef: PropTypes.any.isRequired,
}

export default Tooltip
