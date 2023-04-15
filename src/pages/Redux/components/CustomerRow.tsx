import { tw } from "twind";

import { Customer } from "../../interface/customer";
import CustomerAvatar from "./CustomerAvatar";
import CustomerDetails from "./CustomerDetails";
import FlashyBox from "../../../components/FlashyBox";

function getName(customer) {
  return `${customer.name.first} ${customer.name.last}`;
}

export default function CustomerRow({ customer }: { customer: Customer }) {
  return (
    <FlashyBox className={tw`flex justify-between p-2`}>
      <CustomerAvatar customer={customer} />
      <CustomerDetails customer={customer} />
    </FlashyBox>
  );
}
