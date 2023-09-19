import React from 'react'
import PropTypes from 'prop-types'

import { isEmpty } from 'lodash'

import Cable from '../Cable';
import Tooltip from '../UI/Tooltip';
import { getSlabImg } from '../../Store/GetSlabImg';

import styles from './slab.module.scss'

function Slab({
  slab,
  isWayPart,
}) {
  if (isEmpty(slab)) return '';

  const cableProps = {};

  cableProps.links = [...slab.links];
  for(let i = 0; i < slab.rotation; i += 1) {
    cableProps.links.splice(0, 0, cableProps.links.splice(-1, 1)[0]);
  }
  if (['GOLDEN', 'SILVER'].includes(slab.type)) cableProps.rect = slab.type;
  if (isWayPart) cableProps.lineColor = '#f5e83b'


  return !slab.isSpecial ? (
    <>
      {slab.type?.includes('Start') ? (
        <img
          className={styles.slab}
          rotation={slab.rotation}
          key={`img_${slab.id}`}
          id={`img_${slab.id}`}
          src={getSlabImg(slab)}
          alt={``}
          draggable={false}
          ishere={`${isWayPart}`}
        />
      ) : (
        <Cable
          {...cableProps}
        />
      )}
    </>
  ) : (
    <>
      <h1 className={styles.title}>{slab.title}</h1>
      <Tooltip
        title={(
          <p className={styles.descriptionTooltip}>
            {slab.description}
          </p>
        )}
      >
        <p className={styles.description}>{slab.description}</p>
      </Tooltip>
      <img
        className={styles.slab}
        key={`img_${slab.id}`}
        id={`img_${slab.id}`}
        src={getSlabImg(slab)}
        alt={``}
        ishere={`${isWayPart}`}
        draggable={false}
      />
    </>
  )
}

Slab.propTypes = {}

export default Slab
