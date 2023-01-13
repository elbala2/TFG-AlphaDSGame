import { setTarget } from '../../../Store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getMision, getSlabImg } from "../../../Store/GetSlabImg";
import { Tooltip } from '@material-ui/core';

import conexion_borde from '../../../resources/border-conexion.png';

import styles from './Styles/Tablero.module.scss';
import { Droppable } from 'react-beautiful-dnd';

const Tablero = () => {
  const {  start, actualPlayer, pos } = useSelector(state => state)
  const { board, completed } = useSelector(state => state.players[actualPlayer])
  const dispatch = useDispatch();

  return (
    <div className='d-flex'>
      <div className={`${styles.bordecontainer}`}>
        <div className={`${styles.bordecontainerSpace}`} />
        {board.map((fila, i) => {
          return (
            <div key={`borde${i}`} className={`${styles.bordecontainerZone}`}>
              {start === i && (
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
      <div>
        <img
          draggable='false'
          src={getMision(actualPlayer, completed)}
          alt={`mision ${actualPlayer}`}
          className={`${styles.misionImg}`}
        />
        <div className={`${styles.board}`}>
          {board.map((fila, i) => {
            return fila.map((casilla, j) => {
              return (
                <div
                  key={`fila${j}`}
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
                  {casilla ? (
                    !casilla.isSpecial ? (
                      <img
                        className={styles.slab}
                        rotation={casilla.rotation}
                        key={`img_${casilla.id}`}
                        id={`img_${casilla.id}`}
                        src={getSlabImg(casilla)}
                        alt={``}
                        draggable={false}
                        ishere={`${pos ? i === pos[0] && j === pos[1] && actualPlayer === pos[2] : false}`}
                      />
                    ) : (
                      <>
                        <h1 className={styles.title}>{casilla.title}</h1>
                        <Tooltip title={<p className={styles.descriptionTooltip}>{casilla.description}</p>}>
                          <p className={styles.description}>{casilla.description}</p>
                        </Tooltip>
                        <img
                          className={styles.slab}
                          key={`img_${casilla.id}`}
                          id={`img_${casilla.id}`}
                          src={getSlabImg(casilla)}
                          alt={``}
                          ishere={`${pos ? i === pos[0] && j === pos[1] && actualPlayer === pos[2] : false}`}
                          draggable={false}
                        />
                      </>
                    )
                  ) : (
                    <Droppable droppableId={`boardDrop_${i}, ${j}`}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className='h-100 w-100'
                        >
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
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
