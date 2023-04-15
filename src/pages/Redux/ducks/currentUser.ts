import { Dispatch } from "redux";

import {
  CurrentUserState,
  CurrentUserAction,
} from "./../../../interfaces/currentUser";
import { updateEntityActionCreator } from "../../Redux/ducks/entities";
import { getUser } from "../../../api/user";

function getInitialState(): CurrentUserState {
  return {
    status: null,
    data: null,
  };
}

export function reducer(state: CurrentUserState, action: CurrentUserAction) {
  // this is done through utility in the real app
  switch (action.type) {
    case "fetchUserStart": {
      return { status: "loading" };
    }
    case "fetchUserDone": {
      return { status: "done ", data: action.user };
    }
    default:
      return state || getInitialState();
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
    // skip normalizer
    dispatch(updateEntityActionCreator("user", [user]));
    dispatch({
      type: "fetchUserDone",
      user,
    });
  };
}
