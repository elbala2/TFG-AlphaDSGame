import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

import { mover, setState } from '../../../Store/actions';
import { GetGame, MoveSlab, StartGame } from '../../../utils/ApiConf';

import TradeModal from './TradeModal';
import LeftPlayerUI from './LeftPlayerUI';

import styles from '../Main.module.scss';
import RigthUI from './RigthUI';

const PlayerUI = ({
  playerIndex,
  handleNextPlayer,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    players,
    normalMarket,
    specialMarket,
  } = useSelector((state) => state);

  const [tradeModalOpen, setTradeModalOpen] = useState(false);

  useEffect(() => {
    if (id){
      GetGame(id).then((res) => {
        dispatch(setState(res))
      });
    } else {
      StartGame().then((res) => {
        navigate(`/Game/${res.id}`)
      });
    }
  }, [dispatch, id, navigate]);

  return (
    <DragDropContext
      onDragEnd={({ draggableId, destination: { droppableId } }) => {
        const slabIndex = parseInt(draggableId);
        const target = droppableId.replace('boardDrop_', '').split('-').map(n => parseInt(n));
        const rotation = (slabIndex < 4 ? normalMarket[slabIndex] : specialMarket[slabIndex - 4]).rotation;
        const cards = players[playerIndex].cards.filter(c => c.selected);
        MoveSlab(
          id,
          slabIndex,
          target,
          rotation,
          cards,
        ).then((res) => {
          dispatch(mover(res));
        });
      }}
    >
      <div className={styles.mainCard} type={playerIndex}>
        <LeftPlayerUI
          playerIndex={playerIndex}
          handleNextPlayer={handleNextPlayer}
          handleTrade={() => setTradeModalOpen(prevstate => !prevstate)}
        />
        <RigthUI
          playerIndex={playerIndex}
        />
      </div>
      <TradeModal
        isOpen={tradeModalOpen}
        onClose={() => setTradeModalOpen(prevstate => !prevstate)}
      />
    </DragDropContext>
  );
};

export default PlayerUI;

