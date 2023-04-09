import { currentTimeAtom } from "../store";
import { FlashyBox, getColor } from "../components/FlashyBox";
import { RecursiveComponent } from "../components/RecursiveComponent";
import { useAtomValue } from "jotai";

export default function Page() {
  return (
    <FlashyBox color={getColor(1, { max: 1 })}>
      <Container10 />
      <RecursiveComponent count={5} />
    </FlashyBox>
  );
}

function Container10() {
  const value = useAtomValue(currentTimeAtom);
  return (
    <FlashyBox color={getColor(1, { max: 1 })}>
      <RecursiveComponent value={value} count={5} />
    </FlashyBox>
  );
}
