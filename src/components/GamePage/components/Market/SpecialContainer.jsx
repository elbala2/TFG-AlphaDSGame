import { getSlabImg } from '../../../../Store/GetSlabImg';
import { mover, rotar } from '../../../../Store/actions';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Styles/SpecialContainer.module.scss';
import { Tooltip } from '@material-ui/core';
import { MoveSlab } from '../../../../utils/ApiConf';

const canbebougth = (cartas, costes, type, actualplayer) => {
  const canbebougth =
    cartas.filter(f => f.type[0] === 'Domain').length >= costes[0] &&
    cartas.filter(f => f.type[0] === 'Computer Science').length >= costes[1] &&
    cartas.filter(f => f.type[0] === 'Mathematics').length >= costes[2];

  switch (type) {
    case 'RED':
      if (actualplayer !== 0) return false;
      else return canbebougth;
    case 'GREEN':
      if (actualplayer !== 1) return false;
      else return canbebougth;
    case 'BLUE':
      if (actualplayer !== 2) return false;
      else return canbebougth;
    case 'YELLOW':
      if (actualplayer !== 3) return false;
      else return canbebougth;
    default:
      return canbebougth;
  }
};

const SpecialContainer = ({ disabled, slab, index }) => {
  const { target, actualPlayer, players, id } = useSelector(state => state);
  const { cards, hasBougth } = players[actualPlayer];
  const dispatch = useDispatch();

  const { rotation, costs, type, title, description } = slab;
  const canbuy = !hasBougth && canbebougth(cards, costs, type, actualPlayer) && !disabled;
  return (
    <div className={`${styles.marketContainer}`} key={index}>
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
          src={getSlabImg(slab)}
          draggable={canbuy && !disabled}
          onKeyUp={keyEvent => {
            if (keyEvent.key === 'r' && !disabled) dispatch(rotar(index));
          }}
          onDragEnd={result => {
            if (target) {
              MoveSlab(id, index, target, slab.rotation, cards.filter(f => f.selected))
                .then(res => {
                  console.log(res);
                  dispatch(mover(res));
                })
            }
          }}
        />
      </div>
      <div className={`d-flex ${styles.MarketCostsContainer}`}>
        {costs.map((coste, type) => {
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
