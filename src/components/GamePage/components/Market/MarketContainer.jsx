import { useDispatch, useSelector } from 'react-redux';
import { getSlabImg } from "../../../../Store/GetSlabImg";

import styles from './Styles/MarketContainer.module.scss';
import { mover, rotar } from '../../../../Store/actions';

const canbebougth = (cards, costes, type, actualPlayer) => {
  const canbebougth = cards.filter(f => f.type[0] === 'Domain' ).length >= costes[0]
      && cards.filter(f => f.type[0] === 'Computer Science' ).length >= costes[1]
      && cards.filter(f => f.type[0] === 'Mathematics' ).length >= costes[2];
  
  switch(type) {
    case 'red':
      if (actualPlayer !== 0) return false;
      else return canbebougth;
    case 'green':
      if (actualPlayer !== 1) return false;
      else return canbebougth;
    case 'blue':
      if (actualPlayer !== 2) return false;
      else return canbebougth;
    case 'yellow':
      if (actualPlayer !== 3) return false;
      else return canbebougth;
    default:
      return canbebougth
  }
}

const MarketContainer = ({ index, slab, disabled }) => {
  const { target, actualPlayer, players } = useSelector(state => state);
  const { cards, hasBougth } = players[actualPlayer];
  const dispatch = useDispatch();

  const { rotation, costes, type } = slab;
  const canbuy = !hasBougth && canbebougth(cards, costes, type, actualPlayer) && !disabled;
  return (
    <div className={`${styles.marketContainer}`} key={index}>
      <div
        className={`${styles.slabContainer}`}
        canbebougth={`${canbuy}`}
      >
        <input
          alt={`img`}
          type='image'
          rotation={rotation}
          className={styles.slab}
          src={getSlabImg(slab)}
          draggable={canbuy && !disabled}

          onKeyUp={(keyEvent) => {
            if (keyEvent.key === 'r' && !disabled)
              dispatch(rotar(index));
          }}

          onDragEnd={ (result) => {
            if (target)
              dispatch(mover(index));
          }}
        />
      </div>
      <div className={`d-flex ${styles.MarketCostsContainer}`}>
        {costes.map((coste, type) => {
          // type 0 => blue, 1 => red, 2 => green 
          return (
            <p
              key={`c${type}`}
              type={type}
              className={styles.MarketCosts}
            >
              {coste}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default MarketContainer;