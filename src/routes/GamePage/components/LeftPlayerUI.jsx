import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import { setCardConfig, setState } from '../../../stores/gameStore/actions';
import { getBotAction } from '../../../utils/ApiConf';

import Button from '../../../components/UI/Button';
import Market from './Market/Market';

import Cards from '../../../components/Cards';
import { bindActionCreators } from 'redux';

import styles from '../Main.module.scss';
import { useRef } from 'react';
import Tooltip from '../../../components/UI/Tooltip';

function LeftPlayerUI({
  playerIndex,
  handleNextPlayer,
  handleTrade,
  player,
  whereIsPilar,
  setCardConfig,
  setState,
  dictionary,
}) {
  const { id } = useParams();

  const alertRef = useRef()

  function handleBotNextAction() {
    getBotAction(id).then(res => {
      if (res.action === 'trade') {
        setCardConfig(res.cardConfig)
      } else {
        setState(res);
      }
    })
  };

  const isBot = player?.type === 1;

  return (
    <div className={`${styles.halfCard} col-lg-6`}>
      <div className={styles.header}>
        <p className='h2 my-0 me-3'>{player?.name}</p>
        {(isBot || whereIsPilar === playerIndex) ? (
          <div className='d-flex align-items-center'>
            {whereIsPilar === playerIndex && (
              <>
                <div className='alertCircle shadow bg-warning me-3' ref={alertRef}>
                  <svg className='text-white' stroke-width={2} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" height={24} width={24}>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                </div>
                <Tooltip parentRef={alertRef} className='px-3 py-2'>
                  {dictionary.dataInWay}
                </Tooltip>
              </>
            )}
            <Button
              onClick={handleBotNextAction}
            >
              {dictionary.nextAction}
            </Button>
          </div>
        ) : (
          <div>
            <Button
              className='mx-2'
              onClick={() => handleTrade()}
            >
              {dictionary.trade}
            </Button>
            <Button
              variants='secondary'
              onClick={() => handleNextPlayer()}
            >
              {dictionary.endTurn}
            </Button>
          </div>
        )}
      </div>
      <Market />
      <div className='p-4'>
        <Cards
          playerIndex={playerIndex}
          descartable
          disabled={isBot || playerIndex === whereIsPilar}
        />
      </div>
    </div>
  )
}

LeftPlayerUI.propTypes = {}

function stateToProps(state, { playerIndex }) {
  return {
    player: state.game.players[playerIndex],
    whereIsPilar: state.game.whereIsPilar,
    dictionary: {
      ...state.lang.dictionary.leftUI,
      ...state.lang.dictionary.utils,
    }
  };
}

function dispatchToProps(dispatch) {
  return {
    setCardConfig: bindActionCreators(setCardConfig, dispatch),
    setState: bindActionCreators(setState, dispatch),
  };
}

export default connect(stateToProps, dispatchToProps)(LeftPlayerUI);
