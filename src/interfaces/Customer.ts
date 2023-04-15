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
  picture: {
    thumbnail: string;
    medium: string;
  };
}

export interface CustomerState {
  status: "loading" | "done" | null;
  data: Customer[];
  countryFilter: Map<string, boolean>;
}

export enum CustomerActionType {
  FETCH_CUSTOMER_START = "fetchCustomerStart",
  FETCH_CUSTOMER_DONE = "fetchCustomerDone",
  FILTER_CUSTOMER_BY_COUNTRY = "filterCustomerByCountry",
}

export type CustomerAction =
  | {
      type: CustomerActionType.FETCH_CUSTOMER_START;
    }
  | {
      type: CustomerActionType.FETCH_CUSTOMER_DONE;
      customers: Customer[];
    }
  | {
      type: CustomerActionType.FILTER_CUSTOMER_BY_COUNTRY;
      filter: Map<string, boolean>;
    };
