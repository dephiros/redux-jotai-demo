import { useAtomValue } from "jotai";
import { tw } from "twind";
import FlashyBox from "../../../components/FlashyBox";
import {
  currentUserAvatarAtom,
  currentUserNameAtom,
} from "../atoms/currentUser";

export default function Header() {
  const avatar = useAtomValue(currentUserAvatarAtom);
  const name = useAtomValue(currentUserNameAtom);
  return (
    <FlashyBox className={tw`flex flex-col text-center text-xl`}>
      <img className={tw`block mx-auto w-[100px]`} src={avatar} alt={name} />
      <p>{name}</p>
    </FlashyBox>
  );
}
