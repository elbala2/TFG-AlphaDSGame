import { useParams } from 'react-router-dom';

import { mover, rotar } from '../../../../stores/gameStore/actions';
import { connect, useDispatch, useSelector } from 'react-redux';

import { MoveSlab } from '../../../../utils/ApiConf';

import Tooltip from '../../../../components/UI/Tooltip';

import styles from './Styles/SpecialContainer.module.scss';
import { getSlabImg } from '../../../../utils/GetSlabImg';
import { bindActionCreators } from 'redux';

const canbebougth = (cartas, costes, type, actualplayer) => {
  const canbebougth =
    cartas.filter(f => f.type[0] === 'Domain').length >= costes[0] &&
    cartas.filter(f => f.type[0] === 'Computer Science').length >= costes[1] &&
    cartas.filter(f => f.type[0] === 'Mathematics').length >= costes[2];

  switch (type) {
    case 'RED':
      if (actualplayer !== 0) return false;
      else return canbebougth;
    case 'GREEN':
      if (actualplayer !== 1) return false;
      else return canbebougth;
    case 'BLUE':
      if (actualplayer !== 2) return false;
      else return canbebougth;
    case 'YELLOW':
      if (actualplayer !== 3) return false;
      else return canbebougth;
    default:
      return canbebougth;
  }
};

const SpecialContainer = ({
  disabled,
  slab,
  index,
  target,
  cards,
  hasBougth,
  actualPlayer,

  rotar,
  mover,
}) => {
  const { id } = useParams();

  const { rotation, costs, type, title, description } = slab;
  const canbuy = !hasBougth && canbebougth(cards, costs, type, actualPlayer) && !disabled;
  return (
    <div className={`${styles.marketContainer}`} key={index}>
      <div className={`${styles.slabContainer}`} canbebougth={`${canbuy}`}>
        <h1 className={styles.title}>{title}</h1>
        <Tooltip title={<p className={styles.descriptionTooltip}>{description}</p>}>
          <p className={styles.description}>{description}</p>
        </Tooltip>
        <input
          alt={`img`}
          type='image'
          rotation={rotation}
          className={styles.slab}
          src={getSlabImg(slab)}
          draggable={canbuy && !disabled}
          onKeyUp={keyEvent => {
            if (keyEvent.key === 'r' && !disabled) rotar(index);
          }}
          onDragEnd={result => {
            if (target) {
              MoveSlab(id, index, target, slab.rotation, cards.filter(f => f.selected))
                .then(res => {
                  mover(res);
                })
            }
          }}
        />
      </div>
      <div className={`d-flex ${styles.MarketCostsContainer}`}>
        {costs.map((coste, type) => {
          // type 0 => blue, 1 => red, 2 => green
          return (
            <span key={`c${type}`} type={type} className={styles.MarketCosts}>
              {coste}
            </span>
          );
        })}
      </div>
    </div>
  );
};

function stateToProps(state, { playerIndex }) {
  const player = state.game.players[state.game.actualPlayer];
  return {
    target: state.game.target,
    cards: player.cards,
    hasBougth: player.hasBougth,
    actualPlayer: state.game.actualPlayer,
  };
}

function dispatchToProps(dispatch) {
  return {
    rotar: bindActionCreators(rotar, dispatch),
    mover: bindActionCreators(mover, dispatch),
  };
}

export default connect(stateToProps, dispatchToProps)(SpecialContainer);
