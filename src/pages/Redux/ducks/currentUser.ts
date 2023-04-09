import { Dispatch } from "redux";
import { updateEntityActionCreator } from "../../Redux/ducks/entities";

const INITIAL_STATE = {
  status: null,
  data: null,
};

export function reducer(state: any, action: any) {
  // this is done through utility in the real app
  switch (action.type) {
    case "fetchUserStart": {
      return { status: "loading" };
    }
    case "fetchUserDone": {
      return { status: "done ", data: action.user };
    }
    default:
      return state || { ...INITIAL_STATE };
  }
}

function getUser() {
  return Promise.resolve({
    id: 0,
    name: "Catalina Arroyo",
    avatar:
      "https://avataaars.io/?avatarStyle=Circle&topType=LongHairNotTooLong&accessoriesType=Kurt&hairColor=BrownDark&facialHairType=MoustacheMagnum&facialHairColor=Blonde&clotheType=GraphicShirt&clotheColor=PastelOrange&graphicType=Hola&eyeType=Side&eyebrowType=DefaultNatural&mouthType=Eating&skinColor=Yellow",
  });
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
