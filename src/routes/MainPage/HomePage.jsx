import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';


import wolf from '../../resources/instructionsImgs/Wolf.png'
import sheeps from '../../resources/instructionsImgs/Sheeps.png'

import { StartGame } from '../../utils/ApiConf';

import HeaderAndFooter from '../../components/UI/Header&Footer';
import Button from '../../components/UI/Button';
import PlayerInput from './PlayerInput';

import { connect } from 'react-redux';
import { playerColors } from '../../constants';

import styles from './styles/HomePage.module.scss';
import { bindActionCreators } from 'redux';
import { reset } from '../../stores/gameStore/actions';

const HomePage = ({
  dictionary,
  reset,
}) => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([
    { name: `${dictionary.player} 1`, type: 0 },
    { name: `${dictionary.player} 2`, type: 0 },
    { name: `${dictionary.player} 3`, type: 0 },
    { name: `${dictionary.player} 4`, type: 0 },
  ]);

  const handleChangePlayer = (player, i) => {
    setPlayers((p) => {
      p[i] = player;
      return [...p];
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
          <h1>{dictionary.wellcomeTo}</h1>
          <div className='d-flex align-items-center'>
            <img
              src={wolf}
              alt='wolf'
              className='mx-5'
            />
            <div>
              {dictionary.objectiveDescription.split('\n').map(txt => (
                <h6>
                  {txt}
                </h6>
              ))}
            </div>
            <img
              src={sheeps}
              alt='sheeps'
              className='mx-5'
            />
          </div>
          <div className={styles.playerButtonsContainer}>
            {players.map((player, index) => (
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
                const res = await StartGame({
                  players,
                  start: 1,
                })
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
