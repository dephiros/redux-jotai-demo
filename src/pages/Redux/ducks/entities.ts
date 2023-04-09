import { Dispatch } from "redux";

const INITIAL_STATE = {
  user: {},
  customer: {},
};

export function reducer(state: any, action: any) {
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
      return { ...INITIAL_STATE, ...state };
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
