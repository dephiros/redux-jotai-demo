import { Dispatch } from "redux";

import { updateEntityActionCreator } from "../../Redux/ducks/entities";
import {
  CustomerAPIInterface,
  CustomerState,
  CustomerAction,
  CustomerActionType,
} from "../../../interfaces/Customer";
import { getCustomers } from "../../../api/customer";
import { Customer } from "../../../models/Customer";

const getInitialState = (): CustomerState => ({
  status: null,
  data: [],
  countryFilter: new Map(),
});

export function reducer(
  state = getInitialState(),
  action: CustomerAction
): CustomerState {
  // this is done through utility in the real app
  switch (action.type) {
    case CustomerActionType.FETCH_CUSTOMER_START: {
      return { ...state, status: "loading" };
    }
    case CustomerActionType.FETCH_CUSTOMER_DONE: {
      return { ...state, status: "done", data: action.customers };
    }
    case CustomerActionType.FILTER_CUSTOMER_BY_COUNTRY: {
      return { ...state, countryFilter: action.filter };
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
    // @ts-expect-error: thunk is not typed yet
    dispatch(updateEntityActionCreator(Customer, customers));
    dispatch({
      type: CustomerActionType.FETCH_CUSTOMER_DONE,
      customers,
    });
  };
}

export function filterCustomerByCountryActionCreator(
  countryFilter: Map<string, boolean>
) {
  return async (dispatch: Dispatch) => {
    // we have a utility for this in the real app
    // ignore error for now
    dispatch({
      type: CustomerActionType.FILTER_CUSTOMER_BY_COUNTRY,
      filter: countryFilter,
    });
  };
}
