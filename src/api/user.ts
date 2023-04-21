// TODO this needs to return the JSON interface
// normalize would need to be called inside atom or store before putting inside the store

import { CurrentUserAPIInterface } from "../interfaces/User";
import { waitFor } from "../utils";

// move this to atom and use atom to define a resource
export async function getUser(): Promise<CurrentUserAPIInterface> {
  await waitFor(1000);
  return Promise.resolve({
    id: "0",
    name: "Catalina Arroyo",
    avatar:
      "https://avataaars.io/?avatarStyle=Circle&topType=LongHairNotTooLong&accessoriesType=Kurt&hairColor=BrownDark&facialHairType=MoustacheMagnum&facialHairColor=Blonde&clotheType=GraphicShirt&clotheColor=PastelOrange&graphicType=Hola&eyeType=Side&eyebrowType=DefaultNatural&mouthType=Eating&skinColor=Yellow",
  });
}
