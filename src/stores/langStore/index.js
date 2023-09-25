import { INIT_LANGUAGE, SET_LANGUAGE } from "./actions";

const initialState = {
  lang: window.navigator.language || window.navigator.userLanguage,
}

export default function langReducer(state = initialState, action) {
  const { type, lang } = action;

  switch (type) {
    case INIT_LANGUAGE:
      const InitialLiterals = require(`./languages/${state.lang}`)
      return {
        ...state,
        literals: InitialLiterals[state.lang],
      }

    case SET_LANGUAGE:
      const newLiterals = require(`./languages/${lang}`)
      return {
        ...state,
        literals: newLiterals[lang],
      }
    default:
      return state;
  }
}