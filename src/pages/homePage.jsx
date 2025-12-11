import axios from "axios";
import { Link } from "react-router-dom";
import ProductCarousel from "../components/productCarousel";
import { useEffect, useState } from "react";

export default function HomePageDefault() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
        .then((res) => {
          setProducts(res.data || []);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(false);
        });
    }
  }, [isLoading]);

  return (
    <div className="w-full min-h-screen bg-primary flex flex-col text-secondary">
      {/* Hero Section */}
      <section className="flex-1 w-full px-6 md:px-12 py-10 md:py-20 flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto">
        {/* Left Content */}
        <div className="flex-1">
          <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-4">
            Premium Cosmetics
          </p>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-secondary">
            Redefine Your
            <span className="text-accent"> Natural Beauty</span>
          </h1>

          <p className="mt-4 text-gray-600 text-base md:text-lg max-w-lg">
            Explore our luxurious skincare and cosmetic collection crafted to
            make you feel confident, radiant, and effortlessly beautiful.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              to="/products"
              className="px-6 py-3 rounded-full bg-accent text-white font-semibold shadow-md hover:bg-accent/90 transition"
            >
              Shop Now
            </Link>

            <Link
              to="/about"
              className="px-6 py-3 rounded-full bg-white border border-gray-300 text-secondary font-semibold hover:bg-gray-100 transition"
            >
              About Us
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 w-full">
          <div className="w-full h-[350px] md:h-[450px] bg-white rounded-3xl shadow-lg overflow-hidden">
            <img
              src="/cosmetic1.jpg"
              alt="Cosmetic Model"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="w-full bg-white py-14">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-bold text-center text-secondary">
            Best Sellers
          </h2>
          <p className="text-center text-gray-600 mt-2">
            Shop our most loved beauty essentials
          </p>

          <div className="mt-10">
            {isLoading ? (
              <p className="text-center text-gray-500">Loading products...</p>
            ) : products.length === 0 ? (
              <p className="text-center text-gray-500">No products found.</p>
            ) : (
              <ProductCarousel products={products} />
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="w-full px-6 md:px-12 py-16 bg-primary">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1">
            <img
              src="/philosophy.png"
              alt="Philosophy"
              className="rounded-2xl shadow-lg w-full h-[350px] object-cover"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-3xl font-bold text-secondary">
              Our Philosophy
            </h2>
            <p className="mt-4 text-gray-600">
              At BeautyGlow, we believe that beauty begins with self-love. Our
              products are crafted with gentle, clean ingredients designed to
              enhance your natural radiance without compromise.
            </p>

            <div className="mt-6 space-y-3 text-gray-700">
              <p>✨ Dermatologist Approved</p>
              <p>🌿 Natural & Cruelty-Free</p>
              <p>💧 Safe for All Skin Types</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="w-full bg-white py-14">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-bold text-center text-secondary">
            Why Choose BeautyGlow?
          </h2>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-primary shadow rounded-xl p-6 text-center">
              <h3 className="font-bold text-lg text-secondary">
                Pure Ingredients
              </h3>
              <p className="text-gray-600 mt-2 text-sm">
                We use clean, natural, and cruelty-free ingredients in every
                product.
              </p>
            </div>

            <div className="bg-primary shadow rounded-xl p-6 text-center">
              <h3 className="font-bold text-lg text-secondary">
                Premium Quality
              </h3>
              <p className="text-gray-600 mt-2 text-sm">
                Formulated to deliver visible results without harsh chemicals.
              </p>
            </div>

            <div className="bg-primary shadow rounded-xl p-6 text-center">
              <h3 className="font-bold text-lg text-secondary">
                Loved by Customers
              </h3>
              <p className="text-gray-600 mt-2 text-sm">
                Thousands trust our brand to elevate their daily beauty routine.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 text-center text-gray-500 text-sm border-t border-gray-300 bg-white">
        © {new Date().getFullYear()} BeautyGlow — All Rights Reserved.
      </footer>
    </div>
  );
}
