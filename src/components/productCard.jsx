import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link
      to={"/overview/" + product.productId}
      className="w-[320px] h-[550px] bg-white rounded-2xl shadow-md 
                 hover:shadow-2xl border border-gray-100 overflow-hidden 
                 flex flex-col transition-all duration-300 hover:-translate-y-2"
    >
      {/* Product Image */}
      <div className="h-[55%] w-full bg-gray-50 overflow-hidden flex items-center justify-center rounded-t-2xl">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          />
        ) : (
          <span className="text-gray-400 text-sm">No Image Available</span>
        )}
      </div>

      {/* Product Info */}
      <div className="p-5 flex flex-col justify-between h-[45%]">
        <div>
          {/* Name */}
          <h2 className="text-xl font-semibold text-gray-900 line-clamp-1">
            {product.name}
          </h2>

          {/* Description */}
          <p className="text-sm text-gray-500 line-clamp-2 mt-2 leading-relaxed">
            {product.description}
          </p>

          {/* Price + Availability */}
          <div className="mt-4 flex items-center justify-between">
            {/* Prices */}
            <div>
              <p className="text-sm line-through text-gray-400">
                Rs. {product.labelledPrice}
              </p>
              <p className="text-2xl font-bold text-accent">
                Rs. {product.price}
              </p>
            </div>

            {/* Availability */}
            <span
              className={`text-xs px-3 py-1 rounded-full font-medium ${
                product.isAvailable
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {product.isAvailable ? "In Stock" : "Unavailable"}
            </span>
          </div>
        </div>

        {/* Buy Now Button */}
        <button
          disabled={!product.isAvailable}
          className={`mt-4 w-full py-2.5 rounded-xl text-white font-semibold 
                     tracking-wide text-sm transition-all duration-300 ${
                       product.isAvailable
                         ? "bg-accent hover:bg-secondary/90 active:scale-95 shadow-md"
                         : "bg-gray-400 cursor-not-allowed"
                     }`}
        >
          Buy Now
        </button>
      </div>
    </Link>
  );
}
