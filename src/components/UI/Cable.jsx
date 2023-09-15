import React from 'react'
import PropTypes from 'prop-types'

function Cable({
  size = 28,
  ...other
}) {

  const space = 2;
  const steps = (size - (space * 4)) / 4;

  const lines= [];
  
  for (let i = 0; i < 4; i += 1) {
    lines.push(
      <line
        x1={(steps * i) + space}
        y1="0"
        x2={(steps * i) + space}
        y2={size}
        style={{
          stroke: '#d0bfc7',
          strokeWidth: 2,
        }}
      />
    )
  }

  return (
    <svg {...other} viewBox={`0 0 ${size} ${size}`} preserveAspectRatio="slice">
      {lines}
    </svg>
  )
}

Cable.propTypes = {}

export default Cable
