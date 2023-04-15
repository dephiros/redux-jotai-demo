import { User } from "./../../../interfaces/User";
import { Dispatch } from "redux";

function getInitialState() {
  return {
    user: {} as Record<string, User>,
    customer: {} as Record<string, Customer>,
  };
}

export function reducer(state: typeof INITIAL_STATE, action: any) {
  // this is done through utility in the real app
  switch (action.type) {
    case "updateEntity": {
      const entityType = action.entityType;
      const entities = action.entities;
      const newState = {
        ...state,
        ...{
          [entityType]: Object.fromEntries(
            entities.map((entity) => [entity.id, entity])
          ),
        },
      };
      return newState;
    }
    default:
      return state | getInitialState();
  }
}

export function updateEntityActionCreator(entityType: string, entities: any[]) {
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
