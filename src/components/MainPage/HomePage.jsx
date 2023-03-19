import { initialConfig } from '../../Store/actions';
import { useState } from 'react';

import HeaderAndFooter from '../UI/Header&Footer';

import styles from './styles/HomePage.module.scss';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { StartGame } from '../../utils/ApiConf'
import PlayerInput from './PlayerInput';
import Button from '../UI/Button';

const HomePage = () => {
  const [players, setPlayers] = useState([
    { name: 'Player 1', type: 1},
    { name: 'Player 2', type: 1},
    { name: 'Player 3', type: 1},
    { name: 'Player 4', type: 1},
  ]);

  const handleChangePlayer = (player, i) => {
    setPlayers(p => {
      p[i] = player;
      return [...p];
    })
  };
  const [save, setSave] = useState(false);
  const [start, setstart] = useState(1);

  const dispatch = useDispatch();

  return (
    <HeaderAndFooter>
      <div className={styles.mainCard}>
        <h1>Bienvenido a AlphaDSGame</h1>
        <div className={styles.playerButtonsContainer}>
          {players.map((player, index) => (
            <PlayerInput
              key={index}
              id={index}
              player={player}
              setPlayer={(p) => handleChangePlayer(p, index)}
            />
          ))}
        </div>

        <div className='d-flex align-items-center'>
          <label style={{ marginRight: '10px' }}>Iniciar en la fila:</label>
          <select
            value={start}
            onChange={(e) => setstart(e.target.value)}
          >
            <option value={0}>1</option>
            <option value={1}>2</option>
            <option value={2}>3</option>
            <option value={3}>4</option>
          </select>
          <div className='flex-fill'/>
          <Button
            onClick={async () => {
              const res = await StartGame({
                players,
                start,
              })
              dispatch(initialConfig(res));
              setSave(true);
            }}
          >
            Start
          </Button>
        </div>
      </div>
      {save && <Navigate to='/Game' replace/>}
    </HeaderAndFooter>
  );
}

export default HomePage;