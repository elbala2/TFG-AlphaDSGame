import { useDispatch, useSelector } from 'react-redux';
import { getSlabImg } from "../../../../Store/GetSlabImg";

import { mover, rotar } from '../../../../Store/actions';
import { MoveSlab } from '../../../../utils/ApiConf';

import { Icon } from '@fluentui/react';


import styles from './Styles/MarketContainer.module.scss';

const canbebougth = (cards, costs, type, actualPlayer) => {
  const canbebougth = cards.filter(f => f.type[0] === 'Domain' ).length >= costs[0]
      && cards.filter(f => f.type[0] === 'Computer Science' ).length >= costs[1]
      && cards.filter(f => f.type[0] === 'Mathematics' ).length >= costs[2];
      
  switch(type) {
    case 'RED':
      if (actualPlayer !== 0) return false;
      else return canbebougth;
    case 'GREEN':
      if (actualPlayer !== 1) return false;
      else return canbebougth;
    case 'BLUE':
      if (actualPlayer !== 2) return false;
      else return canbebougth;
    case 'YELLOW':
      if (actualPlayer !== 3) return false;
      else return canbebougth;
    default:
      return canbebougth
  }
}

const MarketContainer = ({ index, slab, disabled }) => {
  const { target, actualPlayer, players, id } = useSelector(state => state);
  const { cards, hasBougth } = players[actualPlayer];
  const dispatch = useDispatch();

  const { rotation, costs, type } = slab;
  console.log(players[actualPlayer]);
  const canbuy = !hasBougth && canbebougth(cards, costs, type, actualPlayer) && !disabled;
  return (
    <div className={`${styles.marketContainer}`} key={index}>
      <div
        className={`${styles.slabContainer}`}
        canbebougth={`${canbuy}`}
      >
        <div className={`${styles.bubble} ${styles.left}`}>
          <Icon name='ChevronLeft' />
        </div>
        <div className={`${styles.bubble} ${styles.right}`}>
          <Icon name='ChevronRight'  />
        </div>
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
              MoveSlab(id, index, target, slab.rotation, cards.filter(f => f.selected))
                .then(res => {
                  console.log(res);
                  dispatch(mover(res));
                })
          }}
        />
      </div>
      <div className={`d-flex ${styles.MarketCostsContainer}`}>
        {costs.map((coste, type) => {
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