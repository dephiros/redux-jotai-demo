import { Dispatch } from "redux";

import { updateEntityActionCreator } from "../../Redux/ducks/entities";
import {
  Customer,
  CustomerState,
  CustomerAction,
  CustomerActionType,
} from "../../../interfaces/Customer";
import { getCustomers } from "../../../api/customer";

const getInitialState = (): CustomerState => ({ status: null, data: [] });

export function reducer(state = getInitialState(), action: CustomerAction) {
  // this is done through utility in the real app
  switch (action.type) {
    case CustomerActionType.FETCH_CUSTOMER_START: {
      return { status: "loading" };
    }
    case CustomerActionType.FETCH_CUSTOMER_DONE: {
      return { status: "done ", data: action.customers };
    }
    default:
      return state;
  }
}

export function fetchCustomersActionCreator(userId: string) {
  return async (dispatch: Dispatch) => {
    // we have a utility for this in the real app
    // ignore error for now
    dispatch({
      type: CustomerActionType.FETCH_CUSTOMER_START,
    });
    const customers = await getCustomers(userId);
    dispatch(updateEntityActionCreator("customer", customers));
    dispatch({
      type: CustomerActionType.FETCH_CUSTOMER_DONE,
      customers,
    });
  };
}
