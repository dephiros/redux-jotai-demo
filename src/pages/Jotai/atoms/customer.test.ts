import { atom, createStore } from "jotai";
import { describe, test, vi, expect, Mock, MockedFunction } from "vitest";
import { JSONSchemaFaker } from "json-schema-faker";
import { faker } from "@faker-js/faker";

import { getCustomers } from "../../../api/customer";
import { CustomerAPISchema } from "../../../interfaces/Customer";
import { Customer } from "../../../models/Customer";
import {
  customersAtom,
  selectedCountriesAtom,
  filteredCustomerByCountryAtom,
  customerCountAtom,
  customerCountriesAtom,
} from "./customer";

JSONSchemaFaker.extend("faker", () => faker);

vi.mock("../../../api/customer", async () => {
  // figure out how to mock only customersAtom and selectedCountriesAtom
  return {
    __esModule: true,
    getCustomers: vi.fn(),
  };
});

const mockGetCustomer = getCustomers as MockedFunction<
  (id: string) => Promise<Array<any>>
>;

describe("test async atom", () => {
  test("should be sub", () => {
    const countAtom = atom(Promise.resolve(0));
    const countPlusAtom = atom(async (get) => {
      return (await get(countAtom)) + 1;
    });
    const sumAtom = atom(async (get) => {
      return (await get(countAtom)) + (await get(countPlusAtom));
    });
    const store = createStore();
    store.sub(sumAtom, async () => {
      expect(await store.get(sumAtom)).toEqual(9);
    });
    store.set(countAtom, Promise.resolve(4));
  });
});

describe("filteredCustomerByCountryAtom", () => {
  test("should return all customers if no filters", async () => {
    const { store } = await setUpStore();

    const filteredCustomers = await store.get(filteredCustomerByCountryAtom);
    expect(filteredCustomers.length).toEqual(10);
  });
  test("return customer from selected countries", async () => {
    const { customers, countries, store } = await setUpStore();
    const selectedCountries = countries.slice(0, 2);
    selectedCountries.forEach((country) => {
      store.set(selectedCountriesAtom, country, true);
    });

    const filteredCustomers = await store.get(filteredCustomerByCountryAtom);

    expect(filteredCustomers.length).toEqual(
      customers.filter((c) =>
        countries.slice(0, 2).includes(c.location.country)
      ).length
    );
  });
  test("toggle selected returns all countries", async () => {
    const { customers, countries, store } = await setUpStore();
    const selectedCountries = countries.slice(0, 2);
    selectedCountries.forEach((country) => {
      store.set(selectedCountriesAtom, country); // toggle on
      store.set(selectedCountriesAtom, country); // toggle off
    });

    const filteredCustomers = await store.get(filteredCustomerByCountryAtom);

    expect(filteredCustomers.length).toEqual(customers.length);
  });
});

async function setUpStore() {
  const { customers, countries } = await createCountries();
  mockGetCustomer.mockReturnValue(Promise.resolve(customers));
  const store = createStore();
  store.sub(filteredCustomerByCountryAtom, () => {}); // triggle value to be calculated
  return {
    customers,
    countries,
    store,
  };
}

async function createCustomers() {
  const customersJSON = await Promise.all(
    [...Array(10).keys()].map(() => JSONSchemaFaker.resolve(CustomerAPISchema))
  );
  return customersJSON.map((c) => Customer.fromJS(c as any));
}

async function createCountries() {
  const customers = await createCustomers();
  return {
    customers,
    countries: customers.map((c) => c.location.country),
  };
}
