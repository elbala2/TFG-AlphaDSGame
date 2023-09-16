import React from 'react'
import PropTypes from 'prop-types'

function Cable({
  width = 28,
  heigth = 28,
  ...other
}) {

  const space = 2;
  const wDeplazamiento = (width - (space * 4) - (2 * 4)) / 2;
  const hDeplazamiento = (heigth - (space * 4) - (2 * 4)) / 2;
  const steps = (width - (space * 4)) / 4;

  const lines= [];
  
  for (let i = 0; i < 4; i += 1) {
    lines.push(
      <>
        <line
          x1={(steps * i) + space + wDeplazamiento}
          y1="0"
          x2={(steps * i) + space + wDeplazamiento}
          y2={heigth - ((steps * i) + space + hDeplazamiento) + 1}
          style={{
            stroke: '#d0bfc7',
            strokeWidth: 2,
          }}
        />

        <line
          x1={(steps * i) + space + wDeplazamiento}
          y1={heigth - ((steps * i) + space + hDeplazamiento)}
          x2={width}
          y2={heigth - ((steps * i) + space + hDeplazamiento)}
          style={{
            stroke: '#d0bfc7',
            strokeWidth: 2,
          }}
        />
      </>
    )
  }

  return (
    <svg {...other} viewBox={`0 0 ${width} ${heigth}`} preserveAspectRatio="slice">
      {lines}
    </svg>
  )
}

Cable.propTypes = {}

export default Cable
