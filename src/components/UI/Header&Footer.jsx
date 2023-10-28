import { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { ALLOWED_LANGS } from '../../stores/langStore/constants';
import icon from '../../resources/Icon.png';

import { fetchSetLanguage } from '../../stores/langStore/actions';

import Button from './Button';
import InstructionsModal from '../InstructionsModal';

import Styles from './Styles/Header&Footer.module.scss'

const HeaderAndFooter = ({
  lang,
  setLanguage,
  dictionary,
  children,
}) => {
  const [instructionsModalOpen, setInstructionsModalOpen] = useState(false);

  return (
    <>
      <header className={`bg-dark ${Styles.header}`}>
        <div className='mx-5'>
          <Link to='/' className={Styles.brand}>
            <img src={icon} alt='icono' />
            <h1>{dictionary.appName}</h1>
          </Link>
        </div>
        <div className='flex-fill' />
        <div className='mx-5'>
          <Button
            variants='outlined'
            className='p-1 rounded-circle'
            onClick={() => setInstructionsModalOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" height={28} width={28}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </svg>
          </Button>
          <InstructionsModal
            open={instructionsModalOpen}
            onClose={() => setInstructionsModalOpen(false)}
          />
        </div>
      </header>
      <main className='overflow-hidden position-relative viewPage'>
        {children}
      </main>
      <footer className={`bg-dark ${Styles.footer}`}>
        <div className='flex-fill' />
        <select
          className='me-3'
          value={lang}
          onChange={e => setLanguage(e.target.value)}
        >
          {ALLOWED_LANGS.map(l => (
            <option key={l} value={l}>{dictionary[l] ?? l}</option>
          ))}
        </select>
      </footer>
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