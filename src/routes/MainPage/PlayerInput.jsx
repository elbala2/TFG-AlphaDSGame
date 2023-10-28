import React from 'react';

import Button from '../../components/UI/Button';

import styles from './styles/PlayerInput.module.scss';

export default function PlayerInput({ player, setPlayer, color }) {
  return (
    <div className={styles.playerButton} type={color}>
      <input
        type='text'
        className='bg-transparent text-center'
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
        <span className=''>{player.type === 0 ? 'Jugador' : 'Bot'}</span>
        <Button
          className={styles.button}
          onClick={() => setPlayer({ ...player, type: Math.abs(player.type - 1) % 2 })}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </Button>
      </div>
    </div>
  );
}
