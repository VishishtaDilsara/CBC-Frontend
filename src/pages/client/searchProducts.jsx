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
    <div className="w-full h-full flex flex-col items-center p-4">
      <div className="w-full mb-8 flex justify-center">
        <div className="relative w-[300px] max-w-xl">
          <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
            <BsSearch />
          </span>
          <input
            type="text"
            placeholder="Search by product name..."
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 bg-white shadow-sm 
                         focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-sm"
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
      <div className="w-full h-full  flex flex-row flex-wrap justify-center items-center">
        {query.length == 0 ? (
          <h1 className="text-2xl text-secondary font-semibold">
            Please enter a search query
          </h1>
        ) : (
          <>
            {isLoading ? (
              <Loading />
            ) : (
              <>
                {products.map((product) => {
                  return (
                    <ProductCard key={product.productId} product={product} />
                  );
                })}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
