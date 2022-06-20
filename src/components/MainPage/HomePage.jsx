import { Card } from '@material-ui/core';
import { DefaultButton, TextField } from '@fluentui/react';
import { initialConfig, reset } from '../../Store/actions';
import { Select, MenuItem, InputLabel } from '@material-ui/core/';

import { useState } from 'react';

import HeaderAndFooter from '../Header&Footer';

import styles from './HomePage.module.scss';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const HomePage = () => {
  const [player1, setPlayer1] = useState(0);
  const [player1Name, setPlayer1Name] = useState('Player 1');
  const [player2, setPlayer2] = useState(0);
  const [player2Name, setPlayer2Name] = useState('Player 2');
  const [player3, setPlayer3] = useState(0);
  const [player3Name, setPlayer3Name] = useState('Player 3');
  const [player4, setPlayer4] = useState(0);
  const [player4Name, setPlayer4Name] = useState('Player 4');
  const [save, setSave] = useState(false);
  const [inicio, setInicio] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => dispatch(reset()), [dispatch]);

  console.log(save)
  return (
    <HeaderAndFooter>
      <Card className={styles.mainCard}>
        <h1>Bienvenido a AlphaDSGame</h1>
        <div className={styles.playerButtonsContainer}>
          {player1 === 2 ? (
            <>
            <DefaultButton
              className={styles.playerButton}
              type='0'
            >
              <TextField 
                label='Jugador :'
                value={player1Name}
                style={{ zIndex: '1' }}
                onChange={(e) => setPlayer1Name(e.target.value)}
                onKeyUp={(e) => {
                  if (e.key === 'Enter')
                  setPlayer1(prevState => (prevState + 1) % 3)
                }}
              />
            </DefaultButton>
            </>
          ) : (
            <DefaultButton
              className={styles.playerButton}
              type='0'
              text={player1 === 0 
                ? '---' 
                : 'Bot 1'
                }
              onClick={() => setPlayer1(prevState => (prevState + 1) % 3)}
            />
          )}
          {player2 === 2 ? (
            <DefaultButton
              className={styles.playerButton}
              type='1'
            >
              <TextField 
                label="Jugador :"
                value={player2Name}
                onChange={(e) => setPlayer2Name(e.target.value)}
                onKeyUp={(e) => {
                  if (e.key === 'Enter')
                    setPlayer2(prevState => (prevState + 1) % 3)
                }}
              />
            </DefaultButton>
          ) : (
            <DefaultButton
              className={styles.playerButton}
              type='1'
              text={player2 === 0 
                ? '---' 
                : 'Bot 2'
                }
              onClick={() => setPlayer2(prevState => (prevState + 1) % 3)}
            />
          )}
          {player3 === 2 ? (
            <DefaultButton
              className={styles.playerButton}
              type='2'
            >
              <TextField 
                label="Jugador :"
                value={player3Name}
                onChange={(e) => setPlayer3Name(e.target.value)}
                onKeyUp={(e) => {
                  if (e.key === 'Enter')
                    setPlayer3(prevState => (prevState + 1) % 3)
                }}
              />
            </DefaultButton>
          ) : (
            <DefaultButton
              className={styles.playerButton}
              type='2'
              text={player3 === 0 
                ? '---' 
                : 'Bot 3'
                }
              onClick={() => setPlayer3(prevState => (prevState + 1) % 3)}
            />
          )}
          {player4 === 2 ? (
            <DefaultButton
              className={styles.playerButton}
              type='3'
            >
              <TextField 
                label="Jugador :"
                value={player4Name}
                onChange={(e) => setPlayer4Name(e.target.value)}
                onKeyUp={(e) => {
                  if (e.key === 'Enter')
                    setPlayer4(prevState => (prevState + 1) % 3)
                }}
              />
            </DefaultButton>
          ) : (
            <DefaultButton
              className={styles.playerButton}
              type='3'
              text={player4 === 0 
                ? '---' 
                : 'Bot 4'
                }
              onClick={() => setPlayer4(prevState => (prevState + 1) % 3)}
            />
          )}
        </div>
        <div className='d-flex align-items-center'>
          <InputLabel style={{ marginRight: '10px' }}>Iniciar en la fila:</InputLabel>
          <Select
            value={inicio}
            onChange={(e) => setInicio(e.target.value)}
          >
            <MenuItem value={0}>1</MenuItem>
            <MenuItem value={1}>2</MenuItem>
            <MenuItem value={2}>3</MenuItem>
            <MenuItem value={3}>4</MenuItem>
          </Select>
          <div className='flex-fill'/>
          <DefaultButton
            text={'Start'}
            onClick={() => {
              dispatch(initialConfig({
                players: [
                { name: player1Name, type: player1 },
                { name: player2Name, type: player2 },
                { name: player3Name, type: player3 },
                { name: player4Name, type: player4 }],
                inicio,
              }));
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