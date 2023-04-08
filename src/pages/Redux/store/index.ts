import { combineReducers, createStore, applyMiddleware } from "redux";

import thunk from 'redux-thunk'
import { reducer as currentUserReducer } from '../ducks/currentUser';
import { reducer as customersReducer } from '../ducks/customers';
import { reducer as entitiesReducer } from '../ducks/entities';

const rootReducers = combineReducers({
  currentUser: currentUserReducer,
  customers: customersReducer,
  entities: entitiesReducer
});

export default createStore(rootReducers, applyMiddleware(thunk));