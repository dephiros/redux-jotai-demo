import { connect } from "react-redux";
import { useEffect } from "preact/hooks";
import { tw } from "twind";

import { fetchCustomersActionCreator } from "../ducks/customers";
import { getCustomers, getIsCustomerLoading } from "../selectors/customer";
import { Customer } from "../../interface/customer";
import Loader from "../../../components/Loader";

function CustomerList({
  userId,
  fetchCustomers,
  customers,
  isCustomerLoading,
}: {
  userId: string;
  fetchCustomers: (userId: string) => void;
  customers: Customer[];
  isCustomerLoading: boolean;
}) {
  useEffect(() => {
    fetchCustomers(userId);
  }, [userId]);

  function getName(customer) {
    return `${customer.name.first} ${customer.name.last}`;
  }

  return isCustomerLoading ? (
    <Loader />
  ) : (
    <div
      class={tw`flex flex-col items-center mt-5 mx-auto text-center bg-yellow-100 text-black`}
    >
      <h3 class={tw`text-xl my-3 font-bold`}>Customers</h3>
      <div class={tw`max-h-[500px] overflow-y-scroll`}>
        <table class={tw`text-left min-w-[500px]`}>
          <thead class={tw`border-b(solid 2 neutral-100) mb-6`}>
            <tr>
              <th class={tw`w-[50px]`}></th>
              <th>Name</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody class="">
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>
                  <img
                    class={tw`p-1`}
                    alt={getName(customer)}
                    src={customer.picture.thumbnail}
                  />
                </td>
                <td>{getName(customer)}</td>
                <td>{customer.location.country}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    customers: getCustomers(state),
    isCustomerLoading: getIsCustomerLoading(state),
  };
}

export default connect(mapStateToProps, {
  fetchCustomers: fetchCustomersActionCreator,
})(CustomerList);
