import { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';

import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import { GetGame, createGame } from '../../utils/ApiConf';
import { setState } from '../../stores/gameStore/actions';

import TradeBotModal from '../../components/TradeBotModal';

import PlayerUI from './components/PlayerUI';
import HeaderAndFooter from '../../components/HeaderAndFooter';
import NexPlayerModal from '../../components/NextPlayerModal';
import SuccessModal from '../../components/SuccessModal';
import PlayerProvider from '../../components/PlayerProvider';
import Modal from '../../components/UI/Modal';

const GamePage = ({
  actualPlayer,
  setState,
  riskNumber,
  dictionary,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nextPlayerModalOpen, setNextPlayerModalOpen] = useState(false);
  const [previousPlayerId, setPreviousPlayerId] = useState();
  const [openRiskInfo, setOpenRiskInfo] = useState(true);

  useEffect(() => {
    setOpenRiskInfo(false);
  }, [riskNumber])

  useEffect(() => {
    setTimeout(() => setPreviousPlayerId(actualPlayer), 500)
  }, [actualPlayer])

  useEffect(() => {
    if (id){
      GetGame(id).then((res) => {
        setState(res);
      });
    } else {
      createGame().then((res) => {
        navigate(`/Game/${res.id}`)
      });
    }
  }, [setState, id, navigate]);
  
  
  const onNextPlayer = previousPlayerId !== actualPlayer; 

  return (
    <HeaderAndFooter>
      {onNextPlayer && previousPlayerId && (
        <PlayerProvider playerId={previousPlayerId}>
          <PlayerUI
            handleNextPlayer={() => setNextPlayerModalOpen(true)}
            className='playerOut'
          />
        </PlayerProvider>
      )}
      <PlayerProvider playerId={actualPlayer}>
        <PlayerUI
          handleNextPlayer={() => setNextPlayerModalOpen(true)}
          className={onNextPlayer ? 'playerIn' : ''}
        />
      </PlayerProvider>

    <Modal
      isOpen={openRiskInfo && !!riskNumber}
      onClose={() => setOpenRiskInfo(false)}
      title={dictionary.importantInfo}
    >
      <p className='text-danger riskMsg'>{dictionary.riskMsg}</p>
    </Modal>
      <NexPlayerModal
        isOpen={nextPlayerModalOpen}
        onClose={() => setNextPlayerModalOpen(p => !p)}
      />
      <TradeBotModal />
      <SuccessModal />
    </HeaderAndFooter>
  );
};

function stateToProps(state) {
  return {
    gameId: state.game.id,
    actualPlayer: state.game.actualPlayer,
    riskNumber: state.game.riskNumber,
    dictionary: {
      ...state.lang.dictionary.market,
      ...state.lang.dictionary.utils,
    },
  };
}

function dispatchToProps(dispatch) {
  return {
    setState: bindActionCreators(setState, dispatch),
  };
}

export default connect(stateToProps, dispatchToProps)(GamePage);
