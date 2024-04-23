/* eslint-disable default-case */
import { connect } from 'react-redux';

import RiskContainer from './RiskContainer';
import MarketContainer from './MarketContainer';

import icon from '../../../../resources/Icon.png';

import './Styles/styles.scss'

const Market = ({
  normalMarket,
  specialMarket,
  riskNumber,
}) => {
  return (
    <>
      <div className='market'>
        <img src={icon} className='marketLogo' alt='icono' style={{ userSelect: 'none' }}/>
        <div className='slabListContainer'>
          {normalMarket?.map((slab, i) => {
            return (
              <MarketContainer key={i} disabled={riskNumber} index={i} slab={slab}/>
            );
          })}
          {specialMarket.map((slab, i) => {
            return (
              slab.isRisk 
                ? <RiskContainer key={slab.id} risk={slab}/>
                : <MarketContainer key={slab.id} disabled={riskNumber} slab={slab}/>
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
    riskNumber: state.game.riskNumber,

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