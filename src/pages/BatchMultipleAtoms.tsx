import React from "react";
import { tw } from "twind";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { getColor } from "../utils";
import FlashyBox from "../components/FlashyBox";

const countAtom = atom(0);

const colorAtom = atom(getColor());

const incrementAtom = atom(null, (get, set) => {
  set(countAtom, get(countAtom) + 1);
  set(colorAtom, getColor());
});

const doubleCountAtom = atom((get) => {
  return get(countAtom) * 2;
});

const trippleCountAtom = atom((get) => {
  return get(countAtom) * 3;
});

const doublePlusOneAtom = atom((get) => {
  return get(doubleCountAtom) + 1;
});

export default function BatchMultipleAtom() {
  const count = useAtomValue(countAtom);
  const trippleCount = useAtomValue(trippleCountAtom);
  const doublePlusOne = useAtomValue(doublePlusOneAtom);
  const color = useAtomValue(colorAtom);
  const increment = useSetAtom(incrementAtom);
  const countRef = React.useRef(0);

  React.useEffect(() => {
    countRef.current++;
    alert(countRef.current);
  });
  return (
    <FlashyBox color={color} duration={1000} className={tw`flex-col`}>
      <div className={tw`p-3`}>
        <p>
          <b>Description</b>: this demo tests batch update capability of Jotai
          across multiple atoms
        </p>
        <p>
          This tries to test the behavior of Jotai similar to a single action in
          Redux that update multiple parts of the state but only trigger one
          rerender
        </p>
        <p>
          The component subscribes to various atoms at various levels of the
          state graphs. The increment triggers update to two separate
          atom(count, color) but only trigger rerender once. See console.log for
          each click or flashing
        </p>
        <ul className={tw`mt-5`}>
          <li>
            <b>count: </b>is the top level count state: {count}
          </li>
          <li>
            <b>tripple count: </b>
            {trippleCount}
          </li>
          <li>
            <b>doulble count plus one </b>
            {doublePlusOne}
          </li>
        </ul>
      </div>
      <button
        onClick={increment}
        className={tw`border-solid border-1 border-white`}
      >
        <span
          style={{
            backgroundColor: color,
            width: "1rem",
            height: "1rem",
            display: "inline-block",
            borderRadius: "1rem",
          }}
        ></span>{" "}
        Increment count and change color(separate atoms)
      </button>
    </FlashyBox>
  );
}
