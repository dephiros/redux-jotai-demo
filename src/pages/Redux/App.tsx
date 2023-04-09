import { useEffect } from "preact/hooks";

import { connect } from "react-redux";

import { fetchCurrentUserActionCreator } from "./ducks/currentUser";
import { getIsCurrentUserLoading, getCurrentUser } from "./selectors/user";
import Header from "./components/Header";
import CustomerList from "./components/CustomerList";

function App({ fetchCurrentUser, isCurrentUserLoading, currentUser }) {
  useEffect(() => {
    fetchCurrentUser?.();
  }, []);
  return (
    <>
      <Header />
      {!isCurrentUserLoading && <CustomerList userId={currentUser?.id} />}
    </>
  );
}

export default connect(
  (state) => ({
    isCurrentUserLoading: getIsCurrentUserLoading(state),
    currentUser: getCurrentUser(state),
  }),
  {
    fetchCurrentUser: fetchCurrentUserActionCreator,
  }
)(App);
