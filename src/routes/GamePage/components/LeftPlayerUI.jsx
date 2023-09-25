import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import { setCardConfig, setState } from '../../../stores/gameStore/actions';
import { getBotAction } from '../../../utils/ApiConf';

import Button from '../../../components/UI/Button';
import Market from './Market/Market';

import styles from '../Main.module.scss';
import Cards from '../../../components/Cards';
import { bindActionCreators } from 'redux';

function LeftPlayerUI({
  playerIndex,
  handleNextPlayer,
  handleTrade,
  players,
  whereIsPilar,
  setCardConfig,
  setState,
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
    <div className={`pe-4 ${styles.halfCard}`}>
      <div className={styles.header}>
        <p className='h2 my-0 me-3'>{players[playerIndex]?.name}</p>
        <div className='flex-fill' />
        {(players[playerIndex]?.type === 1 || whereIsPilar === playerIndex) ? (
          <>
            {whereIsPilar === playerIndex && <span className='me-3'>El dato esta en tu camino de datos, pierdes tu turno</span>}
            <Button
              onClick={handleBotNextAction}
            >
              Siguiente acción
            </Button>
          </>
        ) : (
          <>
            <Button
              className='mx-2'
              onClick={() => handleTrade()}
            >
              Negociar
            </Button>
            <Button
              variants='secondary'
              onClick={() => handleNextPlayer()}
            >
              Terminar Turno
            </Button>
          </>
        )}
      </div>
      <hr />
      <Market />
      <div className={styles.cartsContainer}>
        <Cards actualPlayer={playerIndex} titleStyles={{ fontSize: 'medium' }} descartable/>
      </div>
    </div>
  )
}

LeftPlayerUI.propTypes = {}

function stateToProps(state, { playerIndex }) {
  return {
    players: state.game.players,
    whereIsPilar: state.game.whereIsPilar,
  };
}

function dispatchToProps(dispatch) {
  return {
    setCardConfig: bindActionCreators(setCardConfig, dispatch),
    setState: bindActionCreators(setState, dispatch),
  };
}

export default connect(stateToProps, dispatchToProps)(LeftPlayerUI);