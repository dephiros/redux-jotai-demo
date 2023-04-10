import { createSelector } from "reselect";

export const getIsCurrentUserLoading = createSelector(
  (state) => state,
  (state) => state?.currentUser.status === "loading"
);

export const getCurrentUser = createSelector(
  (state) => state,
  (state) => state?.entities?.user?.[0] || {}
);

export const getUserAvatar = createSelector(
  getCurrentUser,
  (user) => user.avatar
);

export const getCurrentUserName = createSelector(
  getCurrentUser,
  (user) => user.name
);
