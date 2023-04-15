export interface Customer {
  id: string;
  name: {
    first: string;
    last: string;
  };
  location: {
    city: string;
    state: string;
    country: string;
  };
}

export interface CustomerState {
  status: "loading" | "done" | null;
  data: Customer[];
}

export enum CustomerActionType {
  FETCH_CUSTOMER_START = "fetchCustomerStart",
  FETCH_CUSTOMER_DONE = "fetchCustomerDone",
}

export type CustomerAction =
  | {
      type: CustomerActionType.FETCH_CUSTOMER_START;
    }
  | {
      type: CustomerActionType.FETCH_CUSTOMER_DONE;
      customers: Customer[];
    };
