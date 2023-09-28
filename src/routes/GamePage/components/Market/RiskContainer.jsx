import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import { fix } from '../../../../stores/gameStore/actions';
import { fixRisk } from '../../../../utils/ApiConf';

import Button from '../../../../components/UI/Button';
import Tooltip from '../../../../components/UI/Tooltip';

import styles from './Styles/RiskContainer.module.scss';
import { getSlabImg } from '../../../../utils/GetSlabImg';
import { bindActionCreators } from 'redux';

const RiskContainer = ({
  slab,
  index,
  cards,

  fix,
  dictionary,
}) => {
  const { id } = useParams();

  const { costs, type, needed } = slab;
  const canbuy = cards.filter(f => f.type[1] === needed && f.selected).length >= costs;
  return (
    <div className={`${styles.marketContainer}`} key={index}>
      <div className={`${styles.slabContainer}`} canbebougth={`${canbuy}`}>
        <h1 className={styles.title}>{dictionary.risks.types[type]}</h1>
        <Tooltip title={<p className={styles.descriptionTooltip}>{dictionary.risks.descriptions[type]}</p>}>
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
        {dictionary.fix}
      </Button>
    </div>
  );
}

function stateToProps(state, { playerIndex }) {
  const player = state.game.players[state.game.actualPlayer];
  return {
    cards: player.cards,
    dictionary: {
      risks: state.lang.dictionary.risks,
      ...state.lang.dictionary.utils,
    },
  };
}

function dispatchToProps(dispatch) {
  return {
    fix: bindActionCreators(fix, dispatch),
  };
}

export default connect(stateToProps, dispatchToProps)(RiskContainer);
