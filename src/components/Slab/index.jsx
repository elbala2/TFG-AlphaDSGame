import React, { useEffect, useRef, useState } from 'react'

import { isEmpty, min, uniqueId } from 'lodash'

import Tooltip from '../UI/Tooltip';
import { getSlabImg } from '../../utils/GetSlabImg';

import styles from './slab.module.scss'

import { playerColors } from '../../constants';
import { connect } from 'react-redux';

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
  const [uId] = useState(uniqueId())

  const lineWPadding = (width - (space * (linesNumber - 1)) - (lineWidth * (linesNumber - 1))) / 2;
  const lineHPadding = (height - (space * (linesNumber - 1)) - (lineWidth * (linesNumber - 1))) / 2;
  
  const lines= [];
  
  for (let i = 0; i < linesNumber; i += 1) {
    const step = ((space * i) + (lineWidth * i));
    const id = uId + i;
    lines.push(
      <React.Fragment key={id}>
        {!!links[0] && (
          <line
            key={`${id}_1`}
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
            key={`${id}_2`}
            x1={lineWPadding - (lineWidth / 2)}
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
            key={`${id}_3`}
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
            key={`${id}_4`}
            x1={0}
            y1={height - (step + lineHPadding)}
            x2={width - lineWPadding + (lineWidth / 2)}
            y2={height - (step + lineHPadding)}
            style={{
              stroke: lineColor,
              strokeWidth: lineWidth,
            }}
          />
        )}
      </React.Fragment>
    )
  }

  let rectangle = <></>;
  if (rect) {

    let rectBorderSize = lineWidth * 2;
    
    let rectPaddingW = lineWPadding / 2; 
    let rectPaddingH = lineHPadding / 2;
    
    
    if (rect.isBig) {
      rectBorderSize = lineWidth * 1.3;
      
      const minPadding = min([rectPaddingW, rectPaddingH]);
      rectPaddingW = rectPaddingW - (minPadding - rectBorderSize);
      rectPaddingH = rectPaddingH - (minPadding - rectBorderSize);
      // rectSize = min([width - ((rectPaddingW + rectBorderSize) * 2), height - ((rectPaddingH + rectBorderSize) * 2)])
    }
    
    const rectSize = min([width - ((rectPaddingW + rectBorderSize) * 2), height - ((rectPaddingH + rectBorderSize) * 2)]) 

    if (rectSize > 0) {
      rectangle = (
        <>
          <rect
            width={rectSize + (rectBorderSize * 2)}
            height={rectSize + (rectBorderSize * 2)}
            rx={lineWidth}
            
            x={rectPaddingW}
            y={rectPaddingH}
            />
          <rect
            width={rectSize}
            height={rectSize}
            rx={lineWidth}
            fill={rect.color}
  
            x={rectPaddingW + rectBorderSize}
            y={rectPaddingH + rectBorderSize}
            z={2}
          />
          {rect.image && (
            <image
              href={rect.image}
              width={rectSize}
              height={rectSize}
              x={rectPaddingW + rectBorderSize}
              y={rectPaddingH + rectBorderSize}
            />
          )}
        </>
      );
    }
  }

  return (
      <svg {...other} viewBox={`0 0 ${width} ${height}`} className='position-absolute' preserveAspectRatio="">
        {lines}
        {rectangle}
      </svg>
  )
}

export function Cable(props) {
  const [, setValue] = useState(0);

  const cableRef = useRef();
  
  const forceUpdate = () => {
    setValue(value => value + 1);
  }
  
  const { width, height } = cableRef.current?.getBoundingClientRect() ?? {};
  
  useEffect(forceUpdate, [width, height]);

  return (
    <div className='w-100 h-100 position-relative' ref={cableRef}>
      {cableRef.current && (
        <Links
          {...props}
          width={width}
          height={height}
        />
      )}
    </div>
  );
}

function Slab({
  slab,
  isWayPart,
  dictionary,
}) {
  const [, setValue] = useState(0);
  const slabRef = useRef();
  const descriptionRef = useRef();
  
  const forceUpdate = () => {
    setValue(value => value + 1);
  }
  
  const { width, height } = slabRef.current?.getBoundingClientRect() ?? {};
  
  useEffect(forceUpdate, [width, height, slab, isWayPart]);

  if (isEmpty(slab)) return '';

  const cableProps = {};

  cableProps.links = [...slab.links];
  for(let i = 0; i < slab.rotation; i += 1) {
    cableProps.links.splice(0, 0, cableProps.links.splice(-1, 1)[0]);
  }
  if (['GOLD', 'SILVER'].includes(slab.type)) cableProps.rect = { color: slab.type };
  if (playerColors.includes(slab.type.replace('Start_', ''))) {
    cableProps.rect = {
      isBig: true,
      color: slab.type.replace('Start_', ''),
      image: getSlabImg(slab),
    };
  }
  if (slab.isSpecial) {
    cableProps.rect = {
      isBig: true,
      color: slab.type,
    };
  }
  if (isWayPart) cableProps.lineColor = '#f5e83b'


  return (
    <div className='w-100 h-100 position-relative' ref={slabRef}>
      <Links
        width={width}
        height={height}
        {...cableProps}
      /> 
      {slab.isSpecial && slab.descriptionKey && (
        <>
          <div className={styles.extraInfoContainer}>
            <h5 className={styles.title}>
              {dictionary.titles[slab.title]}
            </h5>

            <p className={styles.description} ref={descriptionRef}>
              {dictionary.subTitles[slab.descriptionKey]}
            </p>
          </div>
          <Tooltip parentRef={descriptionRef} className='px-3 py-2'>
            {dictionary.subTitles[slab.descriptionKey]}
          </Tooltip>
        </>
      )}
    </div>
  )
}

Slab.propTypes = {}

function stateToProps(state) {
  return {
    dictionary: {
      ...state.lang.dictionary.specialSlabs,
      ...state.lang.dictionary.utils,
    },
  };
}

function dispatchToProps(dispatch) {
  return {
  };
}

export default connect(stateToProps, dispatchToProps)(Slab);