import { atom } from "jotai";
import { CurrentUserAPIInterface } from "../../../interfaces/User";
import { getUser, User } from "../../../models/User";
import { createAPIResourceAtom } from "./utils";

declare module "./entities" {
  interface EntityStore {
    User?: Record<string, CurrentUserAPIInterface>;
  }
}

// make atom private by just not expose them
const _usersAtom = createAPIResourceAtom({
  EntityClass: User,
  fetchResource: getUser,
});

export const currentUserAtom = atom(
  async (get) => {
    const users = await get(_usersAtom);
    return Object.values(users)[0];
  },
  async (get, set) => {
    set(_usersAtom);
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
