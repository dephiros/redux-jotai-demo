import { Dispatch } from "redux";
import { Entity, schema } from "@rest-hooks/rest";
import { normalize } from "@rest-hooks/normalizr";

import type { CurrentUserAPIInterface } from "../../../interfaces/User";
import type { CustomerAPIInterface } from "../../../interfaces/Customer";
export interface EntityStore
  extends Record<string, Record<string, any> | undefined> {
  User?: Record<string, CurrentUserAPIInterface>;
  Customer?: Record<string, CustomerAPIInterface>;
}

function getInitialState(): EntityStore {
  return {
    User: {},
    Customer: {},
  };
}

type EntityStoreAction = {
  type: "updateEntity";
  EntityClass: typeof Entity;
  resources: Array<any>;
};

export function reducer(state = getInitialState(), action: EntityStoreAction) {
  // this is done through utility in the real app
  switch (action.type) {
    case "updateEntity": {
      return normalize<schema.Array<typeof action.EntityClass>, EntityStore>(
        action.resources,
        new schema.Array(action.EntityClass),
        state
      ).entities;
    }
    default:
      return state;
  }
}

export function updateEntityActionCreator(
  EntityClass: keyof EntityStore,
  resources: Array<CurrentUserAPIInterface | CustomerAPIInterface>
) {
  return async (dispatch: Dispatch) => {
    // we have a utility for this in the real app
    // ignore error for now
    dispatch({
      type: "updateEntity",
      EntityClass,
      resources,
    });
  };
}
