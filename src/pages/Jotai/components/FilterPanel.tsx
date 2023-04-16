import { tw } from "twind";
import { useState, useRef } from "react";

import FlashyBox from "../../../components/FlashyBox";
import { atom, useAtom, useAtomValue } from "jotai";
import { customerCountriesAtom } from "../atoms/customer";
import FilterPanelCountryInput from "./FilterPanelCountryInput";

export interface FilterItem {
  name: string;
  value: string;
}

export default function FilterPanel() {
  const [visible, toggleVisible] = useAtom(filterVisibleAtom);

  const idRef = useRef(new Date().getTime());
  const countries = useAtomValue(customerCountriesAtom);

  return (
    <FlashyBox
      As="ul"
      className={tw(
        `flex flex-col 
        absolute top-0 right-0 gap-3 
        bg-coolGray-900 p-4 max-h-screen overflow-y-scroll rounded-md shadow-lg
        transition-transform duration-300 ease-in-out transform origin-top-right
        `,
        {
          "scale-0": !visible,
          "scale-100": visible,
        }
      )}
    >
      <button
        className={tw`bg-white text-black`}
        onClick={() => toggleVisible()}
      >
        Close
      </button>
      {[...countries].map((country) => (
        <li key={country} className={tw`flex`}>
          <FilterPanelCountryInput country={country} id={`${idRef.current}`} />
        </li>
      ))}
    </FlashyBox>
  );
}

const _filterVisibleAtom = atom(false);
export const filterVisibleAtom = atom(
  (get) => get(_filterVisibleAtom),
  (get, set, value?: undefined) => {
    const newValue = value ?? !get(_filterVisibleAtom);
    set(_filterVisibleAtom, newValue);
  }
);
