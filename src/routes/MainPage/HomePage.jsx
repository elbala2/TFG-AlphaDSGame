import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { StartGame } from '../../utils/ApiConf';

import HeaderAndFooter from '../../components/UI/Header&Footer';
import Button from '../../components/UI/Button';
import PlayerInput from './PlayerInput';

import styles from './styles/HomePage.module.scss';

const HomePage = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([
    { name: 'Jugador 1', type: 0 },
    { name: 'Jugador 2', type: 0 },
    { name: 'Jugador 3', type: 0 },
    { name: 'Jugador 4', type: 0 },
  ]);

  const handleChangePlayer = (player, i) => {
    setPlayers((p) => {
      p[i] = player;
      return [...p];
    });
  };

  return (
    <HeaderAndFooter>
      <div className={styles.mainCard}>
        <div className={styles.container}>
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
              Comenzar
            </Button>
          </div>
        </div>
      </div>
    </HeaderAndFooter>
  );
};

export default HomePage;