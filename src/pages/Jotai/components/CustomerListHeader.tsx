import { tw } from "twind";

import FlashyBox from "../../../components/FlashyBox";
import { useAtomValue, useSetAtom } from "jotai";
import { filterVisibleAtom } from "./FilterPanel";
import { customerCountAtom, customersAtom } from "../atoms/customer";

export default function CustomerListHeader() {
  const customerCount = useAtomValue(customerCountAtom);
  const toggleFilterVisible = useSetAtom(filterVisibleAtom);
  const handleFilterClick = () => {
    toggleFilterVisible();
  };
  return (
    <FlashyBox className="justify-center">
      <h3 className={tw`text-xl my-3 font-bold justify-center`}>
        {`Customers(${customerCount})`}
      </h3>
      <button className={tw`p-2`} onClick={handleFilterClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M11 20q-.425 0-.713-.288T10 19v-6L4.2 5.6q-.375-.5-.113-1.05T5 4h14q.65 0 .913.55T19.8 5.6L14 13v6q0 .425-.288.713T13 20h-2Z"
          />
        </svg>
      </button>
    </FlashyBox>
  );
}
