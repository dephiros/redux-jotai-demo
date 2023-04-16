import { Provider } from "react-redux";
import App from "./App";
import { FilterContextProvider } from "./components/FilterContext";

import store from "./store";

export default function () {
  return (
    <Provider store={store}>
      <FilterContextProvider value={{ filterVisible: false }}>
        <App />
      </FilterContextProvider>
    </Provider>
  );
}
