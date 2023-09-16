import React, { useRef } from 'react'
import PropTypes from 'prop-types'

function CableL({
  space = 7,
  linesNumber = 4,
  lineWidth = 7,
  ...other
}) {

  const ref = useRef();

  const { width, height } = ref.current?.getBoundingClientRect() ?? {};

  const wDeplazamiento = (width - (space * (linesNumber - 1)) - (lineWidth * linesNumber)) / 2;
  const hDeplazamiento = (height - (space * (linesNumber - 1)) - (lineWidth * linesNumber)) / 2;
  
  const lines= [];
  
  for (let i = 0; i < linesNumber; i += 1) {
    const step = ((space * i) + lineWidth * i);
    lines.push(
      <>
        <line
          x1={step + wDeplazamiento}
          y1="0"
          x2={step + wDeplazamiento}
          y2={height - (step + hDeplazamiento) + (lineWidth / 2)}
          style={{
            stroke: '#d0bfc7',
            strokeWidth: lineWidth,
          }}
        />

        <line
          x1={step + wDeplazamiento}
          y1={height - (step + hDeplazamiento)}
          x2={width}
          y2={height - (step + hDeplazamiento)}
          style={{
            stroke: '#d0bfc7',
            strokeWidth: lineWidth,
          }}
        />
      </>
    )
  }

  return (
    <div className='w-100 h-100' ref={ref}>
      <svg {...other} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="slice">
        {lines}
      </svg>
    </div>
  )
}

CableL.propTypes = {}

export default CableL
