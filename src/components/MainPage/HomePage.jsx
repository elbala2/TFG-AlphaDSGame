import { useState } from 'react';


import styles from './styles/HomePage.module.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { StartGame } from '../../utils/ApiConf';
import PlayerInput from './PlayerInput';
import Button from '../UI/Button';
import HeaderAndFooter from '../UI/Header&Footer';

const HomePage = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([
    { name: 'Player 1', type: 0 },
    { name: 'Player 2', type: 0 },
    { name: 'Player 3', type: 0 },
    { name: 'Player 4', type: 0 },
  ]);

  const handleChangePlayer = (player, i) => {
    setPlayers((p) => {
      p[i] = player;
      return [...p];
    });
  };

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
          {/* <label style={{ marginRight: '10px' }}>Iniciar en la fila:</label>
          <select value={start} onChange={(e) => setstart(e.target.value)}>
            <option value={0}>1</option>
            <option value={1}>2</option>
            <option value={2}>3</option>
            <option value={3}>4</option>
          </select> */}
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
            Start
          </Button>
        </div>
      </div>
    </HeaderAndFooter>
  );
};

export default HomePage;
