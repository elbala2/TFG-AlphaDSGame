import { Navbar, Container } from 'react-bootstrap';

import icon from '../../resources/Icon.png';

import Styles from './Styles/Header&Footer.module.scss'

const HeaderAndFooter = (props) => {
  return (
    <>
      <Navbar sticky='top' bg='dark' variant='dark' className={Styles.header}>
        <Container className='mx-5'>
          <Navbar.Brand href='/'><img src={icon} alt='icono' /> AlphaDSGame</Navbar.Brand>
        </Container>
      </Navbar>
      {props.children}
      <Navbar fixed='bottom' bg='dark' variant='dark' className={Styles.footer}>     
      </Navbar>
    </>
  );
};

export default HeaderAndFooter;
