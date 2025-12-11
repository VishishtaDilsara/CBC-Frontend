import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function ProductCarousel({ products }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const total = products.length;

  if (!products || products.length === 0) return null;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - itemsPerPage + total) % total);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + itemsPerPage) % total);
  };

  const visibleProducts = [];
  for (let i = 0; i < Math.min(itemsPerPage, total); i++) {
    const idx = (currentIndex + i) % total;
    visibleProducts.push(products[idx]);
  }

  return (
    <div className="relative">
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleProducts.map((product, index) => (
          <div
            key={product.id || index}
            className="bg-primary rounded-xl shadow p-5 hover:-translate-y-1 transition cursor-pointer"
          >
            <div className="w-full h-48 rounded-lg overflow-hidden bg-gray-200">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="mt-4 text-lg font-semibold text-secondary">
              {product.name}
            </h3>

            {product.altNames.map((altName, index) => {
              return (
                <span key={index} className="text-gray-600 text-sm mt-1">
                  {" | " + altName}
                </span>
              );
            })}

            <p className="mt-3 font-semibold text-accent">
              Rs. {product.price}
            </p>
          </div>
        ))}
      </div>

      {/* Arrows */}
      {total > itemsPerPage && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-md items-center justify-center hover:bg-gray-100 transition"
          >
            <FaChevronLeft className="text-secondary text-sm" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-md items-center justify-center hover:bg-gray-100 transition"
          >
            <FaChevronRight className="text-secondary text-sm" />
          </button>
        </>
      )}
    </div>
  );
}
