import { atom, createStore } from "jotai";
import { describe, test, vi, expect } from "vitest";
import { JSONSchemaFaker } from "json-schema-faker";
import { faker } from "@faker-js/faker";

import { CustomerAPISchema } from "../../../interfaces/Customer";
import { Customer } from "../../../models/Customer";
import {
  customersAtom,
  selectedCountriesAtom,
  filteredCustomerByCountryAtom,
} from "./customer";

JSONSchemaFaker.extend("faker", () => faker);

vi.mock("./customer.ts", async () => {
  // figure out how to mock only customersAtom and selectedCountriesAtom
  return {
    ...mod,
    customersAtom: atom<Customer[]>([]),
    selectedCountriesAtom: atom(new Map<string, boolean>()),
  };
});

describe("filteredCustomerByCountryAtom", () => {
  test("should return all customers if no filters", async () => {
    const { customers, countries } = await getCountries();
    const store = createStore();
    store.sub(filteredCustomerByCountryAtom, (c) => {
      //   console.log("sub", c);
    });
    store.set(customersAtom, Promise.resolve(customers));
    store.set(selectedCountriesAtom, new Map());
    const filteredCustomers = await store.get(filteredCustomerByCountryAtom);
    expect(filteredCustomers.length).toEqual(10);
  });
});

async function getCustomers() {
  const customersJSON = await Promise.all(
    [...Array(10).keys()].map(() => JSONSchemaFaker.resolve(CustomerAPISchema))
  );
  console.log("array", [...Array(10).keys()]);
  return customersJSON.map((c) => Customer.fromJS(c as any));
}

async function getCountries() {
  const customers = await getCustomers();
  return {
    customers,
    countries: customers.map((c) => c.location.country),
  };
}
