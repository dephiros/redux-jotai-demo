import { waitFor } from "../utils";

export async function getCustomers(userId: string): Promise<Customer[]> {
  const response = await import("./customers.json");
  await waitFor(2000);
  return response.results.map((customer) => ({
    ...customer,
    id: customer.login.uuid,
  }));
}
