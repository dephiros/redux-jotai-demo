import { atom } from "jotai";
import { Customer } from "../../../models/Customer";
import { getCustomers } from "../../../api/customer";
import { currentUserAtom } from "./currentUser";
import { CustomerAPIInterface } from "../../../interfaces/Customer";
import { createAPIResourceAtom } from "./utils";

declare module "./entities" {
  interface EntityStore {
    Customer?: Record<string, CustomerAPIInterface>;
  }
}

export const customersAtom = createAPIResourceAtom({
  EntityClass: Customer,
  fetchResource: async (get) => {
    const user = await get(currentUserAtom);
    return getCustomers(user?.id || "");
  },
});

export const customerCountriesAtom = atom(async (get) => {
  const customers = Object.values(await get(customersAtom));
  return new Set(customers?.map((customer) => customer.location.country) || []);
});

const _selectedCountriesAtom = atom(new Map<string, boolean>());
export const selectedCountriesAtom = atom(
  (get) => {
    return get(_selectedCountriesAtom);
  },
  (get, set, country: string, selected?: boolean) => {
    const selectedCountries = get(_selectedCountriesAtom);
    const newValue =
      selected === undefined ? !selectedCountries.get(country) : selected;
    const newSelectedCountries = new Map(selectedCountries).set(
      country,
      newValue
    );
    set(_selectedCountriesAtom, newSelectedCountries);
    return newSelectedCountries;
  }
);

// this function create an atom that can only modify one country
export function getFilterStateForCountryAtom(country: string) {
  return atom(
    (get) => get(selectedCountriesAtom).get(country),
    (get, set, selected?: boolean) => {
      set(selectedCountriesAtom, country, selected);
    }
  );
}

export const filteredCustomerByCountryAtom = atom(async (get) => {
  const customers = Object.values((await get(customersAtom)) || {});
  const filteredCountries = new Set(
    [...get(selectedCountriesAtom)].filter(([k, v]) => v).map(([k, v]) => k)
  );
  const allCountries = await get(customerCountriesAtom);
  const selectedCountries =
    filteredCountries.size === 0 ? allCountries : filteredCountries;
  return customers.filter((customer: Customer) =>
    selectedCountries.has(customer.location.country)
  );
});

export const customerCountAtom = atom(async (get) => {
  const customers = await get(filteredCustomerByCountryAtom);
  return customers?.length || 0;
});
