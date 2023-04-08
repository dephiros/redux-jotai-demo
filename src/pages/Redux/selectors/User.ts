import { createSelector } from 'reselect';

export const getCurrentUser = createSelector(
  (state) => state,
  (state) => state?.entities?.users?.[0] || {}
);

export const getUserAvatar = createSelector(
  getCurrentUser,
  (user) => user.avatar
);

export const getCurrentUserName = createSelector(
  getCurrentUser,
  (user) => user.name
);
