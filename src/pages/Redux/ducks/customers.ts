import { Dispatch } from 'redux';
import { updateEntityActionCreator } from '../../Redux/ducks/entities';

const INITIAL_STATE = {
  status: null,
  data: null,
};

export function reducer(state: any, action: any) {
  // this is done through utility in the real app
  switch (action.type) {
    case 'fetchUserStart': {
      return { status: 'loading' };
    }
    case 'fetchUserDone': {
      return { status: 'done ', data: action.user };
    }
    default:
      return { ...INITIAL_STATE, ...state };
  }
}

async function getCustomers(userId: string) {
  const response = await fetch(
    `https://randomuser.me/api/?results=500&seed=${userId}`
  );
  return response.json();
}

export function fetchCurrentUserActionCreator(userId: string) {
  return async (dispatch: Dispatch) => {
    // we have a utility for this in the real app
    // ignore error for now
    dispatch({
      type: 'fetchCustomerStart',
    });
    const customers = await getCustomers(userId);
    dispatch({
      type: 'fetchCustomersDone',
      user,
    });

    // this is done in much more complete way by reducer
    const customersById = customers.reduce((acc, customer) => {
      acc[customer.id] = customer;
      return acc;
    }, {});
    dispatch(updateEntityActionCreator('customer', customersById));
  };
}
