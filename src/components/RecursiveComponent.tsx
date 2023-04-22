import { tw } from "twind";
import FlashyBox from "./FlashyBox";
import { Atom, useAtomValue } from "jotai";

export function AtomComponent({ atom }: { atom: Atom<string> }): JSX.Element {
  const value = useAtomValue(atom);
  return (
    <FlashyBox className={tw`p-5 border(blueGray-400 solid 1)`}>
      {value}
    </FlashyBox>
  );
}

export function RecursiveComponent({
  value,
  count,
  atom,
}: {
  value?: string;
  count: number;
  max?: number;
  atom?: Atom<string>;
}): JSX.Element {
  const renderValue = () =>
    value !== undefined ? (
      <>{value}</>
    ) : atom ? (
      <AtomComponent atom={atom} />
    ) : (
      <></>
    );
  return count <= 0 ? (
    renderValue()
  ) : (
    <FlashyBox className={tw`p-5 border(blueGray-400 solid 1)`}>
      {
        <RecursiveComponent
          value={value}
          max={count}
          count={count - 1}
          atom={atom}
        />
      }
    </FlashyBox>
  );
}
