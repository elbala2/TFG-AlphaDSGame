import React, { useRef } from 'react'
import PropTypes from 'prop-types'

export function Cable({
  space = 7,
  linesNumber = 4,
  lineWidth = 7,
  links = [1, 1, 1, 1],
  width = 24,
  height = 24,
  ...other
}) {

  const wDeplazamiento = (width - (space * (linesNumber - 1)) - (lineWidth * linesNumber)) / 2;
  const hDeplazamiento = (height - (space * (linesNumber - 1)) - (lineWidth * linesNumber)) / 2;
  
  const lines= [];

  console.log(2, width, height)
  
  for (let i = 0; i < linesNumber; i += 1) {
    const step = ((space * i) + lineWidth * i);
    lines.push(
      <>
        {links[0] && (
          <line
            x1={step + wDeplazamiento}
            y1="0"
            x2={step + wDeplazamiento}
            y2={height - hDeplazamiento + (lineWidth / 2)}
            style={{
              stroke: '#d0bfc7',
              strokeWidth: lineWidth,
            }}
          />
        )}

        {links[1] && (
          <line
            x1={wDeplazamiento}
            y1={height - (step + hDeplazamiento)}
            x2={width}
            y2={height - (step + hDeplazamiento)}
            style={{
              stroke: '#d0bfc7',
              strokeWidth: lineWidth,
            }}
          />
        )}

        {links[2] && (
          <line
            x1={step + wDeplazamiento}
            y1={hDeplazamiento + (lineWidth / 2)}
            x2={step + wDeplazamiento}
            y2={height}
            style={{
              stroke: '#d0bfc7',
              strokeWidth: lineWidth,
            }}
          />
        )}

        {links[3] && (
          <line
            x1={0}
            y1={height - (step + hDeplazamiento)}
            x2={width}
            y2={height - (step + hDeplazamiento)}
            style={{
              stroke: '#d0bfc7',
              strokeWidth: lineWidth,
            }}
          />
        )}
      </>
    )
  }

  return (
      <svg {...other} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="">
        {lines}
      </svg>
  )
}

function CableContainer(props) {
  const ref = useRef();
  const { width, height } = ref.current?.getBoundingClientRect() ?? {};

  console.log(1, width, height)
  return (
    <div className='w-100 h-100' ref={ref}>
      {ref.current && (
        <Cable
          {...props}
          width={width}
          height={height}
        />
      )}
    </div>
  );
}

export default CableContainer
