import { Dispatch } from "redux";

import { User } from "./../../../interfaces/User";
import { Customer } from "./../../../interfaces/Customer";
export interface EntityState {
  user: Record<string, User>;
  customer: Record<string, Customer>;
}

function getInitialState(): EntityState {
  return {
    user: {},
    customer: {},
  };
}

export function reducer(state = getInitialState(), action: any) {
  // this is done through utility in the real app
  switch (action.type) {
    case "updateEntity": {
      const entityType = action.entityType;
      const entities = action.entities;
      const newState = {
        ...state,
        ...{
          // very naive implementation of normalizing data
          [entityType]: Object.fromEntries(
            entities.map((entity) => [entity.id, entity])
          ),
        },
      };
      return newState;
    }
    default:
      return state;
  }
}

export function updateEntityActionCreator(
  entityType: keyof EntityState,
  entities: any[]
) {
  return async (dispatch: Dispatch) => {
    // we have a utility for this in the real app
    // ignore error for now
    dispatch({
      type: "updateEntity",
      entityType,
      entities,
    });
  };
}
