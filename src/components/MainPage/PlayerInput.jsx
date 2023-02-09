import { Icon } from '@fluentui/react';
import { abs } from 'mathjs';
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';

export default function PlayerInput({
  player,
  setPlayer,
  id,
}) {
  const [{ name, type }, setChildPlayer] = useState({ name: '', type: 0 });
  useEffect(() => {
    setChildPlayer()
  }, [player]);

  return (
    <div className=''>
      <span>
        { name || '--' }
      </span>
      <Button onClick={() => setPlayer({ name, type: (type + 1) % 2 })}>
        <Icon iconName=''/>
      </Button>
      <span>{type === 0 ? 'player' : 'Bot'}</span>
      <Button onClick={() => setPlayer({ name, type: abs(type - 1) % 2 })}>
        <Icon iconName=''/>
      </Button>
    </div>
  )
}
