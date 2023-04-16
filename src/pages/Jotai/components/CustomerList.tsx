import { useAtomValue } from "jotai";
import { tw } from "twind";
import FlashyBox from "../../../components/FlashyBox";
import Loader from "../../../components/Loader";
import { filteredCustomerByCountryAtom } from "../atoms/customer";
import CustomerListHeader from "./CustomerListHeader";
import CustomerRow from "./CustomerRow";

export default function CustomerList() {
  const customers = useAtomValue(filteredCustomerByCountryAtom);
  return customers ? (
    <FlashyBox className={tw`flex flex-col justify-center text-center p-3`}>
      <CustomerListHeader />
      <ul className={tw`max-h-[500px] overflow-y-scroll flex flex-col`}>
        {customers.map((customer) => (
          <li key={customer.id}>
            <CustomerRow customer={customer} />
          </li>
        ))}
      </ul>
    </FlashyBox>
  ) : null;
}
