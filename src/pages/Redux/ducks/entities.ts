import { Dispatch } from 'redux';

const INITIAL_STATE = {
  users: {},
  customers: {},
};

export function reducer(state: any, action: any) {
  // this is done through utility in the real app
  switch (action.type) {
    case 'updateEntity': {
      const entityType = action.entityType;
      const entity = action.entity;
      return {
        state,
        ...{
          [entityType]: {
            ...state[entityType],
            [entity.id]: entity,
          },
        },
      };
    }
    default:
      return { ...INITIAL_STATE, ...state };
  }
}

export function updateEntityActionCreator(entityType: string, entity: any) {
  return async (dispatch: Dispatch) => {
    // we have a utility for this in the real app
    // ignore error for now
    dispatch({
      type: 'updateEntity',
      entityType,
      entity,
    });
  };
}
