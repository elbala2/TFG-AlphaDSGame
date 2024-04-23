import { combineReducers, compose, createStore } from "redux"
import lang from './langStore'
import game from './gameStore'

const rootReducer = combineReducers({
  lang,
  game,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers());

export default store;