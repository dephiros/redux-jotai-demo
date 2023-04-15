import { Dispatch } from "redux";

import { updateEntityActionCreator } from "../../Redux/ducks/entities";
import {
  Customer,
  CustomerState,
  CustomerAction,
  CustomerActionType,
} from "../../../interfaces/Customer";
import { getCustomers } from "../../../api/customer";

const getInitialState = () => ({ status: null, data: [] });

export function reducer(state: any, action: CustomerAction) {
  // this is done through utility in the real app
  switch (action.type) {
    case CustomerActionType.FETCH_CUSTOMER_START: {
      return { status: "loading" };
    }
    case CustomerActionType.FETCH_CUSTOMER_START: {
      return { status: "done ", data: action.customers };
    }
    default:
      return state || getInitialState();
  }
}

export function fetchCustomersActionCreator(userId: string) {
  return async (dispatch: Dispatch) => {
    // we have a utility for this in the real app
    // ignore error for now
    dispatch({
      type: "fetchCustomerStart",
    });
    const customers = await getCustomers(userId);
    dispatch(updateEntityActionCreator("customer", customers));
    dispatch({
      type: "fetchCustomersDone",
      customers,
    });
  };
}
