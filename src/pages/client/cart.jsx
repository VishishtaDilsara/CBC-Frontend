import { useState } from "react";
import { addToCart, getCart, getTotal, removeFromCart } from "../../utils/cart";
import { BiMinus, BiPlus, BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function CartPage() {
  const [cart, setCart] = useState(getCart());

  return (
    <div className="w-full min-h-screen bg-primary flex flex-col items-center py-10 px-4">
      {/* Desktop total summary */}
      <div className="hidden md:flex w-full max-w-5xl justify-end mb-6">
        <div className="w-[320px] bg-white rounded-2xl shadow-lg px-6 py-4 flex flex-col items-center gap-2 border border-gray-100">
          <p className="text-lg text-secondary font-semibold">
            Total:
            <span className="text-accent font-bold ml-2">
              Rs. {getTotal().toFixed(2)}
            </span>
          </p>
          <Link
            to="/checkout"
            state={{ cart: cart }}
            className="w-full text-center text-white bg-accent px-4 py-2.5 rounded-full font-semibold hover:bg-accent/90 transition-all duration-300 shadow-md active:scale-95"
          >
            Checkout
          </Link>
        </div>
      </div>

      {/* Cart items */}
      <div className="w-full max-w-5xl flex flex-col gap-4">
        {cart.map((item) => {
          return (
            <div
              key={item.productId}
              className="w-full bg-white shadow-md rounded-2xl flex flex-col md:flex-row items-center gap-4 p-4 border border-gray-100 relative"
            >
              {/* Image */}
              <div className="flex-shrink-0">
                <img
                  src={item.images}
                  className="w-[100px] h-[100px] object-cover rounded-2xl"
                />
              </div>

              {/* Info */}
              <div className="flex-1 flex flex-col justify-center md:items-start items-center">
                <h1 className="text-lg md:text-xl text-secondary font-semibold text-center md:text-left">
                  {item.name}
                </h1>
                <h1 className="text-xs md:text-sm text-gray-500 font-medium mt-1">
                  {item.productId}
                </h1>

                {item.labelledPrice > item.price ? (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-sm text-gray-400 font-semibold line-through">
                      Rs. {item.labelledPrice.toFixed(2)}
                    </span>
                    <span className="text-base text-accent font-bold">
                      Rs. {item.price.toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <span className="mt-2 text-base text-accent font-bold">
                    Rs. {item.price.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Quantity controls */}
              <div className="flex items-center gap-3">
                <button
                  className="text-white font-bold rounded-xl bg-accent p-2 text-lg cursor-pointer hover:bg-accent/80 transition-colors duration-200 flex items-center justify-center"
                  onClick={() => {
                    addToCart(item, -1);
                    setCart(getCart());
                  }}
                >
                  <BiMinus />
                </button>
                <h1 className="text-lg text-secondary font-semibold min-w-[32px] text-center">
                  {item.qty}
                </h1>
                <button
                  className="text-white font-bold rounded-xl bg-accent p-2 text-lg cursor-pointer hover:bg-accent/80 transition-colors duration-200 flex items-center justify-center"
                  onClick={() => {
                    addToCart(item, 1);
                    setCart(getCart());
                  }}
                >
                  <BiPlus />
                </button>
              </div>

              {/* Line total */}
              <div className="flex items-center justify-center md:justify-end min-w-[140px]">
                <span className="text-lg md:text-xl text-secondary font-semibold">
                  Rs. {(item.price * item.qty).toFixed(2)}
                </span>
              </div>

              {/* Remove button */}
              <button
                className="absolute top-3 right-3 text-red-500 cursor-pointer hover:bg-red-500 hover:text-white rounded-full p-1.5 transition-colors duration-200"
                onClick={() => {
                  removeFromCart(item.productId);
                  setCart(getCart());
                }}
              >
                <BiTrash size={18} />
              </button>
            </div>
          );
        })}
      </div>

      {/* Mobile total summary */}
      <div className="w-full max-w-md md:hidden mt-8">
        <div className="w-full bg-white rounded-2xl shadow-lg px-6 py-4 flex flex-col items-center gap-2 border border-gray-100">
          <p className="text-lg text-secondary font-semibold">
            Total:
            <span className="text-accent font-bold ml-2">
              Rs. {getTotal().toFixed(2)}
            </span>
          </p>
          <Link
            to="/checkout"
            state={{ cart: cart }}
            className="w-full text-center text-white bg-accent px-4 py-2.5 rounded-full font-semibold hover:bg-accent/90 transition-all duration-300 shadow-md active:scale-95"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
