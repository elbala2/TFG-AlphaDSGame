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
import DragAndDropProvider from '../../components/DragAndDropProvider';
import Modal from '../../components/UI/Modal';
import Loader from '../../components/UI/Loader';

const GamePage = ({
  actualPlayer,
  setState,
  hasRisk,
  dictionary,
  gameId,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nextPlayerModalOpen, setNextPlayerModalOpen] = useState(false);
  const [previousPlayerIndex, setPreviousPlayerIndex] = useState(actualPlayer);
  const [openRiskInfo, setOpenRiskInfo] = useState(true);

  useEffect(() => {
    setOpenRiskInfo(false);
  }, [hasRisk])

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
    <DragAndDropProvider>
      <HeaderAndFooter>
        {onNextPlayer && previousPlayerIndex >= 0 && (
          <PlayerUI
            playerIndex={previousPlayerIndex}
            handleNextPlayer={() => setNextPlayerModalOpen(true)}
            className='playerOut'
          />
        )}
        <PlayerUI
          playerIndex={actualPlayer}
          handleNextPlayer={() => setNextPlayerModalOpen(true)}
          className={onNextPlayer ? 'playerIn' : ''}
        />

      <Modal
        isOpen={openRiskInfo && !!hasRisk}
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
    </DragAndDropProvider>
  );
};

function stateToProps(state) {
  return {
    gameId: state.game.id,
    actualPlayer: state.game.actualPlayer,
    hasRisk: state.game.hasRisk,
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
