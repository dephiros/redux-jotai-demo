import { useEffect } from 'preact/hooks';

import { connect } from 'react-redux';
import { fetchCurrentUserActionCreator } from './ducks/currentUser';
import Header from './components/Header';

function App({ fetchCurrentUser }) {
  console.log(fetchCurrentUser, 'TEST');
  useEffect(() => {
    console.log(typeof fetchCurrentUser, 'TPE');
    fetchCurrentUser?.();
  }, []);
  return <Header />;
}

export default connect(() => ({}), {
  fetchCurrentUser: fetchCurrentUserActionCreator,
})(App);
