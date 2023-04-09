import { connect } from "react-redux";
import { useEffect } from "preact/hooks";
import { tw } from "twind";

import { fetchCustomersActionCreator } from "../ducks/customers";
import { getCustomers } from "../selectors/customer";

function CustomerList({
  userId,
  fetchCustomers,
  customers,
}: {
  userId: string;
}) {
  useEffect(() => {
    fetchCustomers(userId);
  }, [userId]);

  return (
    <div
      class={tw`flex flex-col mt-5 mx-auto text-center bg-yellow-100 text-black`}
    >
      <h3 class={tw`text-xl my-3 font-bold`}>Customers</h3>
      <ul class={tw`max-h-[500px] overflow-y-scroll`}>
        {customers.map((customer) => (
          <li key={customer.id}>
            {customer.name.first}: {customer.location.country}
          </li>
        ))}
      </ul>
    </div>
  );
}

function mapStateToProps(state) {
  return { customers: getCustomers(state) };
}

export default connect(mapStateToProps, {
  fetchCustomers: fetchCustomersActionCreator,
})(CustomerList);
