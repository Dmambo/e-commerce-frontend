import Image from "next/image";
import { X } from "lucide-react";

import IconButton from "@/app/components/ui/icon-button";
import Currency from "@/app/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { Product } from "@/types";
import Button from "@/app/components/ui/button";



interface CartItemProps {
  data: Product;
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();


  const handleIncrement = () => {
    cart.increaseQuantity(data.id);
  };

  const handleDecrement = () => {
    cart.decreaseQuantity(data.id);
  };

  const onRemove = () => {
    cart.removeItem(data.id);
  };

  return (
    <li className="flex py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          fill
          src={data.images[0].url}
          alt=""
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          <IconButton onClick={onRemove} icon={<X size={15} />} />
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className="text-lg font-semibold text-black">{data.name}</p>
          </div>
          <div className="mt-1 flex text-sm">
            <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
              {data.size.name}
            </p>
            <p className="text-gray-500">{data.description}</p>
          </div>
          <Currency value={Number(data.price) * (data.quantity)} />{" "} 
          {/* Update the price based on the quantity */}
        </div>
        <div className="flex items-center justify-center gap-2">
          <Button
            onClick={handleIncrement}
            className="flex items-center rounded-full bg-black px-2 py-0"
          >
            +
          </Button>
          <span>{data.quantity}</span>{" "}
          {/* Display the quantity from the cart item */}
          <Button
            className="flex items-center rounded-full bg-black px-2 py-0"
            onClick={handleDecrement}
            disabled={data.quantity === 1} // Disable the decrement button when quantity is 1
          >
            -
          </Button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
