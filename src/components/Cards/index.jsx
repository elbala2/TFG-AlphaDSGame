import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { discard, setCardSelected } from '../../stores/gameStore/actions';

import { Discard } from '../../utils/ApiConf';

import Card from './Card';

import './styles.scss';


const Cards = ({
  player,
  descartable = false,
  blocked = [],
  selected = [],
  disabled,
  className,

  setCardSelected,
  discard,
}) => {
  const { id } = useParams();

  useEffect(() => {
    player.cards.forEach((card, index) => {
      if (selected.includes(card.id) && !card.selected) setCardSelected(player.id, index);
    })
  }, [player, selected, setCardSelected])

  return (
    <div className='cardscontainer'>
      {player.cards.map((card, index) => {
        return (
          <Card
            key={card.id}
            card={card}
            className={`${className} ${blocked.includes(card.id) ? 'blocked' : ''}`}
            disabled={disabled}
            onClick={() => {
              if (disabled || blocked.includes(card.id) || selected.includes(card.id)) return;
              setCardSelected(player.id, index);
            }}
            onDiscard={descartable ? () => {
              Discard(id, card).then((res) => {
                discard(res)
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
    discard: bindActionCreators(discard, dispatch),
  };
}

export default connect(stateToProps, dispatchToProps)(Cards);
