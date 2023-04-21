import { Type, Static } from "@sinclair/typebox";

export const CurrentUserAPISchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
  avatar: Type.String({}),
});

export type CurrentUserAPIInterface = Static<typeof CurrentUserAPISchema>;

export interface CurrentUserAPIState {
  status: "loading" | "done" | null;
  data: CurrentUserAPIInterface | null;
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
      user: CurrentUserAPIInterface;
    };
