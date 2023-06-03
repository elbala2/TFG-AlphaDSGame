import { useDispatch, useSelector } from 'react-redux';

import { getCardIMG } from '../../../Store/GetSlabImg';
import { descartar, setCardSelected } from '../../../Store/actions';

import { Discard } from '../../../utils/ApiConf';

import Button from '../../UI/Button';

import styles from './Styles/Cartas.module.scss';
import { useEffect } from 'react';

const Cartas = ({
  actualPlayer = 0,
  titleStyles,
  descartable = false,
  blocked = [],
  selected = [],
}) => {
  const dispatch = useDispatch();
  const { id, cards } = useSelector((state) => ({ id: state.id, cards: state.players[actualPlayer].cards }));

  useEffect(() => {
    cards.forEach((card, index) => {
      if (selected.includes(card.id) && !card.selected) dispatch(setCardSelected(actualPlayer, index));
    })
  }, [actualPlayer, cards, dispatch, selected])

  const canDiscard = cards.length === 4;

  return (
    <div className={styles.cardscontainer}>
      {cards.map((card, index) => {
        return (
          <div
            key={index}
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
            {descartable && canDiscard && (
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

export default Cartas;
