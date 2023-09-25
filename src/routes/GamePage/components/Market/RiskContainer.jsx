import { useParams } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';

import { fix } from '../../../../stores/gameStore/actions';
import { fixRisk } from '../../../../utils/ApiConf';

import Button from '../../../../components/UI/Button';
import Tooltip from '../../../../components/UI/Tooltip';

import styles from './Styles/RiskContainer.module.scss';
import { getSlabImg } from '../../../../utils/GetSlabImg';
import { bindActionCreators } from 'redux';

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

const RiskContainer = ({
  slab,
  index,
  cards,

  fix,
}) => {
  const { id } = useParams();

  const { costs, type, description } = slab;
  const canbuy = canbebougth(cards, costs, type);
  return (
    <div className={`${styles.marketContainer}`} key={index}>
      <div className={`${styles.slabContainer}`} canbebougth={`${canbuy}`}>
        <h1 className={styles.title}>{type}</h1>
        <Tooltip title={<p className={styles.descriptionTooltip}>{description}</p>}>
          <p className={styles.cost}>{costs}</p>
        </Tooltip>
        <input
          alt={`img`}
          type='image'
          className={styles.slab}
          src={getSlabImg(slab)}
          draggable={false}
        />
      </div>
      <Button
        disabled={!canbuy}
        className={styles.button}
        onClick={() => fixRisk(id, index - 4, cards.filter(f => f.selected)).then((calbackRes) => fix(calbackRes))}
      >
        Fix
      </Button>
    </div>
  );
}

function stateToProps(state, { playerIndex }) {
  const player = state.game.players[state.game.actualPlayer];
  return {
    cards: player.cards,
  };
}

function dispatchToProps(dispatch) {
  return {
    fix: bindActionCreators(fix, dispatch),
  };
}

export default connect(stateToProps, dispatchToProps)(RiskContainer);
