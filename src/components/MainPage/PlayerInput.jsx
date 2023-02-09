import React from 'react';
import { Icon, TextField } from '@fluentui/react';
import { abs } from 'mathjs';
import { Button } from 'react-bootstrap';
import styles from './HomePage.module.scss';

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
          <Icon iconName='ChevronLeft' style={{ margin: '-20px' }} />
        </Button>
        <span className='mx-auto'>{player.type === 0 ? 'Player' : 'Bot'}</span>
        <Button
          className={styles.button}
          onClick={() => setPlayer({ ...player, type: abs(player.type - 1) % 2 })}
        >
          <Icon iconName='ChevronRight' style={{ margin: '-20px' }}/>
        </Button>
      </div>
    </div>
  );
}
