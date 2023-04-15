import { tw } from "twind";
import { currentTimeAtom } from "../store";
import { FlashyBox, getColor } from "../components/FlashyBox";
import { RecursiveComponent } from "../components/RecursiveComponent";
import { useAtomValue } from "jotai";

export default function Page() {
  return (
    <FlashyBox
      className={tw`p-5 border(blueGray-400 solid 1)`}
      color={getColor(1, { max: 1 })}
    >
      <Container10 />
      <RecursiveComponent count={5} />
    </FlashyBox>
  );
}

function Container10() {
  const value = useAtomValue(currentTimeAtom);
  return (
    <FlashyBox
      className={tw`p-5 border(blueGray-400 solid 1)`}
      color={getColor(1, { max: 1 })}
    >
      <RecursiveComponent value={value} count={5} />
    </FlashyBox>
  );
}
