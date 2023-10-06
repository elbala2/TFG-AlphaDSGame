import { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';

import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import { GetGame, StartGame } from '../../utils/ApiConf';
import { setState } from '../../stores/gameStore/actions';

import TradeBotModal from '../../components/TradeBotModal';

import PlayerUI from './components/PlayerUI';
import HeaderAndFooter from '../../components/UI/Header&Footer';
import NexPlayerModal from '../../components/NextPlayerModal';
import SuccessModal from '../../components/SuccessModal';

const GamePage = ({
  actualPlayer,
  setState,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nextPlayerModalOpen, setnextPlayerModalOpen] = useState(false);

  useEffect(() => {
    if (id){
      GetGame(id).then((res) => {
        setState(res);
      });
    } else {
      StartGame().then((res) => {
        navigate(`/Game/${res.id}`)
      });
    }
  }, [setState, id, navigate]);

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

function stateToProps(state) {
  console.log('🚀 ~ file: Main.jsx:53 ~ stateToProps ~ state:', state.game);
  return {
    actualPlayer: state.game.actualPlayer,
  };
}

function dispatchToProps(dispatch) {
  return {
    setState: bindActionCreators(setState, dispatch),
  };
}

export default connect(stateToProps, dispatchToProps)(GamePage);
