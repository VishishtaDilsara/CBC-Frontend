import { useState } from "react";
import { addToCart, getCart, getTotal, removeFromCart } from "../../utils/cart";
import { BiMinus, BiPlus, BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function CartPage() {
  const [cart, setCart] = useState(getCart());

  return (
    <div className="w-full h-full flex flex-col items-center pt-4 relative">
      <div className="w-[300px] h-[80px] shadow-2xl absolute top-1 right-1 flex flex-col justify-center items-center">
        <p className="text-2xl text-secondary font-bold ">
          {" "}
          Total:
          <span className="text-accent font-bold mx-2">
            {getTotal().toFixed(2)}
          </span>
        </p>
        <Link
          to="/checkout"
          className="text-white bg-accent px-4 py-2 rounded-lg font-bold hover:bg-secondary transition-all duration-300"
        >
          Checkout
        </Link>
      </div>
      {cart.map((item) => {
        return (
          <div
            key={item.productId}
            className="w-[600px] h-[100px] bg-primary shadow-2xl flex flex-row rounded-tl-2xl rounded-bl-2xl mb-4 relative justify-center items-center"
          >
            <img
              src={item.images}
              className="w-[100px] h-[100px] object-cover rounded-2xl "
            />
            <div className="w-[250px] h-full flex flex-col justify-center items-start pl-4">
              <h1 className="text-xl text-secondary font-semibold">
                {item.name}
              </h1>
              <h1 className="text-sm text-gray-600 font-semibold">
                {item.productId}
              </h1>
              {item.labelledPrice > item.price ? (
                <div>
                  <span className="text-md mx-1 text-gray-500 font-semibold line-through">
                    {item.labelledPrice.toFixed(2)}
                  </span>
                  <span className="text-md mx-1 text-accent font-bold">
                    {item.price.toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="text-md mx-1 text-accent font-bold">
                  {item.price.toFixed(2)}
                </span>
              )}
            </div>
            <div className="w-[100px] h-full flex flex-row justify-between items-center ">
              <button
                className="text-white font-bold rounded-xl hover:bg-accent/80 p-2 text-xl cursor-pointer aspect-square bg-accent "
                onClick={() => {
                  addToCart(item, -1);
                  setCart(getCart());
                }}
              >
                <BiMinus />
              </button>
              <h1 className="text-xl text-secondary font-semibold h-full flex items-center">
                {item.qty}
              </h1>
              <button
                className="text-white font-bold rounded-xl hover:bg-accent/80 p-2 text-xl cursor-pointer aspect-square bg-accent "
                onClick={() => {
                  addToCart(item, 1);
                  setCart(getCart());
                }}
              >
                <BiPlus />
              </button>
            </div>
            {/* total */}
            <div className="w-[150px] h-full flex justify-center items-center ">
              <span className="text-xl text-secondary font-semibold">
                Rs. {(item.price * item.qty).toFixed(2)}
              </span>
            </div>
            <button
              className="absolute text-red-600 cursor-pointer hover:bg-red-600 hover:text-white rounded-full p-2 right-[-40px]"
              onClick={() => {
                removeFromCart(item.productId);
                setCart(getCart());
              }}
            >
              <BiTrash />
            </button>
          </div>
        );
      })}
    </div>
  );
}
