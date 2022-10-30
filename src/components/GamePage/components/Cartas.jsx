import styles from './Styles/Cartas.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getCardIMG } from '../../../Store/GetSlabImg';
import { descartar, setCardSelected } from '../../../Store/actions';
import { Icon } from '@fluentui/react';
import { Discard } from '../../../utils/ApiConf';

const Cartas = ({actualPlayer = 0, titleStyles, descartable = false}) => {
  const cards = useSelector((state) => state.players[actualPlayer].cards);
  const id = useSelector((state) => state.id);
  const dispatch = useDispatch();
  return (
    <div className={styles.cardscontainer}>
      {cards.map((card, index) => {
        return (
          <div
            key={index}
            type={card.type[0]}
            className={styles.card}
            select={`${card.selected}`}
            onClick={() => dispatch(setCardSelected(actualPlayer, index))}
          >
            {descartable && (
              <div
                className={styles.closebutton}
                onClick={() => {
                  Discard(id, card).then((res) => {
                    dispatch(descartar(res))
                  })
                }}
              >
                <Icon iconName='cancel' style={{ fontSize: 'medium' }} />
              </div>
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
