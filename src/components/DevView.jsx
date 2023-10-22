import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import Cards from './Cards'
import Modal from './UI/Modal'
import Board from './Board';


export const DevView = ({
  players,
  actualPlayer,

  onClose,
}) => {
  return (
    <Modal
      isOpen
      onClose={onClose}
      fullScreen
    >
      <div className='overflow-auto h-100'>
        {players.map((player, index) => {
          return (
            <div className={`bgColor shadow`} id={player.id} key={player.id} type={player.color}>
              <h3 className='p-3'>{player.name}</h3>
              <div>
                <Board
                  playerIndex={index}
                />
              </div>
              <div className='px-3 pb-3'>
                <Cards
                  playerIndex={player.id}
                  className={index > 0 ? 'small' : 'medium'}
                  disabled={player.id !== actualPlayer}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Modal>
  )
}

DevView.propTypes = {
}

const mapStateToProps = (state) => ({
  players: [...state.game.players],
  actualPlayer: state.game.actualPlayer,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(DevView)