import { connect } from 'react-redux';

import { rotate } from '../../../../stores/gameStore/actions';

import { Draggable, Droppable } from 'react-beautiful-dnd';
import Button from '../../../../components/UI/Button';
import { bindActionCreators } from 'redux';
import Slab from '../../../../components/Slab';
import { playerColors } from '../../../../constants';


const canBeBought = (player, slab, needSelected = false) => {
  const canBeBought = !player.hasBought &&
    player.cards.filter((f) => f.type === 'domain'  && (!needSelected || f.selected)).length >= slab.costs[0] &&
    player.cards.filter((f) => f.type === 'compSci' && (!needSelected || f.selected)).length >= slab.costs[1] &&
    player.cards.filter((f) => f.type === 'math'    && (!needSelected || f.selected)).length >= slab.costs[2];

    if (playerColors.includes(slab.type)) return player.color === slab.type && canBeBought;
    return canBeBought;
};

const MarketContainer = ({
  index,
  slab,
  disabled,
  player,
  rotate,
}) => {
  const canBuy = canBeBought(player, slab) && !disabled;
  const canBuyWithSelected = canBeBought(player, slab, true) && !disabled;

  return (
    <div className='marketContainer' key={index}>
      <Droppable droppableId={`marketDrop_${index}`} isDropDisabled>
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <Draggable draggableId={String(index)} index={index} isDragDisabled={!canBuyWithSelected}>
              {provided => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className='slabContainer'
                  disabled={!canBuy}
                >
                  {!slab.isSpecial && (
                    <>
                      <Button
                        className='bubble left'
                        variants='outlined'
                        onClick={() => rotate(index, 3)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-6 6m0 0l-6-6m6 6V9a6 6 0 0112 0v3" />
                        </svg>
                      </Button>
                      <Button
                        className='bubble right'
                        variants='outlined'
                        onClick={() => rotate(index, 1)}
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
        {slab.costs.map((cost, type) => {
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

function stateToProps(state) {
  const player = state.game.players[state.game.actualPlayer];
  return {
    player,
  };
}

function dispatchToProps(dispatch) {
  return {
    rotate: bindActionCreators(rotate, dispatch),
  };
}

export default connect(stateToProps, dispatchToProps)(MarketContainer);
