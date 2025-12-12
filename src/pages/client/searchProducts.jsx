import axios from "axios";
import { useState } from "react";
import ProductCard from "../../components/productCard";
import { BsSearch } from "react-icons/bs";
import Loading from "../../components/loading";
import toast from "react-hot-toast";

export default function SearchProductPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");

  return (
    <div className="w-full min-h-screen bg-primary px-4 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-secondary">
            Search Products
          </h1>
          <p className="text-gray-600 mt-2">
            Find your perfect beauty essential in seconds.
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full flex justify-center mb-10">
          <div className="relative w-full max-w-2xl">
            <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 text-lg">
              <BsSearch />
            </span>

            <input
              type="text"
              placeholder="Search by product name..."
              className="w-full h-12 pl-12 pr-4 rounded-2xl border border-gray-200 bg-white shadow-md 
                         focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-sm md:text-base
                         placeholder:text-gray-400"
              value={query}
              onChange={async (e) => {
                setQuery(e.target.value);
                setIsLoading(true);
                if (e.target.value.length == 0) {
                  setProducts([]);
                  setIsLoading(false);
                  return;
                }
                try {
                  const response = await axios.get(
                    import.meta.env.VITE_BACKEND_URL +
                      "/api/products/search/" +
                      e.target.value
                  );
                  setProducts(response.data);
                } catch (e) {
                  toast.error("Error fetching products");
                  console.log(e);
                } finally {
                  setIsLoading(false);
                }
              }}
            />
          </div>
        </div>

        {/* Results Area */}
        <div className="w-full">
          {query.length == 0 ? (
            <div className="w-full bg-white rounded-3xl shadow-lg border border-gray-100 p-10 text-center">
              <h2 className="text-xl md:text-2xl font-semibold text-secondary">
                Start typing to search
              </h2>
              <p className="text-gray-600 mt-2">
                Search by product name to see matching items here.
              </p>
            </div>
          ) : (
            <>
              {isLoading ? (
                <div className="w-full flex justify-center py-10">
                  <Loading />
                </div>
              ) : (
                <>
                  {products.length === 0 ? (
                    <div className="w-full bg-white rounded-3xl shadow-lg border border-gray-100 p-10 text-center">
                      <h2 className="text-xl md:text-2xl font-semibold text-secondary">
                        No products found
                      </h2>
                      <p className="text-gray-600 mt-2">
                        Try a different keyword or check spelling.
                      </p>
                    </div>
                  ) : (
                    <div className="grid gap-6 p-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                      {products.map((product) => (
                        <ProductCard
                          key={product.productId}
                          product={product}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
