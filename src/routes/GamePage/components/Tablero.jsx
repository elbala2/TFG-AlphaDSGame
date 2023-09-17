import { isEmpty } from 'lodash'
import { setTarget } from '../../../Store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getMision, getSlabImg } from "../../../Store/GetSlabImg";
import { Droppable } from 'react-beautiful-dnd';

import Tooltip from '../../../components/UI/Tooltip';

import styles from './Styles/Tablero.module.scss';
import Cable from '../../../components/UI/Cable';

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

  function getRotatedLinks(slab) {
    //arriba,derecha,abajo,izquierda
    const result = [...slab.links];
    for(let i = 0; i < slab.rotation; i += 1) {
      result.splice(0, 0, result.splice(-1, 1)[0]);
    }
    return result;
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

    function getSlabProps(x, y, slab) {
      const res = {};
      if (['GOLDEN', 'SILVER'].includes(slab.type)) res.rect = slab.type;
      if (isWayPart(x, y)) res.lineColor = '#f5e83b'
      return res;
    }

    if (isEmpty(slab)) return '';

    return !slab.isSpecial ? (
      <>
        {slab.type?.includes('Start') ? (
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
          <Cable
            links={getRotatedLinks(slab)}
            {...getSlabProps(x, y, slab)}
          />
        )}
      </>
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
    <div className={`${styles.boardUI}`}>
      <div className={`${styles.boardHeader}`}>
        <div className='d-flex flex-fill'>
          <div className={`${styles.cableContainer}`}>
            <Cable
              links={[1, 0, 1, 0]}
              />
          </div>
          <div className='flex-fill'>
            <div className='p-5'>
              <h3><b>Misión</b></h3>
              <p>{board[0][2] ? 'mision Completada' : 'mi mision'}</p>
            </div>
          </div>
        </div>
        <div className='d-flex'>
          <div className={`${styles.cableContainer}`}>
            <Cable
              links={[1, 1, 0, 0]}
              />
          </div>
          <div className={`${styles.longCableContainer}`}>
            <Cable
              links={[0, 1, 0, 1]}
              />
          </div>
          <div className={`${styles.longCableContainer}`}>
            <Cable
              links={[0, 1, 0, 1]}
              />
          </div>
          <div className={`${styles.longCableContainer}`}>
            <Cable
              links={[0, 0, 1, 1]}
              />
          </div>
        </div>
        {/* <img
          draggable='false'
          src={getMision(playerIndex, board[0][2] !== null)}
          alt={`mision ${playerIndex}`}
        /> */}
      </div>
      <div className={`${styles.boardBody}`}>
        <div className={`${styles.boardCables}`}>
          {board.map((f, i) => {
            return (
              <>
                {start > i && <div key={`borde${i}`} className={`${styles.space}`} />}
                {start === i && (
                  <div key={`borde${i}`} className={`${styles.space}`}>
                    <Cable
                      links={[0, 1, 1, 0]}
                    />
                  </div>
                )}
                {start + 1 === i && (
                  <div className={`${styles.conexion}`}>
                    <Cable
                      links={[1, 0, 1, 0]}
                      key={`borde${i} `}
                    />
                  </div>
                )}
              </>
            );
          })}
        </div>
        <div className='d-flex flex-column'>
          <div className={`${styles.board}`}>
            {board.map((f, i) => {
              return (
                <div key={`col${i}`} className={`${styles.boardRow}`}>
                  {f.map((casilla, j) => {
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
                  })}
                </div>
              );          
            })}
          </div>
        </div>
        <div className={`${styles.boardCables}`} />
      </div>
    </div>
  );
};

export default Tablero;
