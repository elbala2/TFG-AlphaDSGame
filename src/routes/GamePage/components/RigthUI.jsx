import React from 'react'
import PropTypes from 'prop-types'

import { useSelector } from 'react-redux';

import mainStyles from '../Main.module.scss';
import styles from './Styles/rigthUI.module.scss';
import Board from '../../../components/Board';
import Cable from '../../../components/Cable';

function RigthUI({
  playerIndex,
}) {
  const {  start, board } = useSelector(state => ({
    start: state.start,
    pos: state.pos,
    board: state.players[playerIndex].board,
    way: state.players[playerIndex].way,
  }))
  
  return (
    <div className={`ps-4 ${mainStyles.halfCard}`}>
      <div className={`${styles.boardUI}`}>
        <div className={`${styles.boardHeader}`}>
          <div className='d-flex flex-fill'>
            <div className={`${styles.cableContainer}`}>
              <Cable
                links={[1, 0, 1, 0]}
                />
            </div>
            <div className='flex-fill'>
              <div className='p-5'>
                <h3><b>Misión</b></h3>
                <p>{board[0][2] ? 'mision Completada' : 'mi mision'}</p>
              </div>
            </div>
          </div>
          <div className='d-flex'>
            <div className={`${styles.cableContainer}`}>
              <Cable
                links={[1, 1, 0, 0]}
                />
            </div>
            <div className={`${styles.longCableContainer}`}>
              <Cable
                links={[0, 1, 0, 1]}
                />
            </div>
            <div className={`${styles.longCableContainer}`}>
              <Cable
                links={[0, 1, 0, 1]}
                />
            </div>
            <div className={`${styles.longCableContainer}`}>
              <Cable
                links={[0, 0, 1, 1]}
                />
            </div>
          </div>
          {/* <img
            draggable='false'
            src={getMision(playerIndex, board[0][2] !== null)}
            alt={`mision ${playerIndex}`}
          /> */}
        </div>
        <div className={`${styles.boardBody}`}>
          <div className={`${styles.boardCables}`}>
            {board.map((f, i) => {
              return (
                <>
                  {start > i && <div key={`borde${i}`} className={`${styles.space}`} />}
                  {start === i && (
                    <div key={`borde${i}`} className={`${styles.space}`}>
                      <Cable
                        links={[0, 1, 1, 0]}
                      />
                    </div>
                  )}
                  {start + 1 === i && (
                    <div className={`${styles.conexion}`}>
                      <Cable
                        links={[1, 0, 1, 0]}
                        key={`borde${i} `}
                      />
                    </div>
                  )}
                </>
              );
            })}
          </div>
          <div className='d-flex flex-column'>
            <Board playerIndex={playerIndex} />
          </div>
          <div className={`${styles.boardCables}`} />
        </div>
      </div>
    </div>
  )
}

RigthUI.propTypes = {}

export default RigthUI
