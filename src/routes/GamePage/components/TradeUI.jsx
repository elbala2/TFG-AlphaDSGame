import PropTypes from 'prop-types'
import React, { useState } from 'react'

import { connect } from 'react-redux'

import Button from '../../../components/UI/Button';
import Cards from '../../../components/Cards';

import mainStyles from '../Main.module.scss';
import tradeStyles from './Styles/tradeModal.module.scss';
import styles from './Styles/rigthUI.module.scss';


function TradeUI({
  onCancel,
  tradePlayers,
}) {
  const [selectedPlayer, setSelectedPlayer] = useState();
  return (
    <div className={`ps-4 ${mainStyles.halfCard}`}>
      <div className={`${styles.boardUI}`}>
        <h3 className='p-3'>Trade</h3>
        <div className={`${tradeStyles.tradePlayerBoxContainer}`}>
          {tradePlayers.map((player) => {
            return (
              <div
                className={`p-3 rounded-4 shadow
                  ${tradeStyles.tradePlayerBox}
                  ${mainStyles.playerBox}
                  ${selectedPlayer?.id === player.id ? tradeStyles.tradePlayerBoxSelected : ''}
                `}
                type={player.color}
                onClick={(e) => {
                  if (selectedPlayer?.id === player.id) return;
                  console.log(player, 'selected')
                  setSelectedPlayer(player);
                  e.stopPropagation();
                }}
              >
                <h2>{player.name}</h2>
                <div className='p-3 flex-fill'>
                  <Cards
                    playerIndex={player.id}
                    titleStyles={{ fontSize: 'smaller' }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className='d-flex w-100 p-3'>
          <div className='flex-fill' />
          <Button
            variants='secondary'
            className='me-3'
            onClick={() => onCancel()}
          >
            Cancel
          </Button>
          <Button>
            Trade
          </Button>
        </div>
      </div>
    </div>
  )
}

TradeUI.propTypes = {
}

function mapStateToProps(state, { playerIndex }) {
  return ({
    tradePlayers: state.game.players.filter((p, i) => i !== playerIndex),
  });
}

function mapDispatchToProps(dispatch) {

}

export default connect(mapStateToProps, mapDispatchToProps)(TradeUI)