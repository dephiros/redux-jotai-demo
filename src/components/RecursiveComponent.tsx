import { JSX } from "preact";
import { tw } from "twind";
import FlashyBox, { getColor } from "./FlashyBox";
import { Atom, useAtomValue } from "jotai";
import { currentTimeAtom } from "../store";

export function AtomComponent(): JSX.Element {
  const value = useAtomValue(currentTimeAtom);
  return (
    <FlashyBox className={tw`p-5 border(blueGray-400 solid 1)`}>
      {value}
    </FlashyBox>
  );
}

export function RecursiveComponent({
  value,
  count,
  max,
}: {
  value?: string;
  count: number;
  max?: number;
}): JSX.Element {
  const renderValue = () =>
    value !== undefined ? <>value</> : <AtomComponent />;
  return count <= 0 ? (
    renderValue()
  ) : (
    <FlashyBox
      className={tw`p-5 border(blueGray-400 solid 1)`}
      color={getColor(count, { max: max || count })}
    >
      {<RecursiveComponent value={value} max={count} count={count - 1} />}
    </FlashyBox>
  );
}
