import { Dispatch } from "redux";
import { updateEntityActionCreator } from "../../Redux/ducks/entities";

const INITIAL_STATE = {
  status: null,
  data: null,
};

export function reducer(state: any, action: any) {
  // this is done through utility in the real app
  switch (action.type) {
    case "fetchUserStart": {
      return { status: "loading" };
    }
    case "fetchUserDone": {
      return { status: "done ", data: action.user };
    }
    default:
      return { ...INITIAL_STATE, ...state };
  }
}

async function getCustomers(userId: string) {
  const response = await import("./customers.json");
  return response.results.map((customer) => ({
    ...customer,
    id: customer.id.value,
  }));
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
