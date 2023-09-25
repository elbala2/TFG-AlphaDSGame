import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { descartar, setCardSelected } from '../../stores/gameStore/actions';

import { Discard } from '../../utils/ApiConf';

import Button from '../UI/Button';

import styles from './Cards.module.scss';
import { getCardIMG } from '../../utils/GetSlabImg';


const Cards = ({
  actualPlayer = 0,
  titleStyles,
  descartable = false,
  blocked = [],
  selected = [],
}) => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { cards, hasBougth } = useSelector((state) => ({ cards: state.game.players[actualPlayer].cards, hasBougth: state.game.players[actualPlayer].hasBougth }));

  useEffect(() => {
    cards.forEach((card, index) => {
      if (selected.includes(card.id) && !card.selected) dispatch(setCardSelected(actualPlayer, index));
    })
  }, [actualPlayer, cards, dispatch, selected])

  return (
    <div className={styles.cardscontainer}>
      {cards.map((card, index) => {
        return (
          <div
            key={card.id}
            id={card.id}
            type={card.type[0]}
            className={`
              ${styles.card}
              ${card.selected ? styles.selected : ''}
              ${blocked.includes(card.id) ? styles.blocked : ''}
            `}
            select={`${card.selected}`}
            onClick={() => {
              if (!blocked.includes(card.id) && !selected.includes(card.id)) dispatch(setCardSelected(actualPlayer, index));
            }}
          >
            {descartable && !hasBougth && (
              <Button
                variants='outlined secondary'
                className={styles.closebutton}
                onClick={() => {
                  Discard(id, card).then((res) => {
                    dispatch(descartar(res))
                  })
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Button>
            )}
            <p className={styles.title} style={titleStyles}>{card.type[0]}</p>
            <img
              alt='card'
              draggable={false}
              className={styles.imagen}
              src={getCardIMG(card.type)}
            />
            <p className={styles.title} style={titleStyles}>{card.type[1]}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
