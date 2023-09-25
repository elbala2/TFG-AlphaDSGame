const reducerCode = 'lang';

export const INIT_LANGUAGE = 'INIT_LANGUAGE';
export const SET_LANGUAGE = 'SET_LANGUAGE';

export function fetchInitiateLanguage() {
  return {
    reducer: reducerCode,
    type: INIT_LANGUAGE,
  }
}

export function fetchSetLanguage(lang) {
  return {
    reducer: reducerCode,
    type: SET_LANGUAGE,
    lang,
  }
}