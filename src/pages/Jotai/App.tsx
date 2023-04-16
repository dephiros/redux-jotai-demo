import React from "react";
import Loader from "../../components/Loader";
import CustomerList from "./components/CustomerList";
import FilterPanel from "./components/FilterPanel";
import Header from "./components/Header";

export default function App() {
  return (
    <React.Fragment>
      <Header />
      <React.Suspense fallback={<Loader />}>
        <CustomerList />
        <FilterPanel />
      </React.Suspense>
    </React.Fragment>
  );
}
