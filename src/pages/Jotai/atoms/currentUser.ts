import { atom } from "jotai";
import { getUser } from "../../../api/user";
import { User } from "../../../interfaces/CurrentUser";
import { entityAtom, EntityStore } from "./entities";

declare module "./entities" {
  interface EntityStore {
    users?: Record<string, User>;
  }
}

const fetchCurrentUserAtom = atom<Promise<User> | null>(null);
fetchCurrentUserAtom.onMount = (setAtom) => {
  console.log("mounted");
  setAtom(getUser());
};

export const currentUserAtom = atom(
  async (get) => {
    return get(fetchCurrentUserAtom);
  },
  async (get, set) => {
    const user = await get(fetchCurrentUserAtom);
    if (!user) throw new Error("No user");
    const entities = get(entityAtom);
    set(entityAtom, {
      ...entities,
      users: {
        ...entities?.users,
        [user.id]: user,
      },
    });
  }
);

currentUserAtom.onMount = (setAtom) => {
  console.log("user mounted");
};