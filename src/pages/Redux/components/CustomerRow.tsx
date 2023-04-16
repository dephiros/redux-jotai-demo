import { tw } from "twind";

import { Customer } from "../../../interfaces/Customer";
import CustomerAvatar from "./CustomerAvatar";
import CustomerDetails from "./CustomerDetails";
import FlashyBox from "../../../components/FlashyBox";

function getName(customer: Customer) {
  return `${customer.name.first} ${customer.name.last}`;
}

export default function CustomerRow({ customer }: { customer: Customer }) {
  return (
    <FlashyBox className={tw`flex p-2 gap-3`}>
      <CustomerAvatar customer={customer} />
      <CustomerDetails customer={customer} />
    </FlashyBox>
  );
}
