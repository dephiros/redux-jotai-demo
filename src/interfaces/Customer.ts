import { Type, Static } from "@sinclair/typebox";

export const CustomerAPISchema = Type.Object({
  login: Type.Object({
    uuid: Type.String({
      format: "uuid",
    }),
  }),
  name: Type.Object({
    first: Type.String({
      faker: "name.fullName",
    }),
    last: Type.String({
      faker: "name.lastName",
    }),
  }),
  location: Type.Object({
    city: Type.String({
      faker: "address.city",
    }),
    state: Type.String({
      faker: "address.state",
    }),
    country: Type.String({
      faker: "address.country",
    }),
  }),
  picture: Type.Object({
    thumbnail: Type.String({
      faker: "image.avatar",
    }),
    medium: Type.String({
      faker: "image.avatar",
    }),
  }),
});
export type CustomerAPIInterface = Static<typeof CustomerAPISchema>;

export interface CustomerState {
  status: "loading" | "done" | null;
  data: CustomerAPIInterface[];
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
      customers: CustomerAPIInterface[];
    }
  | {
      type: CustomerActionType.FILTER_CUSTOMER_BY_COUNTRY;
      filter: Map<string, boolean>;
    };
