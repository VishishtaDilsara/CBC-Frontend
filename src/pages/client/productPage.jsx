import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../../components/productCard";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
        .then((res) => {
          setProducts(res.data);
          setIsLoading(false);
        });
    }
  }, [isLoading]);

  return (
    <div className="w-full h-full bg-primary py-10 flex flex-wrap justify-center gap-6 px-4">
      {products.map((product) => {
        return <ProductCard key={product.productId} product={product} />;
      })}
      {/* Footer */}
      <footer className="w-full py-6 text-center text-gray-500 text-sm border-t border-gray-300 bg-white">
        © {new Date().getFullYear()} BeautyGlow — All Rights Reserved.
      </footer>
    </div>
  );
}
