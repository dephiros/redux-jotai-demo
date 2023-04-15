import { tw } from "twind";
import FlashyBox from "../../../components/FlashyBox";
import { Customer } from "../../interface/customer";

export default function ({ customer }: { customer: Customer }) {
  return (
    <FlashyBox className={tw`flex flex-col justify-center ml-auto`}>
      {customer.location.country}
    </FlashyBox>
  );
}
