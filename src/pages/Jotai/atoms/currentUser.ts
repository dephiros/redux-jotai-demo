import { atom } from "jotai";
import { getUser, User } from "../../../models/user";
import { entityAtom, EntityStore } from "./entities";

declare module "./entities" {
  interface EntityStore {
    users?: Record<string, User>;
  }
}

// This holds the user loading state
const currentUserPromiseAtom = atom<Promise<User> | null>(null);
currentUserPromiseAtom.onMount = (setAtom) => {
  setAtom(getUser());
};

export const currentUserAtom = atom(
  async (get) => {
    return get(currentUserPromiseAtom);
  },
  async (get, set) => {
    const user = await get(currentUserPromiseAtom);
    if (!user) throw new Error("No user");
    set(entityAtom, "users", [user]);
  }
);

export const currentUserAvatarAtom = atom(async (get) => {
  const user = await get(currentUserAtom);
  return user?.avatar;
});

export const currentUserNameAtom = atom(async (get) => {
  const user = await get(currentUserAtom);
  return user?.name;
});
