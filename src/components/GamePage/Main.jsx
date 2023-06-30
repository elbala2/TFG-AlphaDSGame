import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

import { mover, setState, setCardConfig } from '../../Store/actions';
import { getBotAction, GetGame, MoveSlab, StartGame } from '../../utils/ApiConf';

import NexPlayerModal from './components/NexPlayerModal';
import TradeBotModal from './components/TradeBotModal';
import SuccessModal from './components/SuccessModal';
import TradeModal from './components/TradeModal';
import Market from './components/Market/Market';
import Tablero from './components/Tablero';
import Cartas from './components/Cartas';
import Button from '../UI/Button';
import HeaderAndFooter from '../UI/Header&Footer';

import styles from './Main.module.scss';

const GamePage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    actualPlayer,
    players,
    id,
    normalMarket,
    specialMarket,
    whereIsPilar,
  } = useSelector((state) => state);

  const [nextPlayerModalOpen, setnextPlayerModalOpen] = useState(false);
  const [tradeModalOpen, setTradeModalOpen] = useState(false);

  useEffect(() => {
    if (params.id){
      GetGame(params.id).then((res) => {
        dispatch(setState(res))
      });
    } else {
      StartGame().then((res) => {
        navigate(`/Game/${res.id}`)
      });
    }
  }, [params, dispatch, id]);


  function handleBotNextAction() {
    getBotAction(id).then(res => {
      if (res.action === 'trade') {
        dispatch(setCardConfig(res.cardConfig))
      } else {
        console.log('new', res)
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
              {(players[actualPlayer]?.type === 1 || whereIsPilar === actualPlayer) ? (
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
