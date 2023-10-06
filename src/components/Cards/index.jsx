import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import { descartar, setCardSelected } from '../../stores/gameStore/actions';

import { Discard } from '../../utils/ApiConf';

import Button from '../UI/Button';

import styles from './Cards.module.scss';
import { getCardIMG } from '../../utils/GetSlabImg';
import { bindActionCreators } from 'redux';


const Cards = ({
  player,
  titleStyles,
  descartable = false,
  blocked = [],
  selected = [],
  dictionary,

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
          <div
            key={card.id}
            id={card.id}
            type={card.type}
            className={`
              ${styles.card}
              ${card.selected ? styles.selected : ''}
              ${blocked.includes(card.id) ? styles.blocked : ''}
            `}
            select={`${card.selected}`}
            onClick={() => {
              if (!blocked.includes(card.id) && !selected.includes(card.id)) setCardSelected(player.id, index);
            }}
          >
            {descartable && !player.hasBougth && (
              <Button
                variants='outlined secondary'
                className={styles.closebutton}
                onClick={() => {
                  Discard(id, card).then((res) => {
                    descartar(res)
                  })
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Button>
            )}
            <p className={styles.title} style={titleStyles}>{dictionary.cards.types[card.type]}</p>
            <img
              alt='card'
              draggable={false}
              className={styles.imagen}
              src={getCardIMG(card.subType)}
            />
            <p className={styles.title} style={titleStyles}>{dictionary.cards.subTypes[card.subType]}</p>
          </div>
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
