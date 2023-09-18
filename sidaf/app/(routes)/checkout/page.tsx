"use client";

import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";
import useCart from "@/hooks/use-cart";
import Button from "@/app/components/ui/button";
import Currency from "@/app/components/ui/currency";
import { Copy } from "lucide-react";
import PaymentDetails from "./components/payment-details";

const PaymentPage = () => {
  const searchParams = useSearchParams();
  const [transactionId, setTransactionId] = useState("");
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });

  const router = useRouter()

  const copy = () => {
    navigator.clipboard.writeText(transactionId);
    toast.success("Transaction ID copied to clipboard.");
  }

  useEffect(() => {
    setTransactionId(generateTransactionID());
    if (searchParams.get("success")) {
      toast.success("Payment completed.");
      removeAll();
    }

    if (searchParams.get("canceled")) {
      toast.error("Something went wrong.");
    }
  }, [searchParams, removeAll]);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price) * item.quantity;
  }, 0);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };


  const generateTransactionID = () => {
    const length = 8;
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

// Update this function to send data in JSON format
const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/checkout`;

  const requestData = {
    name: formData.name,
    address: formData.address,
    phone: formData.phone,
    email: formData.email,
    transactionId: transactionId,
    products: items.map(item => item.id),
    quantities: items.map(item => item.quantity),
  };

  axios
    .post(apiUrl, requestData)
    .then((response) => {
      console.log("Payment processed:", response.data);
      toast.success("Payment completed.");
              // Empty the cart after successful payment
              removeAll();

              // Route to the root page after successful payment
              router.push("/");
    })
    .catch((error) => {
      console.error("Error processing payment:", error);
      toast.error("Something went wrong.");
    });
};


  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Payment Details</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4 mb-10">
          <div className="text-base font-medium text-gray-900">Order total</div>
          <Currency value={totalPrice} />
        </div>
      </div>

<div  className="m-auto space-y-4 border border-blue-200 p-6 rounded-md flex flex-col justify-center w-full max-w-lg">
<div className="mt-6">
        <PaymentDetails />
      </div>

      <form
        // className="m-auto space-y-4 border border-blue-200 p-6 rounded-md flex flex-col justify-center w-full max-w-lg"
        onSubmit={handleSubmit}
      >
  
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            autoComplete="name"
            required
            className="mt-1 p-4 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <input
            type="text"
            name="address"
            id="address"
            autoComplete="address"
            required
            className="mt-1 p-4 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            autoComplete="tel"
            required
            className="mt-1 p-4 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="email"
            required
            className="mt-1 p-4 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            onChange={handleInputChange}
          />
        </div>
        <div className="text-base font-medium text-gray-900">
          Transaction ID
          <span><p className="text-orange-400 text-xs">
            **Add this transaction id to the remark**
          </p>
          </span>
        </div>
        <div className="flex justify-between px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-md">
          {transactionId}
          <span>
            <Copy 
              onClick={copy}
            />
          </span>
        </div>
        <Button type="submit" className="w-48 mt-6">
          Paid
        </Button>
      </form>
</div>
    </div>
  );
};

export default PaymentPage;
