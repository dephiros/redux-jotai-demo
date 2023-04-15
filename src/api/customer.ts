export async function getCustomers(userId: string): Promise<Customer[]> {
  const response = await import("./customers.json");
  return response.results.map((customer) => ({
    ...customer,
    id: customer.id.value,
  }));
}
