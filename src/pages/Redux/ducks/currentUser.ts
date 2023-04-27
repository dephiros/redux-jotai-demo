import { Dispatch } from 'redux';

import {
  CurrentUserAPIState,
  CurrentUserAction,
} from '../../../interfaces/User';
import { updateEntityActionCreator } from '../../Redux/ducks/entities';
import { getUser, User } from '../../../models/User';

function getInitialState(): CurrentUserAPIState {
  return {
    status: null,
    data: null,
  };
}

export function reducer(
  state: CurrentUserAPIState = getInitialState(),
  action: CurrentUserAction
): CurrentUserAPIState {
  // this is done through utility in the real app
  switch (action.type) {
    case 'fetchUserStart': {
      return { status: 'loading', data: null };
    }
    case 'fetchUserDone': {
      return { status: 'done', data: action.user };
    }
    default:
      return state;
  }
}

export function fetchCurrentUserActionCreator() {
  return async (dispatch: Dispatch) => {
    // we have a utility for this in the real app
    // ignore error for now
    dispatch({
      type: 'fetchUserStart',
    });
    const user = await getUser();
    // @ts-expect-error: need to figure out thunk type
    dispatch(updateEntityActionCreator(User, [user]));
    dispatch({
      type: 'fetchUserDone',
      user,
    });
  };
}
