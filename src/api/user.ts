import { waitFor } from "../utils";
export async function getUser() {
  await waitFor(1000);
  return Promise.resolve({
    id: 0,
    name: "Catalina Arroyo",
    avatar:
      "https://avataaars.io/?avatarStyle=Circle&topType=LongHairNotTooLong&accessoriesType=Kurt&hairColor=BrownDark&facialHairType=MoustacheMagnum&facialHairColor=Blonde&clotheType=GraphicShirt&clotheColor=PastelOrange&graphicType=Hola&eyeType=Side&eyebrowType=DefaultNatural&mouthType=Eating&skinColor=Yellow",
  });
}
