import { Navbar, Container } from 'react-bootstrap';

import icon from '../resources/Icon.png';

const HeaderAndFooter = (props) => {
  return (
    <>
      <Navbar sticky='top' bg='dark' variant='dark'>
        <Container className='mx-5'>
          <Navbar.Brand href='/'><img src={icon} alt='icono' /> AlphaDSGame</Navbar.Brand>
        </Container>
      </Navbar>
      <div className='d-flex align-items-center justify-content-center'>
        {props.children}
      </div>
      <Navbar fixed='bottom' bg='dark' variant='dark'>     
      </Navbar>
    </>
  );
};

export default HeaderAndFooter;
