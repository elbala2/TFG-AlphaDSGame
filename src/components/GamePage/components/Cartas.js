import styles from './Cartas.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getCardIMG } from '../../../Store/GetSlabImg';
import { setCardSelected } from '../../../Store/actions';

const Cartas = () => {
  const cartas = useSelector((state) => state.cartas);
  const dispatch = useDispatch();
  return (
    <div className={styles.cardscontainer}>
      {cartas.map((carta, index) => {
        return (
          <div className={styles.cardBorder} select={`${carta.selected}`}>
            <div
              className={styles.card}
              select={`${carta.selected}`}
              type={carta.type[0]}
              onClick={() => dispatch(setCardSelected(carta))}
            >
              <p className={styles.title}>{carta.type[0]}</p>
              <img
                className={styles.imagen}
                src={getCardIMG(carta.type)}
                alt='card'
                draggable={false}
              />
              <p className={styles.title}>{carta.type[1]}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cartas;
