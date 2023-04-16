import { tw } from "twind";
import { useState, useRef } from "react";

import FlashyBox from "../../../components/FlashyBox";

export interface FilterItem {
  name: string;
  value: string;
}

export default function FilterPanel({
  filterItems,
  onChange,
  visible,
  onVisibleChange,
}: {
  filterItems: Array<{ name: string; value: string }>;
  onChange: (selected: Map<string, boolean>) => void;
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
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
        onClick={() => onVisibleChange?.(false)}
      >
        Close
      </button>
      {filterItems.map((item) => (
        <li key={item.value} className={tw`flex`}>
          <input
            type="checkbox"
            onChange={() => handleOnChange(item)}
            name={item.value}
            id={`${idRef.current}-${item.value}`}
          />{" "}
          <label htmlFor={`${idRef.current}-${item.value}`}>{item.name}</label>
        </li>
      ))}
    </FlashyBox>
  );
}
