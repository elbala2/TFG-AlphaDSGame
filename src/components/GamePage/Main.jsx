import HeaderAndFooter from '../UI/Header&Footer';
import Market from './components/Market/Market';
import Cartas from './components/Cartas';
import Tablero from './components/Tablero';
import TradeModal from './components/tradeModal';

import { useDispatch, useSelector } from 'react-redux';
import { mover, nextPlayer, setState, start } from '../../Store/actions';
import { useEffect, useState } from 'react';
import Button from '../UI/Button';
import Modal from '../UI/Modal';

import styles from './Main.module.scss';
import SuccessModal from './components/SuccessModal';
import { getBotAction, MoveSlab, NextTurn, StartGame } from '../../utils/ApiConf';
import { DragDropContext } from 'react-beautiful-dnd';

const GamePage = () => {
  const dispatch = useDispatch();
  const { actualPlayer, players, finished, id, normalMarket, specialMarket } = useSelector((state) => state);
  const state = useSelector((state) => state);
  const [nextPlayerModalOpen, setnextPlayerModalOpen] = useState(false);
  const [tradeModalOpen, setTradeModalOpen] = useState(false);

  useEffect(() => {
    if (id === 0) {
      StartGame().then((res) => dispatch(start(res)));
    }
  }, [dispatch, id]);


  function handleBotNextAction() {
    getBotAction(id).then(res => {
      console.log('prev', JSON.parse(JSON.stringify(state)))
      console.log('new', res)
      dispatch(setState(res));
    })
  };

  function handlerNextTurnAction() {
    NextTurn(id).then(res => dispatch(nextPlayer(res)))
    setnextPlayerModalOpen((prevstate) => !prevstate);
  }

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
              {players[actualPlayer]?.type === 1 && (
                <Button
                  onClick={handleBotNextAction}
                >
                  Bot Next Action
                </Button>
              )}
              {/* {players[actualPlayer]?.type === 0 && ( */}
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
              {/* )} */}
            </div>
            <hr />
            <Market />
            <div className={styles.cartsContainer}>
              <Cartas actualPlayer={actualPlayer} titleStyles={{ fontSize: 'medium' }} descartable/>
            </div>
          </div>
          <Tablero />
        </div>
        {tradeModalOpen && <TradeModal isOpen={tradeModalOpen} onClose={() => setTradeModalOpen(prevstate => !prevstate)}/>}
        {finished === true && <SuccessModal />}
        <Modal
          isOpen={nextPlayerModalOpen}
          title='¿Esta seguro de terminar el turno?'
          onClose={() => setnextPlayerModalOpen((prevstate) => !prevstate)}
        >
          <div className={styles.modalContainer}>
            <Button
              className='mx-2'
              variants='secondary outlined'
              onClick={() => setnextPlayerModalOpen((prevstate) => !prevstate)}
            >
              Cerrar
            </Button>
            <Button
              variants='secondary'
              onClick={handlerNextTurnAction}
            >
              Terminar el turno
            </Button>
          </div>
        </Modal>
      </DragDropContext>
    </HeaderAndFooter>
  );
};

export default GamePage;
