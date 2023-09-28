import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux';

import mainStyles from '../Main.module.scss';
import styles from './Styles/rigthUI.module.scss';
import Board from '../../../components/Board';
import Cable from '../../../components/Cable';

function RigthUI({
  playerIndex,
  start,
  board,
  color,
  dictionary,
}) {
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
            <div className='p-5 d-flex'>
              <div className=''>
                <h3><b>{dictionary.misionTitles[color]}</b></h3>
                <h6 className={`${styles.misionDescription}`}>
                  {board[0][2]
                    ? dictionary.misionCompletedDescription[color]
                    : dictionary.misionDescription[color]
                  }
                </h6>
              </div>              
              <div className={`${styles.missionLogoContainer}`}>
                WIP
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

function stateToProps(state, { playerIndex }) {
  return {
    start: state.game.start,
    pos: state.game.pos,
    board: state.game.players[playerIndex].board,
    color: state.game.players[playerIndex].color,

    dictionary: {
      ...state.lang.dictionary.rigthUI,
      ...state.lang.dictionary.utils,
    },
  };
}

function dispatchToProps(dispatch) {
  return {
  };
}

export default connect(stateToProps, dispatchToProps)(RigthUI);