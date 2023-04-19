import { tw } from "twind";
import FlashyBox from "../../../components/FlashyBox";
import { Customer } from "../../../interfaces/Customer";
import { getName } from "../../../utils";

export default function ({ customer }: { customer: Customer }) {
  return (
    <FlashyBox className={tw`flex flex-col w-[200px] text-left`}>
      <img
        className={tw`p-1 w-[100px] h-[100px] rounded-full border-2 border-gray-300`}
        alt={getName(customer.name)}
        src={customer.picture.medium}
      />
      {getName(customer.name)}
    </FlashyBox>
  );
}
