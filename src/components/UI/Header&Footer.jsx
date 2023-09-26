import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { ALLOWED_LANGS } from '../../stores/langStore/constants';
import icon from '../../resources/Icon.png';

import { Navbar } from 'react-bootstrap';

import { fetchSetLanguage } from '../../stores/langStore/actions';

import Styles from './Styles/Header&Footer.module.scss'

const HeaderAndFooter = ({
  lang,
  setLanguage,
  dictionary,
  children,
}) => {
  return (
    <>
      <Navbar sticky='top' bg='dark' variant='dark' className={Styles.header}>
        <div className='mx-5'>
          <Navbar.Brand href='/'><img src={icon} alt='icono' />{dictionary.appName}</Navbar.Brand>
        </div>
      </Navbar>
      {children}
      <Navbar fixed='bottom' bg='dark' variant='dark' className={Styles.footer}>
        <div className='flex-fill' />
        <select
          className='me-3'
          value={lang}
          onChange={e => setLanguage(e.target.value)}
        >
          {ALLOWED_LANGS.map(l => (
            <option value={l}>{dictionary[l] ?? l}</option>
          ))}
        </select>  
      </Navbar>
    </>
  );
};

function stateToProps(state) {
  return {
    lang: state.lang.lang,
    dictionary: state.lang.dictionary.utils,
  };
}

function dispatchToProps(dispatch) {
  return {
    setLanguage: bindActionCreators(fetchSetLanguage, dispatch),
  };
}

export default connect(stateToProps, dispatchToProps)(HeaderAndFooter);