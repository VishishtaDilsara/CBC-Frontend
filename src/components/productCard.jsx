export default function ProductCard({ product }) {
  return (
    <div className="w-[300px] h-[400px] bg-white shadow-lg rounded-xl m-2 flex flex-col overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      {/* Product Image */}
      <div className="h-[50%] w-full overflow-hidden bg-gray-100 flex items-center justify-center">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-400 text-sm">No Image Available</span>
        )}
      </div>

      {/* Product Info */}
      <div className="p-3 flex flex-col justify-between h-[50%]">
        <div>
          {/* Name */}
          <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
            {product.name}
          </h2>

          {/* Description */}
          <p className="text-sm text-gray-500 line-clamp-2 mt-1">
            {product.description}
          </p>

          <div className="mt-2 flex items-center justify-between">
            {/* Prices */}
            <div>
              <p className="text-sm line-through text-gray-400">
                Rs. {product.labelledPrice}
              </p>
              <p className="text-xl font-bold text-orange-600">
                Rs. {product.price}
              </p>
            </div>

            {/* Availability */}
            <span
              className={`text-xs px-2 py-1 rounded-full ${
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
          className={`mt-3 w-full py-2 rounded-lg text-white font-semibold transition-all duration-300 ${
            product.isAvailable
              ? "bg-blue-600 hover:bg-blue-700 active:scale-95"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
