import HeaderAndFooter from "../Header&Footer";
import Market from "./components/Market/Market";
import Cartas from "./components/Cartas";
import Tablero from "./components/Tablero";

import styles from './Main.module.scss';
import { Container, Button } from 'react-bootstrap';
import { Card } from '@material-ui/core/';

const GamePage = () => {
  return(
    <HeaderAndFooter>
      <Card className={styles.mainCard}>
        <div>
          <div className={styles.header}>
            <Container>
              <p className='h2'>Player x</p>
            </Container>
            <Button className='mx-3' variant='outline-success'>
              Trade
            </Button>
            <Button variant='outline-success'>Trade</Button>
          </div>
          <hr/>
          <Market />
          <Cartas/>
        </div>
        <Tablero />
      </Card>
    </HeaderAndFooter>
  )
}

export default GamePage;