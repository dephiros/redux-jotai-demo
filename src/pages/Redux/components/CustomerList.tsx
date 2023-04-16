import { connect } from "react-redux";
import { useEffect, useMemo } from "preact/hooks";
import { tw } from "twind";

import {
  fetchCustomersActionCreator,
  filterCustomerByCountryActionCreator,
} from "../ducks/customers";
import {
  getCustomerFilterbyCountry,
  getIsCustomerLoading,
  getCustomerCountriesFilter,
} from "../selectors/customer";
import { Customer } from "../../../interfaces/Customer";
import Loader from "../../../components/Loader";
import FlashyBox from "../../../components/FlashyBox";
import FilterPanel from "../../../components/FilterPanel";
import CustomerRow from "./CustomerRow";
import { StoreState } from "../store";
import CustomerListHeader from "./CustomerListHeader";

function CustomerList({
  userId,
  fetchCustomers,
  customers,
  isCustomerLoading,
  customerCountriesFilter,
  filterCustomerByCountry,
}: {
  userId: string;
  fetchCustomers: (userId: string) => void;
  customers: Customer[];
  isCustomerLoading: boolean;
  customerCountriesFilter: Array<{ name: string; value: string }>;
  filterCustomerByCountry: (filter: Map<string, boolean>) => void;
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
        <ul class={tw`max-h-[500px] overflow-y-scroll flex flex-col`}>
          {customers.map((customer) => (
            <li key={customer.id}>
              <CustomerRow customer={customer} />
            </li>
          ))}
        </ul>
      )}
      <FilterPanel
        filterItems={customerCountriesFilter}
        onChange={filterCustomerByCountry}
      />
    </FlashyBox>
  );
}

function mapStateToProps(state: StoreState) {
  return {
    customers: getCustomerFilterbyCountry(state),
    isCustomerLoading: getIsCustomerLoading(state),
    customerCountriesFilter: getCustomerCountriesFilter(state),
  };
}

export default connect(mapStateToProps, {
  fetchCustomers: fetchCustomersActionCreator,
  filterCustomerByCountry: filterCustomerByCountryActionCreator,
})(CustomerList);
