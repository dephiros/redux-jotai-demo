import { tw } from "twind";
import FlashyBox from "../../../components/FlashyBox";
import { Customer } from "../../../models/Customer";

export default function ({ customer }: { customer: Customer }) {
  return (
    <FlashyBox className={tw`flex flex-col justify-center`}>
      {customer.location.country}
    </FlashyBox>
  );
}
