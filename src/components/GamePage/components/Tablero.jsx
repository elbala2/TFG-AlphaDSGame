import { setTarget } from '../../../Store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getMision, getSlabImg } from "../../../Store/GetSlabImg";
import { Droppable } from 'react-beautiful-dnd';

import conexion_borde from '../../../resources/border-conexion.png';

import Tooltip from '../../UI/Tooltip';

import styles from './Styles/Tablero.module.scss';

const Tablero = ({
  playerIndex,
}) => {
  const {  start, board, way } = useSelector(state => ({
    start: state.start,
    pos: state.pos,
    board: state.players[playerIndex].board,
    way: state.players[playerIndex].way,
  }))
  const dispatch = useDispatch();

  function isWayPart(x, y) {
    const xcoord = 0;
    const ycoord = 1;

    let res = false;
    way.every(step => {
      res = step[xcoord] === x && step[ycoord] === y;
      return !res;
    })
    return res;
  }

  function renderSlab(slab, x, y) {
    if (!slab) {
      return (
        <Droppable droppableId={`boardDrop_${y}-${x}`}>
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
      );
    }

    return !slab.isSpecial ? (
      <img
        className={styles.slab}
        rotation={slab.rotation}
        key={`img_${slab.id}`}
        id={`img_${slab.id}`}
        src={getSlabImg(slab)}
        alt={``}
        draggable={false}
        ishere={`${isWayPart(x, y)}`}
      />
    ) : (
      <>
        <h1 className={styles.title}>{slab.title}</h1>
        <Tooltip title={<p className={styles.descriptionTooltip}>{slab.description}</p>}>
          <p className={styles.description}>{slab.description}</p>
        </Tooltip>
        <img
          className={styles.slab}
          key={`img_${slab.id}`}
          id={`img_${slab.id}`}
          src={getSlabImg(slab)}
          alt={``}
          ishere={`${isWayPart(x, y)}`}
          draggable={false}
        />
      </>
    )
  }

  return (
    <div className={`${styles.rightBoardContainer}`}>
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
          src={getMision(playerIndex, board[0][2] !== null)}
          alt={`mision ${playerIndex}`}
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
                  {renderSlab(casilla, j, i)}
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
