import { createSelector } from "reselect";
import { StoreState } from "../store";
import { User } from "../../../interfaces/CurrentUser";

export const getIsCurrentUserLoading = createSelector(
  (state: StoreState) => state,
  (state: StoreState) => state?.currentUser.status === "loading"
);

export const getCurrentUser = createSelector(
  (state: StoreState) => state,
  (state: StoreState) => state?.entities?.users?.[0] || {}
);

export const getUserAvatar = createSelector(
  getCurrentUser,
  (user: User) => user.avatar
);

export const getCurrentUserName = createSelector(
  getCurrentUser,
  (user: User) => user.name
);
