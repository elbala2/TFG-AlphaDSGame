import styles from './Styles/Cartas.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getCardIMG } from '../../../Store/GetSlabImg';
import { descartar, setCardSelected } from '../../../Store/actions';
import { Icon } from '@fluentui/react';

const Cartas = ({actualPlayer, titleStyles, descartable = false}) => {
  const cards = useSelector(
    (state) => state.players[actualPlayer].cards
  );
  const dispatch = useDispatch();
  return (
    <div className={styles.cardscontainer}>
      {cards.map((carta, index) => {
        return (
          <div
            key={index}
            type={carta.type[0]}
            className={styles.card}
            select={`${carta.selected}`}
            onClick={() => dispatch(setCardSelected(actualPlayer, index))}
          >
            {descartable && (
              <div
                className={styles.closebutton}
                onClick={() => {
                  dispatch(descartar(index))
                  dispatch(setCardSelected(actualPlayer, index))
                }}
              >
                <Icon iconName='cancel' style={{ fontSize: 'medium' }} />
              </div>
            )}
            <p className={styles.title} style={titleStyles}>{carta.type[0]}</p>
            <img
              alt='card'
              draggable={false}
              className={styles.imagen}
              src={getCardIMG(carta.type)}
            />
            <p className={styles.title} style={titleStyles}>{carta.type[1]}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Cartas;
