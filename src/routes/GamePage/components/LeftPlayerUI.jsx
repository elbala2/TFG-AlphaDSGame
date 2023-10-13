import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import { setCardConfig, setState } from '../../../stores/gameStore/actions';
import { getBotAction } from '../../../utils/ApiConf';

import Button from '../../../components/UI/Button';
import Market from './Market/Market';

import Cards from '../../../components/Cards';
import { bindActionCreators } from 'redux';

import styles from '../Main.module.scss';

function LeftPlayerUI({
  playerIndex,
  handleNextPlayer,
  handleTrade,
  players,
  whereIsPilar,
  setCardConfig,
  setState,
  dictionary,
}) {
  const { id } = useParams();

  function handleBotNextAction() {
    getBotAction(id).then(res => {
      if (res.action === 'trade') {
        setCardConfig(res.cardConfig)
      } else {
        setState(res);
      }
    })
  };

  return (
    <div className={`${styles.halfCard} col-lg-6`}>
      <div className={styles.header}>
        <p className='h2 my-0 me-3'>{players[playerIndex]?.name}</p>
        <div className='flex-fill' />
        {(players[playerIndex]?.type === 1 || whereIsPilar === playerIndex) ? (
          <>
            {whereIsPilar === playerIndex && <span className='me-3'>{dictionary.leftUI}</span>}
            <Button
              onClick={handleBotNextAction}
            >
              {dictionary.nextAction}
            </Button>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
      <hr />
      <Market />
      <div className='p-4'>
        <Cards playerIndex={playerIndex} titleStyles={{ fontSize: 'medium' }} descartable/>
      </div>
    </div>
  )
}

LeftPlayerUI.propTypes = {}

function stateToProps(state, { playerIndex }) {
  return {
    players: state.game.players,
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
