import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { discard, setCardSelected } from '../../stores/gameStore/actions';

import { Discard } from '../../utils/ApiConf';

import Card from './Card';

import './styles.scss';


const Cards = ({
  descartable = false,
  blocked = [],
  selected = [],
  disabled,
  className = '',

  player,

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
        const isBlocked = blocked.includes(card.id);
        return (
          <Card
            key={card.id ?? index}
            card={card}
            className={`${className} ${isBlocked ? 'blocked' : ''}`}
            disabled={disabled || isBlocked}
            onClick={() => {
              if (disabled || isBlocked || selected.includes(card.id)) return;
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


function stateToProps(state) {
  return {
    dictionary: {
      cards: state.lang.dictionary.cards,
      ...state.lang.dictionary.utils
    },
  };
}

function dispatchToProps(dispatch) {
  return {
    setCardSelected: bindActionCreators(setCardSelected, dispatch),
    discard: bindActionCreators(discard, dispatch),
  };
}

export default connect(stateToProps, dispatchToProps)(Cards);
