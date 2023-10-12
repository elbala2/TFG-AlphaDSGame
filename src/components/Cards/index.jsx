import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { descartar, setCardSelected } from '../../stores/gameStore/actions';

import { Discard } from '../../utils/ApiConf';

import Card from './Card';

import styles from './Cards.module.scss';


const Cards = ({
  player,
  descartable = false,
  blocked = [],
  selected = [],
  disabled,

  setCardSelected,
  descartar,
}) => {
  const { id } = useParams();

  useEffect(() => {
    player.cards.forEach((card, index) => {
      if (selected.includes(card.id) && !card.selected) setCardSelected(player.id, index);
    })
  }, [player, selected, setCardSelected])

  return (
    <div className={styles.cardscontainer}>
      {player.cards.map((card, index) => {
        return (
          <Card
            key={card.id}
            card={card}
            disabled={blocked.includes(card.id)}
            onClick={() => {
              if (!disabled && !blocked.includes(card.id) && !selected.includes(card.id)) setCardSelected(player.id, index);
            }}
            onDiscard={descartable ? () => {
              Discard(id, card).then((res) => {
                descartar(res)
              })
            } : undefined}
          />
        );
      })}
    </div>
  );
};




function stateToProps(state, { playerIndex }) {
  return {
    dictionary: {
      cards: state.lang.dictionary.cards,
      ...state.lang.dictionary.utils
    },

    player: state.game.players[playerIndex],
  };
}

function dispatchToProps(dispatch) {
  return {
    setCardSelected: bindActionCreators(setCardSelected, dispatch),
    descartar: bindActionCreators(descartar, dispatch),
  };
}

export default connect(stateToProps, dispatchToProps)(Cards);
