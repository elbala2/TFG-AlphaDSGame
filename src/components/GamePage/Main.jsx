import HeaderAndFooter from '../Header&Footer';
import Market from './components/Market/Market';
import Cartas from './components/Cartas';
import Tablero from './components/Tablero';
import TradeModal from './components/tradeModal';

import { useDispatch, useSelector } from 'react-redux';
import { mover, nextPlayer, setState, start } from '../../Store/actions';
import { useEffect, useState } from 'react';
import { DefaultButton, Modal } from '@fluentui/react';

import styles from './Main.module.scss';
import SuccessModal from './components/SuccessModal';
import { getBotAction, MoveSlab, NextTurn, StartGame } from '../../utils/ApiConf';
import { DragDropContext } from 'react-beautiful-dnd';

const GamePage = () => {
  const dispatch = useDispatch();
  const { actualPlayer, players, finished, id, normalMarket, specialMarket } = useSelector((state) => state);
  const state = useSelector((state) => state);
  const [nextPlayerModalOpen, setnextPlayerModalOpen] = useState(false);
  const [tradeModalOpen, settradeModalOpen] = useState(false);

  useEffect(() => {
    if (id === 0) {
      StartGame().then((res) => dispatch(start(res)));
    }
  }, [dispatch, id]);

  // console.log(state)

  const handleBotNextAction = () => {
    getBotAction().then(res => setState(res))
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
              <DefaultButton
                text='Bot Next Action'
                style={{padding: '17px', fontSize: 'large'}}
                className={styles.button}
                onClick={handleBotNextAction}
              />
              <DefaultButton
                text='Trade'
                style={{padding: '17px', fontSize: 'large'}}
                className={styles.button}
                onClick={() => settradeModalOpen((prevstate) => !prevstate)}
              />
              <DefaultButton
                text='Terminar Turno'
                className={styles.closebutton}
                style={{padding: '17px', fontSize: 'large'}}
                onClick={() => setnextPlayerModalOpen((prevstate) => !prevstate)}
              />
            </div>
            <hr />
            <Market />
            <div className={styles.cartsContainer}>
              <Cartas actualPlayer={actualPlayer} titleStyles={{ fontSize: 'medium' }} descartable/>
            </div>
          </div>
          <Tablero />
        </div>
        {tradeModalOpen && <TradeModal isOpen={tradeModalOpen} onClose={() => settradeModalOpen(prevstate => !prevstate)}/>}
        {finished === true && <SuccessModal />}
        <Modal
          isOpen={nextPlayerModalOpen}
          className={{ className: styles.backdrop }}
          containerClassName={styles.modal}
        >
          <h4>¿Esta seguro de terminar el turno?</h4>
          <hr/>
          <div className={styles.modalContainer}>
            <DefaultButton
              text='Terminar el turno'
              className={styles.button}
              style={{fontSize: 'x-large'}}
              onClick={() => {
                NextTurn(id).then((res) => {
                  dispatch(nextPlayer(res));
                })
                setnextPlayerModalOpen((prevstate) => !prevstate);
              }}
            />
            <DefaultButton
              text='Cerrar'
              className={styles.closebutton}
              style={{fontSize: 'x-large'}}
              onClick={() => setnextPlayerModalOpen((prevstate) => !prevstate)}
            />
          </div>
        </Modal>
      </DragDropContext>
    </HeaderAndFooter>
  );
};

export default GamePage;
