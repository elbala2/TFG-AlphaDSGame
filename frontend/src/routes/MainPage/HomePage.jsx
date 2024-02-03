import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { MISSION_TYPES, MISSION_TYPE_DNA_SHERIFF, MISSION_TYPE_TO_SAFETY, MISSION_TYPE_WOLFS, playerColors } from '../../constants';

import wolf from '../../resources/instructionsImgs/Wolf.png'
import sheeps from '../../resources/instructionsImgs/Sheeps.png'
import scientific from '../../resources/instructionsImgs/scientific.png'
import viruses from '../../resources/instructionsImgs/Viruses.png'
import Brother from '../../resources/instructionsImgs/Brother.png'
import Cars from '../../resources/instructionsImgs/Cars.png'

import { createGame } from '../../utils/ApiConf';
import { reset } from '../../stores/gameStore/actions';

import HeaderAndFooter from '../../components/HeaderAndFooter';
import Button from '../../components/UI/Button';
import PlayerInput from './PlayerInput';

import styles from './styles/HomePage.module.scss';

const HomePage = ({
  dictionary,
  reset,
}) => {
  const navigate = useNavigate();
  const [config, setConfig] = useState({
    gameType: MISSION_TYPE_WOLFS,
    start: 1,
    players: [
      { name: `${dictionary.player} 1`, type: 0 },
      { name: `${dictionary.player} 2`, type: 0 },
      { name: `${dictionary.player} 3`, type: 0 },
      { name: `${dictionary.player} 4`, type: 0 },
    ]
  });

  const handleChangePlayer = (player, i) => {
    setConfig((c) => {
      const newPlayers = [...c.players];
      newPlayers[i] = player;
      return {
        ...c,
        players: newPlayers,
      };
    });
  };

  useEffect(() => {
    reset();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <HeaderAndFooter>
      <div className={styles.mainCard}>
        <div className={` rounded-4 ${styles.container}`}>
          <div className='d-flex justify-content-between align-items-start'>
            <h1>{dictionary.wellcomeTo}</h1>
            <select
              className={styles.missionSelect}
              value={config.gameType}
              onChange={e => setConfig(c => ({
                ...c,
                gameType: e.target.value,
              }))}
            >
              {MISSION_TYPES.map(mission => (<option key={mission} value={mission}>{dictionary.missions[mission] ?? mission}</option>))}
            </select>
          </div>
          <div className='d-flex align-items-center p-4'>
            {config.gameType === MISSION_TYPE_WOLFS && (
              <img
                src={wolf}
                alt='wolf'
                className='mx-5'
              />
            )}
            {config.gameType === MISSION_TYPE_DNA_SHERIFF && (
              <img
                src={scientific}
                alt='scientis'
                className='mx-5'
              />
            )}
            {config.gameType === MISSION_TYPE_TO_SAFETY && (
              <img
                src={Brother}
                alt='Brother'
                className='mx-5'
              />
            )}
            <div>
              {dictionary.objectiveDescriptions[config.gameType].split('\n').map(txt => (
                <h6 key={txt}>
                  {txt}
                </h6>
              ))}
            </div>
            {config.gameType === MISSION_TYPE_WOLFS && (
              <img
                src={sheeps}
                alt='sheeps'
                className='mx-5'
              />
            )}
            {config.gameType === MISSION_TYPE_DNA_SHERIFF && (
              <img
                src={viruses}
                alt='viruses'
                className='mx-5'
              />
            )}
            {config.gameType === MISSION_TYPE_TO_SAFETY && (
              <img
                src={Cars}
                alt='Cars'
                className='mx-5'
              />
            )}
          </div>
          <div className={styles.playerButtonsContainer}>
            {config.players.map((player, index) => (
              <PlayerInput
                key={player.name}
                color={playerColors[index]}
                player={player}
                setPlayer={(p) => handleChangePlayer(p, index)}
              />
            ))}
          </div>

          <div className='d-flex align-items-center'>
            <div className='flex-fill' />
            <Button
              onClick={async () => {
                const res = await createGame(config)
                navigate(`/Game/${res.id}`);
              }}
            >
              {dictionary.start}
            </Button>
          </div>
        </div>
      </div>
    </HeaderAndFooter>
  );
};

function stateToProps(state) {
  return {
    dictionary: {
      ...state.lang.dictionary.homePage,
      ...state.lang.dictionary.utils,
    },
  };
}

function dispatchToProps(dispatch) {
  return {
    reset: bindActionCreators(reset, dispatch)
  };
}

export default connect(stateToProps, dispatchToProps)(HomePage);
