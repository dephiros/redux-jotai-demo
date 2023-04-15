import { createSelector } from "reselect";

export const getCustomers = createSelector(
  (state) => state,
  (state) => Object.values(state.entities.customer ?? [])
);

export const getIsCustomerLoading = createSelector(
  (state) => state,
  (state) => state.customers.status === "loading"
);

const getCustomerCountries = createSelector(
  getCustomers,
  (customers) => new Set(customers.map((customer) => customer.location.country))
);

export const getCustomerCountriesFilter = createSelector(
  getCustomerCountries,
  (countries) =>
    [...countries].sort().map((country) => ({ name: country, value: country }))
);

export const getCustomerFilterbyCountry = createSelector(
  getCustomers,
  (state) => state.customers.countryFilter,
  (customers, countryFilter) => {
    if (
      countryFilter.size === 0 ||
      ![...countryFilter.values()].some(Boolean)
    ) {
      return customers;
    }
    return customers.filter((customer) =>
      countryFilter.get(customer.location.country)
    );
  }
);

export const getCustomerCount = createSelector(
  getCustomerFilterbyCountry,
  (customers) => customers.length
);
