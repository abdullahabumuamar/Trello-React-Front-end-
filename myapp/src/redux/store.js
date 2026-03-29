import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import boardReducer from './reducers/boardReducer';
import columnReducer from './reducers/columnReducer';
import cardReducer from './reducers/cardReducer';
//Setting up the store structure
const rootReducer = combineReducers({
  boards: boardReducer,
  columns: columnReducer,
  cards: cardReducer,
});
//This creates the Redux store
const store = createStore(
  rootReducer,
  applyMiddleware(thunk) // for handling async actions
);

export default store; 