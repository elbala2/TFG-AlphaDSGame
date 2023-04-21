import { useDispatch, useSelector } from 'react-redux';
import { aceptTrade, clearCardConfig, setCardConfig } from '../../../Store/actions';

import Cartas from './Cartas';

import styles from './Styles/tradeModal.module.scss';
import { TradeCards } from '../../../utils/ApiConf';
import Button from '../../UI/Button';
import Modal from '../../UI/Modal';

const TradeBotModal = () => {
  const dispatch = useDispatch();
  const { players, id, cardConfig, actualPlayer } = useSelector((state) => ({ players: state.players, id: state.id, actualPlayer: state.actualPlayer, cardConfig: state.cardConfig }));

  async function handleTrade() {
    const tradePlayers = players.filter(f => f.cards.find(f => f.selected) !== undefined);
    if (tradePlayers.length === 2) {
      await TradeCards(id, tradePlayers[0], tradePlayers[1])
        .then((res) => {
          dispatch(aceptTrade(res));
          dispatch(clearCardConfig());
        })
    }
  }

  console.log('🚀 ~ file: TradeBotModal.jsx:26 ~ TradeBotModal ~ cardConfig:', cardConfig);
  return (
    <Modal
      isOpen={cardConfig.length}
      onClose={() => dispatch(setCardConfig(cardConfig.slice(1, cardConfig.length)))}
      title='Seleccione las cartas que quiere intercambiar'
    >
      <div className={styles.modalContainer}>
        <div className={styles.playersContainer}>
          {players.map((player, index) => {
            return (
              <div className={styles.playerContainer} id={index} key={player.id} type={index}>
                <h3 className={styles.title}>{player.name}</h3>
                <div className={styles.playerCardsContainer}>
                  <Cartas
                    actualPlayer={index}
                    titleStyles={{ fontSize: 'smaller' }}
                    blocked={actualPlayer === index ? cardConfig[0]?.blocked : []}
                    selected={cardConfig[0]?.needed.find(x => x.player === player.id)?.cards ?? []}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.modalbuttoncontainer}>
          <Button
            variants='outlined secondary'
            onClick={() => dispatch(setCardConfig(cardConfig.slice(1, cardConfig.length)))}
          >
            Cancelar
          </Button>
          <Button
            variants='primary'
            onClick={handleTrade}
          >
            Aceptar
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default TradeBotModal;
