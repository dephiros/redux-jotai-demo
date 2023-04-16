import { tw } from "twind";
import { Customer } from "../../../interfaces/Customer";
import { getName } from "../../../utils";

export default function CustomerRow({ customer }: { customer: Customer }) {
  return (
    <div className={tw`flex flex-col justify-center text-center`}>
      <p>
        {getName(customer.name)}: <b>{customer.location.country}</b>
      </p>
    </div>
  );
}
