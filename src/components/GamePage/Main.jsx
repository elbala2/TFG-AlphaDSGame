import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

import { mover, setState, setCardConfig, start } from '../../Store/actions';
import { getBotAction, MoveSlab, StartGame } from '../../utils/ApiConf';

import SuccessModal from './components/SuccessModal';
import HeaderAndFooter from '../UI/Header&Footer';
import TradeModal from './components/TradeModal';
import Market from './components/Market/Market';
import Tablero from './components/Tablero';
import Cartas from './components/Cartas';
import Button from '../UI/Button';

import styles from './Main.module.scss';
import NexPlayerModal from './components/NexPlayerModal';
import TradeBotModal from './components/TradeBotModal';

const GamePage = () => {
  const dispatch = useDispatch();
  const {
    actualPlayer,
    players,
    id,
    normalMarket,
    specialMarket,
    pos: { 2: specialPlayer },
  } = useSelector((state) => state);

  const [nextPlayerModalOpen, setnextPlayerModalOpen] = useState(false);
  const [tradeModalOpen, setTradeModalOpen] = useState(false);

  useEffect(() => {
    if (id === 0) {
      StartGame().then((res) => {
        console.log('new', res)
        dispatch(start(res))
      });
    }
  }, [dispatch, id]);


  function handleBotNextAction() {
    getBotAction(id).then(res => {
      if (res.action === 'trade') {
        dispatch(setCardConfig(res.cardConfig))
      } else {
        dispatch(setState(res));
      }
    })
  };

  return (
    <HeaderAndFooter>
      <DragDropContext
        onDragEnd={({ draggableId, destination: { droppableId } }) => {
          const slabIndex = parseInt(draggableId);
          const target = droppableId.replace('boardDrop_', '').split('-').map(n => parseInt(n));
          const rotation = (slabIndex < 4 ? normalMarket[slabIndex] : specialMarket[slabIndex - 4]).rotation;
          const cards = players[actualPlayer].cards.filter(c => c.selected);
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
        <div className={styles.mainCard} type={actualPlayer}>
          <div className={styles.leftcard}>
            <div className={styles.header}>
              <p className='h2 my-0 '>{players[actualPlayer]?.name}</p>
              <div className='flex-fill' />
              {(players[actualPlayer]?.type === 1 || specialPlayer === actualPlayer) ? (
                <Button
                  onClick={handleBotNextAction}
                >
                  Bot Next Action
                </Button>
              ) : (
                <>
                  <Button
                    className='mx-2'
                    onClick={() => setTradeModalOpen((prevstate) => !prevstate)}
                  >
                    Trade
                  </Button>
                  <Button
                    variants='secondary'
                    onClick={() => setnextPlayerModalOpen((prevstate) => !prevstate)}
                  >
                    Terminar Turno
                  </Button>
                </>
              )}
            </div>
            <hr />
            <Market />
            <div className={styles.cartsContainer}>
              <Cartas actualPlayer={actualPlayer} titleStyles={{ fontSize: 'medium' }} descartable/>
            </div>
          </div>
          <Tablero />
        </div>
        <TradeModal
          isOpen={tradeModalOpen}
          onClose={() => setTradeModalOpen(prevstate => !prevstate)}
        />
        <NexPlayerModal
          isOpen={nextPlayerModalOpen}
          onClose={() => setnextPlayerModalOpen(prevstate => !prevstate)}
        />
        <TradeBotModal />
        <SuccessModal />
      </DragDropContext>
    </HeaderAndFooter>
  );
};

export default GamePage;
