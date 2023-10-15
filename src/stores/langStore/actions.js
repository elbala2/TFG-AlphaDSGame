
export const SET_LANGUAGE = 'SET_LANGUAGE';

export function fetchSetLanguage(lang) {
  return {
    type: SET_LANGUAGE,
    lang,
  }
}