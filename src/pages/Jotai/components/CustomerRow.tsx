import { tw } from "twind";
import FlashyBox from "../../../components/FlashyBox";
import { Customer } from "../../../models/Customer";
import CustomerAvatar from "./CustomerAvatar";
import CustomerDetails from "./CustomerDetails";

export default function CustomerRow({ customer }: { customer: Customer }) {
  return (
    <FlashyBox className={tw`flex p-2 gap-3`}>
      <CustomerAvatar customer={customer} />
      <CustomerDetails customer={customer} />
    </FlashyBox>
  );
}
