import { createSelector } from 'reselect';
import { StoreState } from '../store';
import { CurrentUserAPIInterface } from '../../../interfaces/User';
import { User } from '../../../models/User';

export const getIsCurrentUserLoading = createSelector(
  (state: StoreState) => state,
  (state: StoreState) => state?.currentUser.status === 'loading'
);

export const getCurrentUser = createSelector(
  (state: StoreState) => state?.entities?.User?.[0] || undefined,
  (currentUser?: CurrentUserAPIInterface): User | null =>
    currentUser ? User.fromJS(currentUser) : null
);

export const getUserAvatar = createSelector(
  getCurrentUser,
  (user: User | null) => user?.avatar
);

export const getCurrentUserName = createSelector(
  getCurrentUser,
  (user: User | null) => user?.name
);
