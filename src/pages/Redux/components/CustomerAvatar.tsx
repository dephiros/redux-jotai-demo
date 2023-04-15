import { tw } from "twind";
import FlashyBox from "../../../components/FlashyBox";
import { Customer } from "../../interface/customer";
import { getName } from "../../../utils";

export default function ({ customer }: { customer: Customer }) {
  return (
    <FlashyBox className={tw`flex flex-col`}>
      <img
        class={tw`p-1 w-[100px] h-[100px] rounded-full border-2 border-gray-300`}
        alt={getName(customer.name)}
        src={customer.picture.medium}
      />
      {getName(customer.name)}
    </FlashyBox>
  );
}
