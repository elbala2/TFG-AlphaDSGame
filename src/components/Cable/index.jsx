import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { min } from 'mathjs';

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
  const lineWPadding = (width - (space * (linesNumber - 1)) - (lineWidth * linesNumber)) / 2;
  const lineHPadding = (height - (space * (linesNumber - 1)) - (lineWidth * linesNumber)) / 2;
  
  const lines= [];
  
  for (let i = 0; i < linesNumber; i += 1) {
    const step = ((space * i) + lineWidth * i);
    lines.push(
      <>
        {!!links[0] && (
          <line
            x1={step + lineWPadding}
            y1="0"
            x2={step + lineWPadding}
            y2={height - lineHPadding + (lineWidth / 2)}
            style={{
              stroke: lineColor,
              strokeWidth: lineWidth,
            }}
          />
        )}

        {!!links[1] && (
          <line
            x1={lineWPadding}
            y1={height - (step + lineHPadding)}
            x2={width}
            y2={height - (step + lineHPadding)}
            style={{
              stroke: lineColor,
              strokeWidth: lineWidth,
            }}
          />
        )}

        {!!links[2] && (
          <line
            x1={step + lineWPadding}
            y1={lineHPadding + (lineWidth / 2)}
            x2={step + lineWPadding}
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
            y1={height - (step + lineHPadding)}
            x2={width - lineWPadding - lineWidth}
            y2={height - (step + lineHPadding)}
            style={{
              stroke: lineColor,
              strokeWidth: lineWidth,
            }}
          />
        )}
      </>
    )
  }

  let rectangle = <></>;
  if (rect) {

    let rectBorderSize = lineWidth * 2;

    let rectPaddingW = lineWPadding; 
    let rectPaddingH = lineHPadding;

    const rectSize = min([width - (rectPaddingW * 2), height - (rectPaddingH * 2)])

    rectangle = (
      <>
        <rect
          width={rectSize + (rectBorderSize * 2)}
          height={rectSize + (rectBorderSize * 2)}
          rx={lineWidth}

          x={lineWPadding - rectBorderSize}
          y={lineHPadding - rectBorderSize}
        />
        <rect
          width={rectSize}
          height={rectSize}
          rx={lineWidth}
          fill={rect.color}

          x={lineWPadding}
          y={lineHPadding}
          z={2}
        />
      </>
    );
  }

  return (
      <svg {...other} viewBox={`0 0 ${width} ${height}`} className='position-absolute' preserveAspectRatio="">
        {lines}
        {rectangle}
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
          rect={{ color: 'gold' }}
        />
      )}
    </div>
  );
}

export default Cable
