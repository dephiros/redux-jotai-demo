import { JSX } from "preact";
import { FlashyBox, getColor } from "./FlashyBox";
import { Atom, useAtomValue } from "jotai";
import { currentTimeAtom } from "../store";

export function AtomComponent(): JSX.Element {
  const value = useAtomValue(currentTimeAtom);
  return <FlashyBox>{value}</FlashyBox>;
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
    <FlashyBox color={getColor(count, { max: max || count })}>
      {<RecursiveComponent value={value} max={count} count={count - 1} />}
    </FlashyBox>
  );
}
