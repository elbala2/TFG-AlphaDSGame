import { getSlabImg } from '../../../../Store/GetSlabImg';
import { mover, rotar } from '../../../../Store/actions';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Styles/SpecialContainer.module.scss';
import { Tooltip } from '@material-ui/core';

const canbebougth = (cartas, costes, type, actualplayer) => {
  const canbebougth =
    cartas.filter(f => f.type[0] === 'Domain').length >= costes[0] &&
    cartas.filter(f => f.type[0] === 'Computer Science').length >= costes[1] &&
    cartas.filter(f => f.type[0] === 'Mathematics').length >= costes[2];

  switch (type) {
    case 'red':
      if (actualplayer !== 0) return false;
      else return canbebougth;
    case 'green':
      if (actualplayer !== 1) return false;
      else return canbebougth;
    case 'blue':
      if (actualplayer !== 2) return false;
      else return canbebougth;
    case 'yellow':
      if (actualplayer !== 3) return false;
      else return canbebougth;
    default:
      return canbebougth;
  }
};

const SpecialContainer = props => {
  const { target, actualplayer, players } = useSelector(state => state);
  const { cartas, haComprado } = players[actualplayer];
  const dispatch = useDispatch();

  const { rotation, costes, type, title, description } = props.casilla;
  const canbuy = !haComprado && canbebougth(cartas, costes, type, actualplayer) && !props.disabled;
  return (
    <div className={`${styles.marketContainer}`} key={props.index}>
      <div className={`${styles.slabContainer}`} canbebougth={`${canbuy}`}>
        <h1 className={styles.title}>{title}</h1>
        <Tooltip title={<p className={styles.descriptionTooltip}>{description}</p>}>
          <p className={styles.description}>{description}</p>
        </Tooltip>
        <input
          alt={`img`}
          type='image'
          rotation={rotation}
          className={styles.slab}
          src={getSlabImg(props.casilla)}
          draggable={canbuy && !props.disabled}
          onKeyUp={keyEvent => {
            if (keyEvent.key === 'r' && !props.disabled) dispatch(rotar(props.index));
          }}
          onDragEnd={result => {
            if (target) dispatch(mover(props.index));
          }}
        />
      </div>
      <div className={`d-flex ${styles.MarketCostsContainer}`}>
        {costes.map((coste, type) => {
          // type 0 => blue, 1 => red, 2 => green
          return (
            <p key={`c${type}`} type={type} className={styles.MarketCosts}>
              {coste}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default SpecialContainer;
