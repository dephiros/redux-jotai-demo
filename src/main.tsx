import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { setup } from "twind";
import * as colors from "twind/colors";

setup({
  theme: {
    extend: {
      colors,
    },
  },
});

import "./index.css";
import { Provider, createStore } from "jotai";
import Loader from "./components/Loader";

const root = createRoot(document.getElementById("app") as HTMLElement);
root.render(
  <Provider store={createStore()}>
    <Suspense fallback={<Loader />}>
      <App />
    </Suspense>
  </Provider>
);
