import Mision_1 from '../../../resources/Misiones/Mision_1.png';
import conexion_borde from '../../../resources/border-conexion.png';
import { useDispatch, useSelector, useStore } from 'react-redux';
import store from '../../../Store/StoreContent';
import { getSlabImg } from "../../../Store/GetSlabImg";

import styles from './Tablero.module.scss';
import { setTarget } from '../../../Store/actions';

const Tablero = () => {
  const { tablero: { casillas, inicio } } = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <div className='d-flex'>
      <div className={`${styles.bordecontainer}`}>
        <div className={`${styles.bordecontainerSpace}`} />
        {casillas.map((fila, i) => {
          return (
            <div key={`borde${i}`} className={`${styles.bordecontainerZone}`}>
              {inicio === i && (
                <img
                  className={styles.conexion}
                  key='cnx1'
                  src={conexion_borde}
                  draggable='false'
                  alt='conexion'
                />
              )}
            </div>
          );
        })}
      </div>
      <div className='p-0'>
        <img
          draggable='false'
          src={Mision_1}
          alt='mision'
          className={`${styles.misionImg}`}
        />
        <div className={`${styles.tablero}`}>
          {casillas.map((fila, i) => {
            return fila.map((casilla, j) => {
              return (
                <div
                  className={`${styles.slabChessContainer}`}
                  onDragOver={(event) => {
                    if (!casilla)
                      event.preventDefault();
                  }}
                  onDrop={() => {
                    if (!casilla)
                      dispatch(setTarget([ i, j ]));
                  }}
                >
                  {casilla && (
                    <img
                      className={styles.slab}
                      rotation={casilla.rotation}
                      key={`img_${casilla.id}`}
                      id={`img_${casilla.id}`}
                      src={getSlabImg(casilla)}
                      alt={``}
                      draggable={false}
                    />
                  )}
                </div>
              );
            });
          })}
        </div>
      </div>
    </div>
  );
};

export default Tablero;
