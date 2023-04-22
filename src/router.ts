import { createElement as h, lazy } from "react";
import { atom } from "jotai";
import { atomWithHash } from "jotai-location";

export const ROUTES = new Map([
  [
    "react-props",
    {
      title: "Props drilling vs direct subscription",
      component: lazy(() => import("./pages/Props")),
    },
  ],
  ["redux", { title: "Redux", component: lazy(() => import("./pages/Redux")) }],
  ["jotai", { title: "Jotai", component: lazy(() => import("./pages/Jotai")) }],
]);

type RouteKey<M = typeof ROUTES> = M extends Map<infer K, any> ? K : never;

const hashAtom = atomWithHash<RouteKey>("page", "react-props");

const getPageAtom = atom(async (get) => {
  const pageKey = get(hashAtom);
  const routeObj = ROUTES.get(pageKey);
  return routeObj ? await routeObj?.component : () => h("div", {}, "Unknown");
});

const routerAtom = atom(
  (get) => get(getPageAtom),
  async (get, set, newPage: string) => {
    set(hashAtom, newPage);
    return get(getPageAtom);
  }
);

export const routerLinkAtom = atom((get) => {
  const activeKey = get(hashAtom);
  return [...ROUTES.entries()].map(([key, { title }]) => {
    return {
      key,
      title,
      isActive: key === activeKey,
    };
  });
});

routerAtom.onMount = (setAtom) => {
  console.log("router mounted");
};

export default routerAtom;
