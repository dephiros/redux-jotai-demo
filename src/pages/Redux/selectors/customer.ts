import { createSelector } from "reselect";

export const getCustomers = createSelector(
  (state) => state,
  (state) => Object.values(state.entities.customer ?? [])
);
