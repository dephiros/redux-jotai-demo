import { Dispatch } from "redux";

import type { CurrentUserAPIInterface } from "../../../interfaces/User";
import type { CustomerAPIInterface } from "../../../interfaces/Customer";
export interface EntityState {
  users: Record<string, CurrentUserAPIInterface>;
  customers: Record<string, CustomerAPIInterface>;
}

function getInitialState(): EntityState {
  return {
    users: {},
    customers: {},
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
            entities.map((entity: { pk: () => string }) => [
              entity.pk(),
              entity,
            ])
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
  entities: Array<CurrentUserAPIInterface | CustomerAPIInterface>
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
