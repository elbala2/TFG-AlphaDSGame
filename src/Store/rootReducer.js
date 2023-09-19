import initialState from "./InitialState";

import lang from '../langStore'

const reducers = {
  lang,
}

const rootReducer = (state = initialState, action) => {
  const { reducer } = action;
  return {
    ...state,
    [action.reducer]: reducers[reducer](state[reducer], action)
  }
}