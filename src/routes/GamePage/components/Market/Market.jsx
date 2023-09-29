/* eslint-disable default-case */
import { connect } from 'react-redux';
import { useState } from 'react';

import RiskContainer from './RiskContainer';
import MarketContainer from './MarketContainer';

import icon from '../../../../resources/Icon.png';
import Modal from '../../../../components/UI/Modal';

import './Styles/styles.scss'

const Market = ({
  normalMarket,
  specialMarket,
  dictionary,
}) => {

  const [open, setOpen] = useState(true);

  const hasRisk = !!specialMarket.find(f => f.isRisk);

  return (
    <>
      <div className='market'>
        <div className='text-center'>
          <img src={icon} alt='icono' style={{ userSelect: 'none' }}/>
        </div>
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
      <Modal
        isOpen={open && specialMarket.find(f => f.isRisk) !== undefined}
        onClose={() => setOpen(false)}
        title='Informacion importante'
      >
        <div className='riskModal'>
          <p className='text'>{dictionary.riskMsg}</p>
        </div>
      </Modal>
    </>
  );
};

function stateToProps(state) {
  return {
    normalMarket: state.game.normalMarket,
    specialMarket: state.game.specialMarket,

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