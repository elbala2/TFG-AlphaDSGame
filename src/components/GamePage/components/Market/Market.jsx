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
  const { normal, special } = useSelector((state) => state.market);
  const [open, setOpen] = useState(true);

  return (
    <div className={styles.market}>
      <div align='center'>
        <img src={icon} alt='icono' style={{ userSelect: 'none' }}/>
      </div>
      <div className={styles.marketContainer}>
        <div className={`d-flex ${styles.normalMarketContainer}`}>
          {normal.casillas.map((casilla, i) => {
            return (
              <div key={i}>
                <MarketContainer disabled={special.casillas.find(f => f.isRisk) !== undefined} index={i} casilla={casilla}/>
              </div>
            );
          })}
        </div>
        <div className='d-flex'>
          {special.casillas.map((casilla, i) => {
            return (
              <div key={i + 4}>
                {casilla.isRisk 
                  ? <RiskContainer index={i + 4} casilla={casilla}/>
                  : <SpecialContainer disabled={special.casillas.find(f => f.isRisk) !== undefined} index={i + 4} casilla={casilla}/>
                }
              </div>
            );
          })}
          <Modal
            isOpen={open && special.casillas.find(f => f.isRisk) !== undefined}
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
