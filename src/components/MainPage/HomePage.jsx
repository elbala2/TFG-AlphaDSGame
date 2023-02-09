import { Card } from '@material-ui/core';
import { DefaultButton } from '@fluentui/react';
import { initialConfig } from '../../Store/actions';
import { Select, MenuItem, InputLabel } from '@material-ui/core/';

import { useState } from 'react';

import HeaderAndFooter from '../Header&Footer';

import styles from './HomePage.module.scss';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { StartGame } from '../../utils/ApiConf'
import PlayerInput from './PlayerInput';

const HomePage = () => {
  const [players, setPlayers] = useState([
    { name: 'Player 1', type: 0},
    { name: 'Player 2', type: 0},
    { name: 'Player 3', type: 0},
    { name: 'Player 4', type: 0},
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
      <Card className={styles.mainCard}>
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
          <InputLabel style={{ marginRight: '10px' }}>Iniciar en la fila:</InputLabel>
          <Select
            value={start}
            onChange={(e) => setstart(e.target.value)}
          >
            <MenuItem value={0}>1</MenuItem>
            <MenuItem value={1}>2</MenuItem>
            <MenuItem value={2}>3</MenuItem>
            <MenuItem value={3}>4</MenuItem>
          </Select>
          <div className='flex-fill'/>
          <DefaultButton
            text={'Start'}
            onClick={async () => {
              const res = await StartGame({
                players,
                start,
              })
              dispatch(initialConfig(res));
              setSave(true);
            }}
          />
        </div>
      </Card>
      {save && <Navigate to='/Game' replace/>}
    </HeaderAndFooter>
  );
}

export default HomePage;