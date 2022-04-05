import { useDispatch, useSelector } from 'react-redux';
import { getSlabImg } from "../../../../Store/GetSlabImg";

import styles from './MarketContainer.module.scss';
import { mover, rotar } from '../../../../Store/actions';

const MarketContainer = (props) => {
  const { target, market, cartas } = useSelector(state => state);
  const dispatch = useDispatch();

  const casilla = props.index > 3 ? market.special.casillas[props.index-4] : market.normal.casillas[props.index];
  const { id, rotation, costes } = casilla;

  return (
    <div className={`${styles.marketContainer}`} key={`${id}`}>
      <div
        key={`slbc${id}`}
        className={`${styles.slabContainer}`}
        id={`drop_${id}`}
        canbebougth={`${cartas.filter(f => f.type[0] === 'Domain' ).length >= costes[0] 
          && cartas.filter(f => f.type[0] === 'Computer Science' ).length >= costes[1]
          && cartas.filter(f => f.type[0] === 'Mathematics' ).length >= costes[2]}`
        }
      >
        <input
          type='image'
          className={styles.slab}
          rotation={rotation}
          key={`img_${id}`}
          id={`img_${id}`}
          src={getSlabImg(casilla)}
          alt={``}
          draggable={
            cartas.filter(f => f.selected && f.type[0] === 'Domain' ).length >= costes[0] 
            && cartas.filter(f => f.selected && f.type[0] === 'Computer Science' ).length >= costes[1]
            && cartas.filter(f => f.selected && f.type[0] === 'Mathematics' ).length >= costes[2]
          }
          onKeyUp={(keyEvent) => {
            if (keyEvent.key === 'r')
              dispatch(rotar(casilla));
          }}

          onDragStart={(event) => {
            var img = new Image()
            img.id = 'draggedImg';
            img.src = getSlabImg(casilla)
            img.style.transform = "rotate(360deg)";
            event.dataTransfer.setDragImage(img, 1, 1);
          }}

          onDragEnd={ (result) => {
            if (target)
              dispatch(mover(casilla));
          }}
        />
      </div>
      <div className={`d-flex ${styles.MarketCostsContainer}`} key={`cc${id}`}>
        {costes.map((coste, type) => {
          // type 0 => blue, 1 => red, 2 => green 
          return (
            <div key={`c${type}_${id}`}> 
              <p
                id={`c${type}_${id}`}
                className={styles.MarketCosts}
                type={type}
              >
                {coste}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MarketContainer;