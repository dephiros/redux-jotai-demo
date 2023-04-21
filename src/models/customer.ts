import { Entity } from "@rest-hooks/rest";

export class Customer extends Entity {
  name: {
    first: string;
    last: string;
  } = { first: "", last: "" };
  location: {
    city: string;
    state: string;
    country: string;
  } = { city: "", state: "", country: "" };
  picture: {
    thumbnail: string;
    medium: string;
  } = { thumbnail: "", medium: "" };
  login: { uuid: string } = { uuid: "" };

  pk() {
    return this.login.uuid;
  }
}
