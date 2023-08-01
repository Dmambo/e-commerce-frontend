"use client";



import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";
import useCart from "@/hooks/use-cart";
import Button from "@/app/components/ui/button";
import Currency from "@/app/components/ui/currency";

const PaymentPage = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    email: "",
    paymentScreenshot: null as File | null,
  });

  useEffect(() => {
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

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFormData({ ...formData, paymentScreenshot: file });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Perform payment processing logic here
    // You can use formData to access the form fields and paymentScreenshot for the uploaded file
    // Make the API call to process the payment
    // For demonstration purposes, you can use axios to send the form data to a backend server

    // Example: Assuming you have an API endpoint for processing payments
    const apiUrl = "https://example.com/api/process-payment";
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("phoneNumber", formData.phoneNumber);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("paymentScreenshot", formData.paymentScreenshot || "");

    axios
      .post(apiUrl, formDataToSend)
      .then((response) => {
        // Handle the response and show success/failure message to the user
        console.log("Payment processed:", response.data);
      })
      .catch((error) => {
        console.error("Error processing payment:", error);
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

      <form className="m-auto space-y-4 border border-blue-200 p-6 rounded-md flex flex-col justify-center w-6/12" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
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
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
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
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
            autoComplete="tel"
            required
            className="mt-1 p-4 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
        <div>
          <label htmlFor="paymentScreenshot" className="block text-sm font-medium text-gray-700">
            Upload Payment Screenshot
          </label>
          <input
            type="file"
            accept="image/*"
            name="paymentScreenshot"
            id="paymentScreenshot"
            required
            className="mt-1 p-4 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            onChange={handleFileChange}
          />
        </div>
        <Button type="submit" className="w-48 mt-6">
          Make Payment
        </Button>
      </form>
    </div>
  );
};

export default PaymentPage;
