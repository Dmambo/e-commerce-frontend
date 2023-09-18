import { Separator } from "@/components/ui/separator";
import { Copy } from "lucide-react";
import { toast } from "react-hot-toast";

const PaymentDetails = () => {
  const accNum = "0830473895";
  const bank = "Guaranty Trust Bank";
  const copyAccount = () => {
    navigator.clipboard.writeText(accNum);
    toast.success("Copied");
  };
  const copyBank = () => {
    navigator.clipboard.writeText(bank);
    toast.success("Copied");
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center mb-6">
        <div className="flex flex-col items-center justify-center mb-6">
          <h1>Payment Details</h1>
          <p>
            Pay to this account
            <span>Add the transaction Id to the remark of your payment</span>
          </p>
        </div>
      </div>
      <div>
        <div className="flex justify-between border border-y-gray-400 p-3">
          <h3>Account-Name</h3>
          <p className="flex gap-2">Sidaf Natural products</p>
        </div>

        <div className="flex justify-between border border-y-gray-400 p-3">
          <h3>Account-Number</h3>
          <p className="flex gap-2">
            0830473895
            <span onClick={copyAccount} className="cursor-pointer">
              <Copy />
            </span>
          </p>
        </div>
        <div className="flex justify-between border border-y-gray-400 p-3">
          <h3>Bank-Name</h3>
          <p className="flex gap-2">
            Guaranty Trust Bank
            <span onClick={copyBank} className="cursor-pointer">
              <Copy />
            </span>
          </p>
        </div>
      </div>
      <Separator className="my-6" />
    </>
  );
};

export default PaymentDetails;
