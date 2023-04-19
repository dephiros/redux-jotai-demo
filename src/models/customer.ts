import { Entity } from "@rest-hooks/rest";
import { waitFor } from "../utils";

export class Customer extends Entity {
  name: {
    first: string;
    last: string;
  } = { first: "", last: "" };
  location: {
    city: string;
    state: string;
    country: string;
  } = { city: "", state: "", country: "" };
  picture: {
    thumbnail: string;
    medium: string;
  } = { thumbnail: "", medium: "" };
  login: { uuid: string } = { uuid: "" };

  pk() {
    return this.login.uuid;
  }
}

export async function getCustomers(userId: string): Promise<Customer[]> {
  const response = await import("./customers.json");
  await waitFor(2000);
  return response.results.map((customer) => Customer.fromJS(customer));
}
