import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

function Links({
  space = 7,
  linesNumber = 4,
  lineWidth = 7,
  links = [1, 1, 1, 1],
  width = 24,
  height = 24,
  lineColor = '#d0bfc7',
  rect,
  ...other
}) {
  const wDeplazamiento = (width - (space * (linesNumber - 1)) - (lineWidth * linesNumber)) / 2;
  const hDeplazamiento = (height - (space * (linesNumber - 1)) - (lineWidth * linesNumber)) / 2;
  
  const lines= [];
  
  for (let i = 0; i < linesNumber; i += 1) {
    const step = ((space * i) + lineWidth * i);
    lines.push(
      <>
        {!!links[0] && (
          <line
            x1={step + wDeplazamiento}
            y1="0"
            x2={step + wDeplazamiento}
            y2={height - hDeplazamiento + (lineWidth / 2)}
            style={{
              stroke: lineColor,
              strokeWidth: lineWidth,
            }}
          />
        )}

        {!!links[1] && (
          <line
            x1={wDeplazamiento}
            y1={height - (step + hDeplazamiento)}
            x2={width}
            y2={height - (step + hDeplazamiento)}
            style={{
              stroke: lineColor,
              strokeWidth: lineWidth,
            }}
          />
        )}

        {!!links[2] && (
          <line
            x1={step + wDeplazamiento}
            y1={hDeplazamiento + (lineWidth / 2)}
            x2={step + wDeplazamiento}
            y2={height}
            style={{
              stroke: lineColor,
              strokeWidth: lineWidth,
            }}
          />
        )}

        {!!links[3] && (
          <line
            x1={0}
            y1={height - (step + hDeplazamiento)}
            x2={width - wDeplazamiento - lineWidth}
            y2={height - (step + hDeplazamiento)}
            style={{
              stroke: lineColor,
              strokeWidth: lineWidth,
            }}
          />
        )}
      </>
    )
  }

  return (
      <svg {...other} viewBox={`0 0 ${width} ${height}`} className='position-absolute' preserveAspectRatio="">
        {lines}
        {rect && (
          <>
            <rect
              width={lineWidth * linesNumber + space * (linesNumber + 2)}
              height={lineWidth * linesNumber + space * (linesNumber + 2)}
              rx={lineWidth}

              x={wDeplazamiento - (space * 2)}
              y={hDeplazamiento - space}
            />
            <rect
              width={lineWidth * linesNumber + space * (linesNumber - 2)}
              height={lineWidth * linesNumber + space * (linesNumber - 2)}
              rx={lineWidth}
              fill={rect}

              x={wDeplazamiento}
              y={hDeplazamiento + space}
              z={2}
            />
          </>
        )}
      </svg>
  )
}

function Cable(props) {
  const [, setValue] = useState(0);
  const ref = useRef();
  
  const forceUpdate = () => {
    setValue(value => value + 1);
  }
  
  const { width, height } = ref.current?.getBoundingClientRect() ?? {};
  console.log(width, height)
  
  useEffect(forceUpdate, [width, height]);

  return (
    <div className='w-100 h-100 position-relative' ref={ref}>
      {ref.current && (
        <Links
          {...props}
          width={width}
          height={height}
        />
      )}
    </div>
  );
}

export default Cable
