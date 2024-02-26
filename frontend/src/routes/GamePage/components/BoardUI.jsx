import React, { useContext } from 'react'

import { connect } from 'react-redux';

import { BLUE, GREEN, MISSION_TYPE_DNA_SHERIFF, MISSION_TYPE_TO_SAFETY, MISSION_TYPE_WOLFS, RED, YELLOW } from '../../../constants';

import shannon from '../../../resources/Misiones/shannon.png';
import scientific from '../../../resources/Misiones/scientific.png';
import Brother from '../../../resources/Misiones/Brother.png';
import blueData from '../../../resources/Misiones/blue_data.png';
import yellowPhone from '../../../resources/Misiones/yellow_phone.png';
import redBrain from '../../../resources/Misiones/red_brain.png';

import { PlayerContext } from '../../../components/PlayerProvider';
import Board from '../../../components/Board';
import { Cable } from '../../../components/Slab';

import mainStyles from '../Main.module.scss';
import styles from './Styles/rigthUI.module.scss';

function BoardUI({
  gameType,
  start,
  dictionary,
}) {
  const { player, prevPlayer } = useContext(PlayerContext);

  const isMissionComplete = !!player.board[0][2];

  function getPlayerIcon({ color }) {
    if (color === GREEN) {
      if (gameType === MISSION_TYPE_WOLFS) {
        return (
          <img
            className='scale-25'
            src={shannon}
            alt='shannon'
          />
        )
      }

      if (gameType === MISSION_TYPE_DNA_SHERIFF) {
        return (
          <img
            className='scale-25'
            src={scientific}
            alt='scientific'
          />          
        );
      }

      if (gameType === MISSION_TYPE_TO_SAFETY) {
        return (
          <img
            className='scale-25'
            src={Brother}
            alt='Brother'
          />
        );
      }
    }

    if (color === BLUE) {
      return (
        <img
          className='scale-23'
          src={blueData}
          alt='blue_data'
        />
      );
    }

    if (color === YELLOW) {
      return (
        <img
          className='scale-23'
          src={yellowPhone}
          alt='yellow_phone'
        />
      );
    }

    if (color === RED) {
      return (
        <img
          className='scale-23'
          src={redBrain}
          alt='red_brain'
        />
      );
    }

    return '';
  }

  function getMissionDescription({ color }) {
    if (color === BLUE) {
      return isMissionComplete
      ? dictionary.misionCompletedDescription[color]?.[gameType]
      : dictionary.misionDescription[color]?.[gameType];
    }
    
    return isMissionComplete
    ? dictionary.misionCompletedDescription[color]
    : dictionary.misionDescription[color];
  }

  return (
    <div className={`${mainStyles.halfCard} col-lg-6`}>
      <div className={`${styles.boardUI}`}>
        <div className={`${styles.boardHeader}`}>
          <div className='d-flex flex-fill'>
            <div className={`${styles.cableContainer}`}>
              <Cable
                links={[1, 0, 1, 0]}
                isWayPart={player.hasConnectedWay}
              />
            </div>
            <div className='d-flex flex-fill justify-content-around align-items-center px-4'>
              <div className=''>
                <h3 className='mb-3'><b>{dictionary.misionTitles[player.color]}</b></h3>
                {getMissionDescription(player)?.split('\n').map(txt => (
                    <h6 key={txt} className={`${styles.misionDescription}`}>{txt}</h6>
                  ))
                }
              </div> 
              {isMissionComplete && (
                <div className={`${styles.missionLogoContainer}`}>
                  {getPlayerIcon(prevPlayer)}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="scale-15">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                  </svg>
                  {getPlayerIcon(player)}
                </div>
              )}             
            </div>
          </div>
          <div className='d-flex'>
            <div className={`${styles.cableContainer}`}>
              <Cable
                links={[1, 1, 0, 0]}
                isWayPart={player.hasConnectedWay}
              />
            </div>
            <div className={`${styles.longCableContainer}`}>
              <Cable
                links={[0, 1, 0, 1]}
                isWayPart={player.hasConnectedWay}
              />
            </div>
            <div className={`${styles.longCableContainer}`}>
              <Cable
                links={[0, 1, 0, 1]}
                isWayPart={player.hasConnectedWay}
              />
            </div>
            <div className={`${styles.longCableContainer}`}>
              <Cable
                links={[0, 0, 1, 1]}
                isWayPart={player.hasConnectedWay}
              />
            </div>
          </div>
        </div>
        <div className={`${styles.boardBody}`}>
          <div className={`${styles.boardCables}`}>
            {player.board.map((f, i) => {
              return (
                <React.Fragment key={`borde${i}`} >
                  {start > i && <div className={`${styles.space}`} />}
                  {start === i && (
                    <div className={`${styles.space}`}>
                      <Cable
                        links={[0, 1, 1, 0]}
                        isWayPart={player.way.length}
                      />
                    </div>
                  )}
                  {start + 1 === i && (
                    <div className={`${styles.conexion}`}>
                      <Cable
                        links={[1, 0, 1, 0]}
                        isWayPart={player.way.length}
                      />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
          <div className='d-flex flex-column'>
            <Board player={player} />
          </div>
          <div className={`${styles.boardCables}`} />
        </div>
      </div>
    </div>
  )
}

BoardUI.propTypes = {}

function stateToProps(state) {
  return {
    start: 1,
    gameType: state.game.type,

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