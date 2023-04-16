import { connect } from "react-redux";
import { useEffect } from "react";
import { tw } from "twind";

import { fetchCustomersActionCreator } from "../ducks/customers";
import {
  getCustomerFilterbyCountry,
  getIsCustomerLoading,
} from "../selectors/customer";
import { Customer } from "../../../interfaces/Customer";
import Loader from "../../../components/Loader";
import FlashyBox from "../../../components/FlashyBox";
import CustomerRow from "./CustomerRow";
import { StoreState } from "../store";
import CustomerListHeader from "./CustomerListHeader";

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

  return (
    <FlashyBox className={tw`flex flex-col justify-center text-center p-3`}>
      <CustomerListHeader customers={customers} />
      {isCustomerLoading ? (
        <Loader />
      ) : (
        <ul className={tw`max-h-[500px] overflow-y-scroll flex flex-col`}>
          {customers.map((customer) => (
            <li key={customer.id}>
              <CustomerRow customer={customer} />
            </li>
          ))}
        </ul>
      )}
    </FlashyBox>
  );
}

function mapStateToProps(state: StoreState) {
  return {
    customers: getCustomerFilterbyCountry(state),
    isCustomerLoading: getIsCustomerLoading(state),
  };
}

export default connect(mapStateToProps, {
  fetchCustomers: fetchCustomersActionCreator,
})(CustomerList);
