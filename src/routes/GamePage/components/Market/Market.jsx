/* eslint-disable default-case */
import { connect } from 'react-redux';
import { useState } from 'react';

import RiskContainer from './RiskContainer';
import MarketContainer from './MarketContainer';

import icon from '../../../../resources/Icon.png';

import './Styles/styles.scss'

const Market = ({
  normalMarket,
  specialMarket,
  hasRisk,
}) => {
  return (
    <>
      <div className='market'>
        <img src={icon} className='marketLogo' alt='icono' style={{ userSelect: 'none' }}/>
        <div className='slabListContainer'>
          {normalMarket?.map((slab, i) => {
            return (
              <MarketContainer key={i} disabled={hasRisk} index={i} slab={slab}/>
            );
          })}
          {specialMarket.map((slab, i) => {
            return (
              slab.isRisk 
                ? <RiskContainer key={i + 4} index={i + 4} slab={slab}/>
                : <MarketContainer key={i + 4} disabled={hasRisk} index={i + 4} slab={slab}/>
            );
          })}
        </div>
      </div>
    </>
  );
};

function stateToProps(state) {
  return {
    normalMarket: state.game.normalMarket,
    specialMarket: state.game.specialMarket,
    hasRisk: state.game.hasRisk,

    dictionary: {
      ...state.lang.dictionary.market,
      ...state.lang.dictionary.utils,
    },
  };
}

function dispatchToProps() {
  return {
  };
}

export default connect(stateToProps, dispatchToProps)(Market);