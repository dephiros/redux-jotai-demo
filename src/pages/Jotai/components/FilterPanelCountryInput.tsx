import { atom, useAtom } from "jotai";
import React from "react";
import { getFilterStateForCountryAtom } from "../atoms/customer";

export default function ({ country, id }: { country: string; id: string }) {
  const countryAtom = React.useMemo(
    () => getFilterStateForCountryAtom(country),
    [country]
  );
  const [checked, toggleChecked] = useAtom(countryAtom);
  return (
    <React.Fragment>
      <input
        type="checkbox"
        onChange={() => toggleChecked()}
        value=""
        checked={checked}
        name={country}
        id={`${id}-${country}`}
      />{" "}
      <label htmlFor={`${id}-${country}`}>{country}</label>
    </React.Fragment>
  );
}
