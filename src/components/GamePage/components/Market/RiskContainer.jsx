import { getSlabImg } from '../../../../Store/GetSlabImg';
import { fix } from '../../../../Store/actions';
import { DefaultButton } from '@fluentui/react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Styles/RiskContainer.module.scss';
import { Tooltip } from '@material-ui/core';

const canbebougth = (cartas, costes, type) => {
  switch (type) {
    case 'Complex Model':
      return cartas.filter(f => f.type[1] === 'Simple Model' && f.selected).length >= costes;
    case 'Danger Data':
      return cartas.filter(f => f.type[1] === 'Protected Data' && f.selected).length >= costes;
    case 'No Data':
      return cartas.filter(f => f.type[1] === 'Data Base' && f.selected).length >= costes;
    case 'Old Software':
      return cartas.filter(f => f.type[1] === 'Open Source' && f.selected).length >= costes;
    case 'Old Technology':
      return cartas.filter(f => f.type[1] === 'New Technology' && f.selected).length >= costes;
    case 'Slow Model':
      return cartas.filter(f => f.type[1] === 'Fast Model' && f.selected).length >= costes;
    case 'Virus':
      return cartas.filter(f => f.type[1] === 'Antivirus' && f.selected).length >= costes;
    case 'Working Alone':
      return cartas.filter(f => f.type[1] === 'Team Spirit' && f.selected).length >= costes;
    case 'Wrong Model':
      return cartas.filter(f => f.type[1] === 'Right Model' && f.selected).length >= costes;
    default:
      return true;
  }
};

const RiskContainer = (props) => {
  const { actualplayer } = useSelector(state => state);
  const cartas = useSelector(state => state.players[actualplayer].cartas);
  const dispatch = useDispatch();

  const { costes, type, description } = props.casilla;
  const canbuy = canbebougth(cartas, costes, type, actualplayer);
  return (
    <div className={`${styles.marketContainer}`} key={props.index}>
      <div className={`${styles.slabContainer}`} canbebougth={`${canbuy}`}>
        <h1 className={styles.title}>{type}</h1>
        <Tooltip title={<p className={styles.descriptionTooltip}>{description}</p>}>
          <p className={styles.cost}>{costes}</p>
        </Tooltip>
        <input
          alt={`img`}
          type='image'
          className={styles.slab}
          src={getSlabImg(props.casilla)}
          draggable={false}
        />
      </div>
      <DefaultButton
        disabled={!canbuy}
        text='Fix'
        className={styles.button}
        onClick={() => dispatch(fix(props.index))}
      />
    </div>
  );
}

export default RiskContainer;