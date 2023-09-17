import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setState, } from '../../Store/actions';
import { GetGame, StartGame } from '../../utils/ApiConf';

import NexPlayerModal from './components/NexPlayerModal';
import TradeBotModal from './components/TradeBotModal';
import SuccessModal from './components/SuccessModal';

import PlayerUI from './components/PlayerUI';
import HeaderAndFooter from '../../components/UI/Header&Footer';

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
