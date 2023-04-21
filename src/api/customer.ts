import { CustomerAPIInterface } from "../interfaces/Customer";
import { waitFor } from "../utils";

export async function getCustomers(
  userId: string
): Promise<CustomerAPIInterface[]> {
  const response = await import("./customers.json");
  await waitFor(2000);
  return response.results.map((customer) => customer);
}
