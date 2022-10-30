/* eslint-disable default-case */
import { useSelector } from 'react-redux';
import { useState } from 'react';

import RiskContainer from './RiskContainer';
import MarketContainer from './MarketContainer';
import SpecialContainer from './SpecialContainer';
import { Modal } from '@fluentui/react';

import styles from './Styles/Market.module.scss';
import icon from '../../../../resources/Icon.png';

const Market = () => {
  const { normalMarket, specialMarket } = useSelector((state) => state);
  const [open, setOpen] = useState(true);

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
                <MarketContainer disabled={specialMarket.find(f => f.isRisk) !== undefined} index={i} slab={slab}/>
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
                  : <SpecialContainer disabled={specialMarket.find(f => f.isRisk) !== undefined} index={i + 4} slab={slab}/>
                }
              </div>
            );
          })}
          <Modal
            isOpen={open && specialMarket.find(f => f.isRisk) !== undefined}
            onDismiss={() => setOpen(false)}
          >
            <div className={styles.modal}>
              <h1>Informacion importante</h1>
              <p className={styles.text}>El juego se pausara hasta que se resuelva el riesgo.</p>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Market;
