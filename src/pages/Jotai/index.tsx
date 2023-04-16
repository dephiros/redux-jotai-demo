import App from "./App";
import { Suspense } from "react";
import Loader from "../../components/Loader";

export default function Jotai() {
  return (
    <Suspense fallback={<Loader />}>
      <App />
    </Suspense>
  );
}
