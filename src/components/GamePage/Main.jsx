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
import Cartas from './components/Cards';
import Button from '../UI/Button';
import HeaderAndFooter from '../UI/Header&Footer';

import styles from './Main.module.scss';
import PlayerUI from './components/PlayerUI';

const GamePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    actualPlayer,
  } = useSelector((state) => state);

  const [nextPlayerModalOpen, setnextPlayerModalOpen] = useState(false);

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
    <HeaderAndFooter>
      <PlayerUI playerIndex={actualPlayer} handleNextPlayer={() => setnextPlayerModalOpen(true)} />
      {/* <PlayerUI playerIndex={actualPlayer+1} handleNextPlayer={() => setnextPlayerModalOpen(true)} /> */}
      <NexPlayerModal
        isOpen={nextPlayerModalOpen}
        onClose={() => setnextPlayerModalOpen(prevstate => !prevstate)}
      />
      <TradeBotModal />
      <SuccessModal />
    </HeaderAndFooter>
  );
};

export default GamePage;
