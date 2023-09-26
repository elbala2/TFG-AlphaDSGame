/* eslint-disable default-case */
import { connect } from 'react-redux';
import { useState } from 'react';

import RiskContainer from './RiskContainer';
import MarketContainer from './MarketContainer';
import SpecialContainer from './SpecialContainer';

import styles from './Styles/Market.module.scss';
import icon from '../../../../resources/Icon.png';
import Modal from '../../../../components/UI/Modal';

const Market = ({
  normalMarket,
  specialMarket,
}) => {

  const [open, setOpen] = useState(true);

  const hasRisk = !!specialMarket.find(f => f.isRisk);

  return (
    <div className={styles.market}>
      <div align='center'>
        <img src={icon} alt='icono' style={{ userSelect: 'none' }}/>
      </div>
      <div className={styles.marketContainer}>
        <div className={`d-flex ${styles.normalMarketContainer}`}>
          {normalMarket?.map((slab, i) => {
            return (
              <div key={i}>
                <MarketContainer disabled={hasRisk} index={i} slab={slab}/>
              </div>
            );
          })}
        </div>
        <div className='d-flex'>
          {specialMarket.map((slab, i) => {
            return (
              <div key={i + 4}>
                {slab.isRisk 
                  ? <RiskContainer index={i + 4} slab={slab}/>
                  : <SpecialContainer disabled={hasRisk} index={i + 4} slab={slab}/>
                }
              </div>
            );
          })}
          <Modal
            isOpen={open && specialMarket.find(f => f.isRisk) !== undefined}
            onClose={() => setOpen(false)}
            title='Informacion importante'
          >
            <div className={styles.modal}>
              <p className={styles.text}>El juego se pausara hasta que se resuelva el riesgo.</p>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

function stateToProps(state) {
  return {
    normalMarket: state.game.normalMarket,
    specialMarket: state.game.specialMarket,
  };
}

function dispatchToProps() {
  return {
  };
}

export default connect(stateToProps, dispatchToProps)(Market);