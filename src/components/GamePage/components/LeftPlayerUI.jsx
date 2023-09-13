import React from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setCardConfig, setState } from '../../../Store/actions';
import { getBotAction } from '../../../utils/ApiConf';

import Button from '../../UI/Button';
import Market from './Market/Market';
import Cartas from './Cards';

import styles from '../Main.module.scss';

function LeftPlayerUI({
  playerIndex,
  handleNextPlayer,
  handleTrade,
}) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    players,
    whereIsPilar,
  } = useSelector((state) => state);

  function handleBotNextAction() {
    getBotAction(id).then(res => {
      if (res.action === 'trade') {
        dispatch(setCardConfig(res.cardConfig))
      } else {
        dispatch(setState(res));
      }
    })
  };

  return (
    <div className={`pe-4 ${styles.halfCard}`}>
      <div className={styles.header}>
        <p className='h2 my-0 '>{players[playerIndex]?.name}</p>
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
        <Cartas actualPlayer={playerIndex} titleStyles={{ fontSize: 'medium' }} descartable/>
      </div>
    </div>
  )
}

LeftPlayerUI.propTypes = {}

export default LeftPlayerUI
