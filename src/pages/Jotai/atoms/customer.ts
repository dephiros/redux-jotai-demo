import { atom } from "jotai";
import { getCustomers } from "../../../api/customer";
import { Customer } from "../../../interfaces/Customer";
import { getName } from "../../../utils";
import { currentUserAtom } from "./currentUser";
import { entityAtom, EntityStore } from "./entities";

declare module "./entities" {
  interface EntityStore {
    customers?: Record<string, Customer>;
  }
}

const customersPromiseAtom = atom<Promise<Array<Customer>> | null>(null);
const fetchCustomersAtom = atom(
  async (get) => {
    return get(customersPromiseAtom);
  },
  async (get, set) => {
    const currentUser = await get(currentUserAtom);
    if (!currentUser) throw new Error("No user");
    set(customersPromiseAtom, getCustomers(currentUser.id));
  }
);
fetchCustomersAtom.onMount = (setAtom) => {
  setAtom();
};

export const customersAtom = atom(
  async (get) => {
    return get(fetchCustomersAtom) || [];
  },
  async (get, set) => {
    const customers = await get(fetchCustomersAtom);
    if (!customers) throw new Error("Customers not initialized");
    const entities = get(entityAtom);
    set(entityAtom, "customers", customers);
  }
);

export const customerCountriesAtom = atom(async (get) => {
  const customers = await get(customersAtom);
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
  const customers = (await get(customersAtom)) || [];
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
