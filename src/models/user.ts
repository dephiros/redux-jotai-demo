import { Entity } from "@rest-hooks/rest";
import { waitFor } from "../utils";

export class User extends Entity {
  id: string = "";
  name: string = "";
  avatar: string = "";

  pk() {
    return this.id;
  }
}

export async function getUser(): Promise<User> {
  await waitFor(1000);
  return Promise.resolve(
    User.fromJS({
      id: "0",
      name: "Catalina Arroyo",
      avatar:
        "https://avataaars.io/?avatarStyle=Circle&topType=LongHairNotTooLong&accessoriesType=Kurt&hairColor=BrownDark&facialHairType=MoustacheMagnum&facialHairColor=Blonde&clotheType=GraphicShirt&clotheColor=PastelOrange&graphicType=Hola&eyeType=Side&eyebrowType=DefaultNatural&mouthType=Eating&skinColor=Yellow",
    })
  );
}
