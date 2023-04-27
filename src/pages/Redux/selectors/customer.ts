import { createSelector } from "reselect";
import { StoreState } from "../store";
import { Customer } from "../../../models/customer";

export const getCustomers = createSelector(
  (state: StoreState) => state,
  (state: StoreState): Array<Customer> =>
    Object.values(state.entities.Customer ?? []).map((customer) =>
      Customer.fromJS(customer)
    )
);

export const getIsCustomerLoading = createSelector(
  (state: StoreState) => state,
  (state: StoreState) => state.customers.status === "loading"
);

const getCustomerCountries = createSelector(
  getCustomers,
  (customers: Array<Customer>) =>
    new Set<string>(
      customers.map((customer: Customer) => customer.location.country)
    )
);

export const getCustomerCountriesFilter = createSelector(
  getCustomerCountries,
  (countries) =>
    [...countries].sort().map((country) => ({ name: country, value: country }))
);

export const getCustomerFilterbyCountry = createSelector(
  getCustomers,
  (state: StoreState) => state.customers.countryFilter,
  (customers: Array<Customer>, countryFilter: Map<string, boolean>) => {
    if (
      countryFilter.size === 0 ||
      ![...countryFilter.values()].some(Boolean)
    ) {
      return customers;
    }
    return customers.filter((customer: Customer) =>
      countryFilter.get(customer.location.country)
    );
  }
);

export const getCustomerCount = createSelector(
  getCustomerFilterbyCountry,
  (customers) => customers.length
);
