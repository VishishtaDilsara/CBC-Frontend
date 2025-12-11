import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import ImageSlider from "../../components/imageSlider";
import Loading from "../../components/loading";
import { addToCart, getCart } from "../../utils/cart";

export default function ProductOverviewPage() {
  const params = useParams();
  const productId = params.id;
  const [status, setStatus] = useState("loading"); //loading, success, error
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId)
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
        setStatus("success");
      })
      .catch((err) => {
        console.log(err);
        setStatus("error");
        toast.error("Error fetching product details");
      });
  }, []);

  return (
    <>
      {status == "success" && (
        <div className="w-full min-h-screen bg-primary flex justify-center items-start md:items-center py-10 px-4">
          <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col md:flex-row overflow-hidden">
            {/* Mobile title */}
            <div className="w-full md:hidden px-6 pt-6">
              <h1 className="text-2xl font-semibold text-secondary text-center">
                {product.name}
              </h1>
              {product.altNames && product.altNames.length > 0 && (
                <div className="mt-3 flex flex-wrap justify-center gap-2">
                  {product.altNames.map((altName, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full bg-primary text-xs text-gray-600"
                    >
                      {altName}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* LEFT: IMAGES */}
            <div className="w-full md:w-[50%] flex justify-center items-center bg-gradient-to-b from-gray-50 to-white p-6 md:p-8">
              <ImageSlider images={product.images} />
            </div>

            {/* RIGHT: DETAILS */}
            <div className="w-full md:w-[50%] flex justify-center items-center bg-white">
              <div className="w-full max-w-md px-6 md:px-8 py-8 flex flex-col gap-5">
                {/* Desktop title + tags */}
                <div className="hidden md:block">
                  <h1 className="text-3xl font-semibold text-secondary">
                    {product.name}
                  </h1>
                  {product.altNames && product.altNames.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {product.altNames.map((altName, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 rounded-full bg-primary text-xs text-gray-600"
                        >
                          {altName}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Product ID */}
                <div className="mt-1">
                  <span className="text-[11px] uppercase tracking-[0.22em] text-gray-400">
                    Product ID
                  </span>
                  <span className="ml-2 text-xs font-semibold text-gray-700 tracking-wide">
                    {product.productId}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  {product.description}
                </p>

                {/* Price block */}
                <div className="mt-2 inline-flex flex-col gap-1 bg-primary/70 rounded-2xl px-5 py-4 border border-gray-200">
                  {product.labelledPrice > product.price ? (
                    <>
                      <span className="text-base text-gray-400 line-through">
                        Rs. {product.labelledPrice.toFixed(2)}
                      </span>
                      <span className="text-3xl font-extrabold text-accent">
                        Rs. {product.price.toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span className="text-3xl font-extrabold text-accent">
                      Rs. {product.price.toFixed(2)}
                    </span>
                  )}
                  <span className="text-[11px] text-gray-500 mt-1">
                    * Shipping & taxes calculated at checkout.
                  </span>
                </div>

                {/* Buttons */}
                <div className="w-full flex justify-center md:justify-start items-center mt-6 flex-col md:flex-row gap-3">
                  <button
                    className="w-[220px] h-[50px] bg-[#33334d] cursor-pointer text-white font-semibold 
                               rounded-full hover:bg-[#26263a] transition-all duration-300 shadow-md active:scale-95"
                    onClick={() => {
                      console.log("Old Cart");
                      console.log(getCart());
                      addToCart(product, 1);
                      console.log("New Cart");
                      console.log(getCart());
                    }}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="w-[220px] h-[50px] bg-accent cursor-pointer text-white font-semibold 
                               rounded-full hover:bg-accent/90 transition-all duration-300 shadow-md active:scale-95"
                    onClick={() => {
                      navigate("/checkout", {
                        state: {
                          cart: [
                            {
                              productId: product.productId,
                              name: product.name,
                              images: product.images[0],
                              price: product.price,
                              labelledPrice: product.labelledPrice,
                              qty: 1,
                            },
                          ],
                        },
                      });
                    }}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {status == "loading" && <Loading />}
    </>
  );
}
