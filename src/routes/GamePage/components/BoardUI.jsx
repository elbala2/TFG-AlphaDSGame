import React from 'react'

import { connect } from 'react-redux';

import Board from '../../../components/Board';
import { Cable } from '../../../components/Slab';

import mainStyles from '../Main.module.scss';
import styles from './Styles/rigthUI.module.scss';

function BoardUI({
  playerIndex,
  start,
  board,
  color,
  dictionary,
}) {
  return (
    <div className={`${mainStyles.halfCard} col-lg-6`}>
      <div className={`${styles.boardUI}`}>
        <div className={`${styles.boardHeader}`}>
          <div className='d-flex flex-fill'>
            <div className={`${styles.cableContainer}`}>
              <Cable
                links={[1, 0, 1, 0]}
              />
            </div>
            <div className='d-flex flex-fill justify-content-around align-items-center px-4'>
              <div className=''>
                <h3 className='mb-3'><b>{dictionary.misionTitles[color]}</b></h3>
                {(board[0][2]
                  ? dictionary.misionCompletedDescription[color]
                  : dictionary.misionDescription[color]
                  )?.split('\n').map(txt => (
                    <h6 key={txt} className={`${styles.misionDescription}`}>{txt}</h6>
                  ))
                }
              </div> 
              {board[0][2] && (
                <div className={`${styles.missionLogoContainer}`}>
                  <img
                    className={styles.misionCompletedImg}
                    src={require(`../../../resources/Misiones/${color}.png`)}
                    alt=''
                  />
                </div>
              )}             
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
                    <div key={`borde${i}`} className={`${styles.conexion}`}>
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

BoardUI.propTypes = {}

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

export default connect(stateToProps, dispatchToProps)(BoardUI);