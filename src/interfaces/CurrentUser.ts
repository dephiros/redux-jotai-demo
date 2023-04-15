export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface CurrentUserState {
  status: "loading" | "done" | null;
  data: User | null;
}

export enum CurrentUserActionType {
  FETCH_USER_START = "fetchUserStart",
  FETCH_USER_DONE = "fetchUserDone",
}

export type CurrentUserAction =
  | {
      type: CurrentUserActionType.FETCH_USER_START;
    }
  | {
      type: CurrentUserActionType.FETCH_USER_DONE;
      user: User;
    };
