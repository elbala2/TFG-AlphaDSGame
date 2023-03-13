import React from 'react';
import { abs } from 'mathjs';
import Button from '../UI/Button';
import styles from './styles/PlayerInput.module.scss';

export default function PlayerInput({ player, setPlayer, id }) {
  return (
    <div className={styles.playerButton} type={id}>
      <input
        type='text'
        className='bg-transparent text-center'
        placeholder='Player name'
        value={player.name}
        onChange={(e) => setPlayer({ ...player, name: e.target.value })}
      />
      <div className={styles.typeButtonContainer}>
        <Button
          className={styles.button}
          onClick={() => setPlayer({ ...player, type: (player.type + 1) % 2 })}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </Button>
        <span className='mx-auto'>{player.type === 0 ? 'Player' : 'Bot'}</span>
        <Button
          className={styles.button}
          onClick={() => setPlayer({ ...player, type: abs(player.type - 1) % 2 })}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </Button>
      </div>
    </div>
  );
}
