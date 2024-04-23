import React, { createContext } from 'react'

import { connect } from 'react-redux'
import { useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux'

import { DragDropContext } from 'react-beautiful-dnd';

import { mover } from '../../stores/gameStore/actions';
import { MoveSlab } from '../../utils/ApiConf';

export const PlayerContext = createContext({
  player: undefined,
});

const PlayerProvider = ({
  player,
  prevPlayer,
  hasConnectedWay,
  whereIsPilar,
  normalMarket,
  specialMarket,
  children,

  mover,
}) => {
  const { id } = useParams();
  // const [player, setPlayer] = useState(pPlayer)

  // useEffect(() => setPlayer(pPlayer), [pPlayer])

  if (!player) return '';

  return (
    <PlayerContext.Provider value={{ player: { ...player, hasConnectedWay }, prevPlayer }}>
      <DragDropContext
        onDragEnd={({ draggableId, destination }) => {
          if (
            whereIsPilar === player.id
            || !draggableId
            || !destination?.droppableId
          ) return;
          const { droppableId } = destination;
          const target = droppableId.replace(/.*_boardDrop_/g, '').split('-').map(n => parseInt(n));
          const slabId = draggableId.split('_')[2]
          const slab = normalMarket.find(s => s.id === slabId) ?? specialMarket.find(s => s.id === slabId);
          const cards = player.cards.filter(c => c.selected);
          MoveSlab(
            id,
            slab.id,
            target,
            slab.rotation,
            cards,
          ).then((res) => {
            mover(res);
          });
        }}
      >
        {children}
      </DragDropContext>
    </PlayerContext.Provider>
  );
};

function stateToProps(state, { playerId }) {
  const pIndex = state.game.players.findIndex(p => p.id === playerId);
  const pilarPlayerIndex = state.game.players.findIndex(p => p.id === state.game.whereIsPilar);
  return {
    player: state.game.players[pIndex] ?? {},
    prevPlayer: state.game.players[pIndex - 1] ?? state.game.players[state.game.players.length - 1],
    hasConnectedWay: pIndex < pilarPlayerIndex,
    whereIsPilar: state.game.whereIsPilar,
    normalMarket: state.game.normalMarket,
    specialMarket: state.game.specialMarket,
  };
}

function dispatchToProps(dispatch) {
  return {
    mover: bindActionCreators(mover, dispatch),
  };
}

export default connect(stateToProps, dispatchToProps)(PlayerProvider);