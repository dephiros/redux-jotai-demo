import { atom } from "jotai";
import { getUser } from "../../../api/user";
import { User } from "../../../interfaces/CurrentUser";
import { getName } from "../../../utils";
import { entityAtom, EntityStore } from "./entities";

declare module "./entities" {
  interface EntityStore {
    users?: Record<string, User>;
  }
}

const fetchCurrentUserAtom = atom<Promise<User> | null>(null);
fetchCurrentUserAtom.onMount = (setAtom) => {
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

export const currentUserAvatarAtom = atom(async (get) => {
  const user = await get(currentUserAtom);
  return user?.avatar;
});

export const currentUserNameAtom = atom(async (get) => {
  const user = await get(currentUserAtom);
  return user?.name;
});
