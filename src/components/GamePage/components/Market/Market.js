/* eslint-disable default-case */
import { useSelector } from 'react-redux';

import styles from './Market.module.scss';
import MarketContainer from './MarketContainer';

import icon from '../../../../resources/Icon.png';

const Market = (props) => {
  const { normal, special } = useSelector((state) => state.market);

  return (
    <div className={styles.market}>
      <div align='center'>
        <img src={icon} alt='icono' />
      </div>
      <div className={styles.marketContainer}>
        <div className={`d-flex ${styles.normalMarketContainer}`}>
          {normal.casillas.map((casilla, i) => {
            return <> {casilla && <MarketContainer index={i} />} </>;
          })}
        </div>
        <div className='d-flex'>
          {special.casillas.map((casilla, i) => {
            return <> {casilla && <MarketContainer index={i + 4} />} </>;
          })}
        </div>
      </div>
    </div>
  );
};

export default Market;
