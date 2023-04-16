import { tw } from "twind";

import { Customer } from "../../../interfaces/Customer";
import FlashyBox from "../../../components/FlashyBox";

export default function CustomerListHeader({
  customers,
}: {
  customers: Array<Customer>;
}) {
  return (
    <FlashyBox As={"h3"} className={tw`text-xl my-3 font-bold justify-center`}>
      {`Customers(${customers.length})`}
    </FlashyBox>
  );
}
