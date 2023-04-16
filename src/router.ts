import { h } from "preact";
import { atom } from "jotai";
import { atomWithHash } from "jotai-location";

export const ROUTES = new Map([
  [
    "react-props",
    {
      title: "React Props",
      component: () => import("./pages/Props"),
    },
  ],
  ["redux", { title: "Redux", component: () => import("./pages/Redux") }],
]);

type RouteKey<M = typeof ROUTES> = M extends Map<infer K, any> ? K : never;

const hashAtom = atomWithHash<RouteKey>("page", "react-props");

const getPageAtom = atom(async (get) => {
  const pageKey = get(hashAtom);
  const routeObj = ROUTES.get(pageKey);
  return routeObj
    ? (await routeObj?.component())?.default
    : () => h("div", {}, "Unknown");
});

const router = atom(
  (get) => get(getPageAtom),
  async (get, set, newPage: string) => {
    set(hashAtom, newPage);
    return get(getPageAtom);
  }
);

export default router;
