import { Dispatch } from "redux";

import {
  CurrentUserState,
  CurrentUserAction,
} from "./../../../interfaces/CurrentUser";
import { updateEntityActionCreator } from "../../Redux/ducks/entities";
import { getUser } from "../../../models/user";

function getInitialState(): CurrentUserState {
  return {
    status: null,
    data: null,
  };
}

export function reducer(
  state: CurrentUserState = getInitialState(),
  action: CurrentUserAction
) {
  // this is done through utility in the real app
  switch (action.type) {
    case "fetchUserStart": {
      return { status: "loading" };
    }
    case "fetchUserDone": {
      return { status: "done ", data: action.user };
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
      type: "fetchUserStart",
    });
    const user = await getUser();
    dispatch(updateEntityActionCreator("users", [user]));
    dispatch({
      type: "fetchUserDone",
      user,
    });
  };
}
