import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import { reducer as currentUserReducer } from "../ducks/currentUser";
import { reducer as customersReducer } from "../ducks/customers";
import { reducer as entitiesReducer } from "../ducks/entities";

const rootReducers = combineReducers({
  currentUser: currentUserReducer,
  customers: customersReducer,
  entities: entitiesReducer,
});

export type StoreState = ReturnType<typeof rootReducers>;

export default createStore(rootReducers, applyMiddleware(thunk, logger));
