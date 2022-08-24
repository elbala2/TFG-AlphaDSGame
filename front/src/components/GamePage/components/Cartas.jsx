import styles from './Styles/Cartas.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getCardIMG } from '../../../Store/GetSlabImg';
import { descartar, setCardSelected } from '../../../Store/actions';
import { Icon } from '@fluentui/react';

const Cartas = ({actualplayer, titleStyles, descartable = false}) => {
  const cartas = useSelector(
    (state) => state.players[actualplayer].cartas
  );
  const dispatch = useDispatch();
  return (
    <div className={styles.cardscontainer}>
      {cartas.map((carta, index) => {
        return (
          <div
            key={index}
            type={carta.type[0]}
            className={styles.card}
            select={`${carta.selected}`}
            onClick={() => dispatch(setCardSelected(actualplayer, index))}
          >
            {descartable && (
              <div
                className={styles.closebutton}
                onClick={() => {
                  dispatch(descartar(index))
                  dispatch(setCardSelected(actualplayer, index))
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
