import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'

import { connect } from 'react-redux'

import Button from '../../../components/UI/Button';
import Cards from '../../../components/Cards';

import mainStyles from '../Main.module.scss';
import tradeStyles from './Styles/tradeModal.module.scss';
import styles from './Styles/rigthUI.module.scss';

import Modal from '../../../components/UI/Modal';
import { bindActionCreators } from 'redux';
import { acceptTrade, clearSelected } from '../../../stores/gameStore/actions';
import Card from '../../../components/Cards/Card';
import { TradeCards } from '../../../utils/ApiConf';
import { useParams } from 'react-router-dom';

function TradeUI({
  onCancel,
  tradePlayers,
  player,
  dictionary,

  acceptTrade,
  clearSelected,
}) {
  const { id } = useParams();
  useEffect(() => {
    clearSelected();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [selectedPlayer, setSelectedPlayer] = useState();
  const [onTrade, setOnTrade] = useState(false);

  const selectedTradePlayer = tradePlayers.find(p => p.cards.find(c => c.selected))
  return (
    <div className={`${mainStyles.halfCard} col-lg-6`}>
      <div className={`${styles.boardUI}`}>
        <div className='d-flex'>
          <h3 className={`${tradeStyles.title}`}>{dictionary.trade}</h3>
          <div className='flex-fill' />
        </div>
        <div className={`${tradeStyles.tradePlayerBoxContainer}`}>
          {!tradePlayers.filter(p => p.cards.length).length && (
            <h4 className=''>
              <b>
                {dictionary.noPlayersToTrade}
              </b>
            </h4>
          )}
          {tradePlayers
          .filter(p => p.cards.length)
          .map((player) => {
            return (
              <div
                key={player.id}
                className={`p-3 rounded-4 shadow bgColor
                  ${tradeStyles.tradePlayerBox}
                  ${selectedPlayer?.id === player.id ? tradeStyles.tradePlayerBoxSelected : ''}
                `}
                type={player.color}
                onClick={(e) => {
                  if (selectedPlayer?.id === player.id) return;
                  clearSelected();
                  setSelectedPlayer(player);
                  e.stopPropagation();
                }}
              >
                <h2>{player.name}</h2>
                <div className='p-3'>
                  <Cards
                    playerIndex={player.id}
                    className={`
                      ${selectedPlayer?.id === player.id ? 'medium' : 'small'}
                    `}
                    disabled={player.id !== selectedPlayer?.id || (selectedTradePlayer && player.id !== selectedTradePlayer.id)}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className={`${tradeStyles.tradeFooter}`}>
          <div className='flex-fill' />
          <Button
            variants='secondary'
            className='me-3'
            onClick={() => onCancel()}
          >
            {dictionary.cancel}
          </Button>
          <Button
            onClick={() => setOnTrade(true)}
            disabled={player.cards.filter(c => c.selected).length !== selectedTradePlayer?.cards.filter(c => c.selected).length}
          >
            {dictionary.offer}
          </Button>
        </div>
      </div>
      <Modal
        isOpen={onTrade}
        onClose={() => setOnTrade(false)}
        title={dictionary.trade}
      >
        <p>{dictionary.onTradeAcceptQst}</p>
        <div className={`${tradeStyles.tradeCardsContainer}`}>
          <div className={`${tradeStyles.tradeCards} bgColor rounded-3`} type={player.color}>
            {player.cards.filter(c => c.selected).map(c => (
              <Card
                key={c.id}
                card={{
                  ...c,
                  selected: false,
                }}
                className='mx-2 medium'
              />
            ))}
          </div>
          <div className={`${tradeStyles.exChangeIcon}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
            </svg>
          </div>
          <div className={`${tradeStyles.tradeCards} bgColor rounded-3`} type={selectedTradePlayer?.color}>
            {selectedTradePlayer?.cards.filter(c => c.selected).map(c => (
              <Card
                key={c.id}
                card={{
                  ...c,
                  selected: false,
                }}
                className='mx-2 medium'
              />
            ))}
          </div>
        </div>
        <div className='d-flex pt-3'>
          <div className='flex-fill' />
          <Button
            variants='secondary'
            className='me-3'
            onClick={() => {
              setOnTrade(false);
              onCancel();
            }}
          >
            {dictionary.cancel}
          </Button>
          <Button
            onClick={() => {
              TradeCards(id, player, selectedTradePlayer)
                .then((res) => {
                  acceptTrade(res);
                  clearSelected();
                  setOnTrade(false);
                  onCancel();
                })
            }}
          >
            {dictionary.accept}
          </Button>
        </div>
      </Modal>
    </div>
  )
}

TradeUI.propTypes = {
  onCancel: PropTypes.func.isRequired,
  tradePlayers: PropTypes.array.isRequired,
  player: PropTypes.object.isRequired,
  dictionary: PropTypes.object.isRequired,

  acceptTrade: PropTypes.func.isRequired,
  clearSelected: PropTypes.func.isRequired,
}

function mapStateToProps(state, { playerIndex }) {
  return ({
    tradePlayers: state.game.players.filter((p, i) => i !== playerIndex),
    player: state.game.players[playerIndex],

    dictionary: {
      ...state.lang.dictionary.tradeModal,
      ...state.lang.dictionary.utils,
    },
  });
}

function mapDispatchToProps(dispatch) {
  return ({
    clearSelected: bindActionCreators(clearSelected, dispatch),
    acceptTrade: bindActionCreators(acceptTrade, dispatch),
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(TradeUI)