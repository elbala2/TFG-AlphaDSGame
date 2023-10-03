import { connect } from 'react-redux';

import { rotar } from '../../../../stores/gameStore/actions';

import { Draggable, Droppable } from 'react-beautiful-dnd';
import Button from '../../../../components/UI/Button';
import { bindActionCreators } from 'redux';
import { useCallback } from 'react';
import Slab from '../../../../components/Slab';
import { BLUE, GREEN, RED, YELLOW, playerColors } from '../../../../constants';


const canbebougth = (cards, costs, type, playerColor) => {
  const canbebougth =
    cards.filter((f) => f.type === 'domain').length >= costs[0] &&
    cards.filter((f) => f.type === 'compSci').length >= costs[1] &&
    cards.filter((f) => f.type === 'math').length >= costs[2];

    if (playerColors.includes(type)) return playerColor === type && canbebougth;
    return canbebougth;
};

const MarketContainer = ({
  index,
  slab,
  disabled,
  cards,
  hasBougth,
  player,
  rotar,
}) => {
  const { costs, type, isSpecial } = slab;
  const canbuy = !hasBougth && canbebougth(cards, costs, type, player.color) && !disabled;
  const canbuyWithSelected = useCallback(() => {
    return !hasBougth && canbebougth(cards.filter(c => c.selected), costs, type, player.color) && !disabled;
  }, [hasBougth, cards, costs, disabled, type, player]) 
  return (
    <div className='marketContainer' key={index}>
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
                  {!isSpecial && (
                    <>
                      <Button
                        className='bubble left'
                        variants='outlined'
                        onClick={() => rotar(index, 3)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-6 6m0 0l-6-6m6 6V9a6 6 0 0112 0v3" />
                        </svg>
                      </Button>
                      <Button
                        className='bubble right'
                        variants='outlined'
                        onClick={() => rotar(index, 1)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" />
                        </svg>
                      </Button>
                    </>
                  )}
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
    player,
  };
}

function dispatchToProps(dispatch) {
  return {
    rotar: bindActionCreators(rotar, dispatch),
  };
}

export default connect(stateToProps, dispatchToProps)(MarketContainer);
