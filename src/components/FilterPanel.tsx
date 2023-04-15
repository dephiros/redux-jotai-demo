import { tw } from "twind";
import { useState, useRef } from "preact/hooks";

import FlashyBox from "./FlashyBox";

export interface FilterItem {
  name: string;
  value: string;
}

export default function FilterPanel({
  filterItems,
  onChange,
}: {
  filterItems: Array<{ name: string; value: string }>;
  onChange: (selected: Map<string, boolean>) => void;
}) {
  const [selectedItems, setSelectedItems] = useState(
    new Map(filterItems.map((item) => [item.value, false]))
  );
  const idRef = useRef(new Date().getTime());

  const handleOnChange = (item: FilterItem) => {
    const newSelected = new Map(selectedItems).set(
      item.value,
      !selectedItems.get(item.value)
    );
    setSelectedItems(newSelected);
    onChange(newSelected);
  };

  return (
    <FlashyBox
      As="ul"
      className={tw`flex flex-col absolute top-0 right-0 gap-3 bg-green-800 p-4`}
    >
      {filterItems.map((item) => (
        <li key={item.value} class={tw`flex`}>
          <input
            type="checkbox"
            onChange={() => handleOnChange(item)}
            name={item.value}
            id={`${idRef.current}-${item.value}`}
          />{" "}
          <label for={`${idRef.current}-${item.value}`}>{item.name}</label>
        </li>
      ))}
    </FlashyBox>
  );
}
