import { tw } from "twind";
import { currentTimeAtom } from "../store";
import FlashyBox from "../components/FlashyBox";
import { RecursiveComponent } from "../components/RecursiveComponent";
import { useAtomValue } from "jotai";

export default function Page() {
  return (
    <FlashyBox className={tw`p-5 border(blueGray-400 solid 1)`}>
      <ContainerWithStateAndPassProp />
      <RecursiveComponent atom={currentTimeAtom} count={5} />
    </FlashyBox>
  );
}

function ContainerWithStateAndPassProp() {
  const value = useAtomValue(currentTimeAtom);
  return (
    <FlashyBox className={tw`p-5 border(blueGray-400 solid 1)`}>
      <RecursiveComponent value={value} count={5} />
    </FlashyBox>
  );
}
