import { useContext, useEffect } from "preact/hooks";

import { connect } from "react-redux";

import { fetchCurrentUserActionCreator } from "./ducks/currentUser";
import { getIsCurrentUserLoading, getCurrentUser } from "./selectors/user";
import Header from "./components/Header";
import CustomerList from "./components/CustomerList";
import Loader from "../../components/Loader";
import { User } from "../../interfaces/CurrentUser";
import FilterPanel from "../../components/FilterPanel";
import { getCustomerCountriesFilter } from "./selectors/customer";
import { StoreState } from "./store";
import { filterCustomerByCountryActionCreator } from "./ducks/customers";
import { FilterContext } from "./components/FilterContext";

interface Props {
  fetchCurrentUser?: () => void;
  isCurrentUserLoading: boolean;
  currentUser?: User;
  customerCountriesFilter: Array<{ name: string; value: string }>;
  filterCustomerByCountry: (filter: Map<string, boolean>) => void;
}

function App({
  fetchCurrentUser,
  isCurrentUserLoading,
  currentUser,
  customerCountriesFilter,
  filterCustomerByCountry,
}: Props) {
  useEffect(() => {
    fetchCurrentUser?.();
  }, []);

  const { filterVisible, toggleFilterVisible } = useContext(FilterContext);
  return isCurrentUserLoading ? (
    <Loader />
  ) : (
    <>
      <Header />
      <CustomerList userId={currentUser?.id!} />
      <FilterPanel
        filterItems={customerCountriesFilter}
        onChange={filterCustomerByCountry}
        visible={filterVisible}
        onVisibleChange={toggleFilterVisible}
      />
    </>
  );
}

export default connect(
  (state: StoreState) => ({
    isCurrentUserLoading: getIsCurrentUserLoading(state),
    currentUser: getCurrentUser(state),
    customerCountriesFilter: getCustomerCountriesFilter(state),
  }),
  {
    fetchCurrentUser: fetchCurrentUserActionCreator,
    filterCustomerByCountry: filterCustomerByCountryActionCreator,
  }
)(App);
