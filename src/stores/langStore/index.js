import { SET_LANGUAGE } from "./actions";

import ESLiterals from './languages/es';
import ENLiterals from './languages/en';

import { ALLOWED_LANGS, EN, ES } from "./constants";

const langDict = {
  [ES]: ESLiterals,
  [EN]: ENLiterals,
};

const getInitialState = () => {
  let lang = window.navigator.language ?? window.navigator.userLanguage;
  if (!ALLOWED_LANGS.includes(lang)) lang = EN;
  return ({
    lang,
    dictionary: langDict[lang],
  });
}

export default function langReducer(state = getInitialState(), action) {
  const { type, lang } = action;

  switch (type) {
    case SET_LANGUAGE:
      return {
        ...state,
        lang,
        dictionary: langDict[lang],
      }
    default:
      return state;
  }
}