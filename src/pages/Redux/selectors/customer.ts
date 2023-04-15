import { createSelector } from "reselect";

export const getCustomers = createSelector(
  (state) => state,
  (state) => Object.values(state.entities.customer ?? [])
);

export const getIsCustomerLoading = createSelector(
  (state) => state,
  (state) => state.customers.status === "loading"
);
