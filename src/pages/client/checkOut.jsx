import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiMinus, BiPlus, BiTrash } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function CheckOutPage() {
  const location = useLocation();
  console.log(location.state.cart);
  const [cart, setCart] = useState(location.state.cart || []);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  function getTotal() {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.qty;
    });
    return total;
  }

  function removeFromCart(index) {
    const newCart = cart.filter((item, i) => i != index);
    setCart(newCart);
  }

  function changeQty(index, qty) {
    const newQty = cart[index].qty + qty;
    if (newQty <= 0) {
      removeFromCart(index);
      return;
    } else {
      const newCart = [...cart];
      newCart[index].qty = newQty;
      setCart(newCart);
    }
  }

  async function placeOrder() {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      return;
    }
    const orderInformation = {
      products: [],
      phone: phoneNumber,
      address: address,
    };

    for (let i = 0; i < cart.length; i++) {
      const item = {
        productId: cart[i].productId,
        qty: cart[i].qty,
      };
      orderInformation.products[i] = item;
    }

    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/orders",
        orderInformation,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      toast.success("Order Placed Successfully");
      navigate("/");
      console.log(res.data);
    } catch (err) {
      toast.error("Error Placing Order");
      console.log(err);
      return;
    }
  }

  return (
    <div className="w-full min-h-screen bg-primary flex justify-center items-start py-10 px-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-6">
        {/* LEFT: Cart items */}
        <div className="flex flex-col gap-4">
          {cart.map((item, index) => {
            return (
              <div
                key={item.productId}
                className="w-full bg-white shadow-md rounded-2xl flex flex-col md:flex-row items-center gap-4 p-4 border border-gray-100 relative"
              >
                {/* Image */}
                <div className="flex-shrink-0">
                  <img
                    src={item.images}
                    className="w-[90px] h-[90px] object-cover rounded-2xl"
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
                      changeQty(index, -1);
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
                      changeQty(index, 1);
                    }}
                  >
                    <BiPlus />
                  </button>
                </div>

                {/* Line total */}
                <div className="flex items-center justify-center md:justify-end min-w-[130px]">
                  <span className="text-lg md:text-xl text-secondary font-semibold">
                    Rs. {(item.price * item.qty).toFixed(2)}
                  </span>
                </div>

                {/* Remove button */}
                <button
                  className="absolute top-3 right-3 text-red-500 cursor-pointer hover:bg-red-500 hover:text-white rounded-full p-1.5 transition-colors duration-200"
                  onClick={() => {
                    removeFromCart(index);
                  }}
                >
                  <BiTrash size={18} />
                </button>
              </div>
            );
          })}
          {cart.length === 0 && (
            <div className="w-full bg-white rounded-2xl shadow-md border border-gray-100 p-6 text-center text-gray-500 text-sm">
              Your cart is empty.
            </div>
          )}
        </div>

        {/* RIGHT: Summary & Address */}
        <div className="w-full h-fit bg-white rounded-2xl shadow-lg border border-gray-100 px-6 py-5 flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-secondary">
            Order Summary
          </h2>

          <div className="flex items-center justify-between text-sm text-gray-700">
            <span>Subtotal</span>
            <span>Rs. {getTotal().toFixed(2)}</span>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>

          <div className="border-t border-gray-200 my-2 pt-3 flex items-center justify-between">
            <span className="text-base font-semibold text-secondary">
              Total
            </span>
            <span className="text-xl font-bold text-accent">
              Rs. {getTotal().toFixed(2)}
            </span>
          </div>

          <div className="mt-2 flex flex-col gap-3">
            <input
              type="text"
              className="w-full h-10 px-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />
            <input
              type="text"
              className="w-full h-10 px-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
              placeholder="Address"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
          </div>

          <button
            className="mt-2 w-full text-white bg-accent px-4 py-2.5 rounded-full font-semibold hover:bg-accent/90 transition-all duration-300 shadow-md active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed text-sm"
            onClick={() => {
              placeOrder();
            }}
            disabled={cart.length === 0 || phoneNumber === "" || address === ""}
          >
            Place Order
          </button>

          <p className="text-[11px] text-gray-400 mt-1">
            By placing your order, you agree to our Terms & Conditions and
            Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
