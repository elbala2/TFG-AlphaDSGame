import { connect } from 'react-redux';

import { rotar } from '../../../../stores/gameStore/actions';

import { Draggable, Droppable } from 'react-beautiful-dnd';
import Button from '../../../../components/UI/Button';
import { bindActionCreators } from 'redux';
import { useCallback } from 'react';
import Slab from '../../../../components/Slab';
import { BLUE, GREEN, RED, YELLOW } from '../../../../constants';


const canbebougth = (cards, costs, type, actualplayer) => {
  const canbebougth =
    cards.filter((f) => f.type === 'domain').length >= costs[0] &&
    cards.filter((f) => f.type === 'compSci').length >= costs[1] &&
    cards.filter((f) => f.type === 'math').length >= costs[2];

    switch (type) {
      case RED:
        if (actualplayer !== 0) return false;
        else return canbebougth;
      case GREEN:
        if (actualplayer !== 1) return false;
        else return canbebougth;
      case BLUE:
        if (actualplayer !== 2) return false;
        else return canbebougth;
      case YELLOW:
        if (actualplayer !== 3) return false;
        else return canbebougth;
      default:
        return canbebougth;
    }
};

const MarketContainer = ({
  index,
  slab,
  disabled,
  cards,
  hasBougth,
  actualPlayer,
  rotar,
}) => {
  const { costs, type } = slab;
  const canbuy = !hasBougth && canbebougth(cards, costs, type, actualPlayer) && !disabled;
  const canbuyWithSelected = useCallback(() => {
    return !hasBougth && canbebougth(cards.filter(c => c.selected), costs, type, actualPlayer) && !disabled;
  }, [hasBougth, cards, costs, disabled, type, actualPlayer]) 
  return (
    <div className='marketContainer' key={index}>
      {/* <Button
        className={`${styles.bubble} ${styles.left}`}
        onClick={() => rotar(index, 3)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-6 6m0 0l-6-6m6 6V9a6 6 0 0112 0v3" />
        </svg>
      </Button>
      <Button
        className={`${styles.bubble} ${styles.right}`}
        onClick={() => rotar(index, 1)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" />
        </svg>
      </Button> */}
      <Droppable droppableId={`marketDrop_${index}`} isDropDisabled>
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <Draggable draggableId={String(index)} index={0} isDragDisabled={!canbuyWithSelected()}>
              {provided => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className='slabContainer'
                  canbebougth={`${canbuy}`}
                  disabled={!canbuy}
                >
                  <Slab slab={slab} />
                  {provided.placeholder}
                </div>
              )}
            </Draggable>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <div className='marketCostsContainer'>
        {costs.map((cost, type) => {
          // type 0 => blue, 1 => red, 2 => green
          return (
            <span key={`c${type}`} type={type} className='marketCosts'>
              {cost}
            </span>
          );
        })}
      </div>
    </div>
  );
};

function stateToProps(state, { playerIndex }) {
  const player = state.game.players[state.game.actualPlayer];
  return {
    cards: player.cards,
    hasBougth: player.hasBougth,
    actualPlayer: state.game.actualPlayer,
  };
}

function dispatchToProps(dispatch) {
  return {
    rotar: bindActionCreators(rotar, dispatch),
  };
}

export default connect(stateToProps, dispatchToProps)(MarketContainer);
