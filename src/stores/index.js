import { combineReducers, createStore } from "redux"
import lang from './langStore'
import game from './gameStore'

const rootReducer = combineReducers({
  lang,
  game,
});

const store = createStore(rootReducer);

export default store;