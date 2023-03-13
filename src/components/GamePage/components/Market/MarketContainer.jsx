import { useDispatch, useSelector } from 'react-redux';
import { getSlabImg } from '../../../../Store/GetSlabImg';

import { rotar } from '../../../../Store/actions';

import styles from './Styles/MarketContainer.module.scss';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import Button from '../../../UI/Button';

const canbebougth = (cards, costs, type, actualPlayer) => {
  const canbebougth =
    cards.filter((f) => f.type[0] === 'Domain').length >= costs[0] &&
    cards.filter((f) => f.type[0] === 'Computer Science').length >= costs[1] &&
    cards.filter((f) => f.type[0] === 'Mathematics').length >= costs[2];

  switch (type) {
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
      return canbebougth;
  }
};

const MarketContainer = ({ index, slab, disabled }) => {
  const { actualPlayer, players } = useSelector((state) => state);
  const { cards, hasBougth } = players[actualPlayer];
  const dispatch = useDispatch();

  const { rotation, costs, type } = slab;
  const canbuy = !hasBougth && canbebougth(cards, costs, type, actualPlayer) && !disabled;
  return (
    <div className={`${styles.marketContainer}`} key={index}>
      <div className={`${styles.slabContainer}`} canbebougth={`${canbuy}`} disabled={!canbuy}>
        <Button
          className={`${styles.bubble} ${styles.left}`}
          onClick={() => dispatch(rotar(index, 3))}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-6 6m0 0l-6-6m6 6V9a6 6 0 0112 0v3" />
          </svg>
        </Button>
        <Button
          className={`${styles.bubble} ${styles.right}`}
          onClick={() => dispatch(rotar(index, 1))}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" />
          </svg>
        </Button>
        <Droppable droppableId={`marketDrop_${index}`} isDropDisabled>
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <Draggable draggableId={String(index)} index={0} isDragDisabled={!canbuy}>
                {provided => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <img
                      alt='img'
                      rotation={rotation}
                      className={styles.slab}
                      draggable={false}
                      src={getSlabImg(slab)}
                    />
                  </div>
                )}
              </Draggable>
            </div>
          )}
        </Droppable>
      </div>
      <div className={`d-flex ${styles.MarketCostsContainer}`}>
        {costs.map((coste, type) => {
          // type 0 => blue, 1 => red, 2 => green
          return (
            <span key={`c${type}`} type={type} className={styles.MarketCosts}>
              {coste}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default MarketContainer;
