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
  async (get) => {
    const countries = await get(customerCountriesAtom);
    return new Map([...countries].map((country) => [country, false]));
  },
  (get, set, country: string, selected: boolean) => {
    const selectedCountries = get(_selectedCountriesAtom);
    return set(
      _selectedCountriesAtom,
      new Map(selectedCountries).set(country, selected)
    );
  }
);
export function getFilterStateForCountryAtom(country: string) {
  return atom(
    (get) => get(_selectedCountriesAtom).get(country),
    (get, set, selected?: boolean) => {
      const newValue =
        selected === undefined
          ? !get(_selectedCountriesAtom).get(country)
          : selected;
      set(selectedCountriesAtom, country, newValue);
    }
  );
}

export const filteredCustomerByCountryAtom = atom(async (get) => {
  const customers = (await get(customersAtom)) || [];
  const selectedCountries = await get(selectedCountriesAtom);
  if (
    selectedCountries.size === 0 ||
    ![...selectedCountries.values()].some(Boolean)
  )
    return customers;
  return customers.filter((customer: Customer) =>
    selectedCountries.get(customer.location.country)
  );
});

export const customerCountAtom = atom(async (get) => {
  const customers = await get(customersAtom);
  return customers?.length || 0;
});
