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
  const [previousPlayerIndex, setPreviousPlayerIndex] = useState(actualPlayer);

  useEffect(() => {
    setTimeout(() => setPreviousPlayerIndex(actualPlayer), 500)
  }, [actualPlayer])

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
  
  
  const onNextPlayer = previousPlayerIndex !== actualPlayer; 

  return (
    <HeaderAndFooter>
      {onNextPlayer && (
        <PlayerUI
          playerIndex={previousPlayerIndex}
          handleNextPlayer={() => setnextPlayerModalOpen(true)}
          className='playerOut'
        />
      )}
      <PlayerUI
        playerIndex={actualPlayer}
        handleNextPlayer={() => setnextPlayerModalOpen(true)}
        className={onNextPlayer ? 'playerIn' : ''}
      />

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
