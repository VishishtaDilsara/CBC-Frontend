import { FaCheck, FaCheckCircle, FaLeaf, FaUserCheck } from "react-icons/fa";
import { GiStarsStack } from "react-icons/gi";
import { RiStarSFill } from "react-icons/ri";

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen bg-primary text-secondary">
      {/* Hero Section */}
      <section
        className="w-full py-24 px-6 bg-center bg-cover relative"
        style={{ backgroundImage: "url('/about2.jpg')" }}
      >
        {/* overlay for readability */}
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow">
            About <span className="text-accent">BeautyGlow</span>
          </h1>

          <p className="mt-6 text-white/90 text-lg max-w-3xl mx-auto leading-relaxed drop-shadow">
            BeautyGlow was created with one simple belief — true beauty begins
            with confidence, care, and self-love.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            BeautyGlow started as a passion project to redefine everyday beauty.
            We wanted to create products that feel luxurious, work effectively,
            and are gentle on your skin.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Every formula is thoughtfully crafted using carefully selected
            ingredients, combining science with nature to deliver visible,
            long-lasting results.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <span className="text-accent text-xl">
                <GiStarsStack />
              </span>
              <span className="font-medium">Premium quality formulations</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-accent text-xl">
                <FaLeaf />
              </span>
              <span className="font-medium">
                Clean, cruelty-free ingredients
              </span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-accent text-xl">
                <FaCheck />
              </span>
              <span className="font-medium">
                Dermatologically tested products
              </span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-accent text-xl">
                <FaUserCheck />
              </span>
              <span className="font-medium">Designed for all skin types</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <div className="p-8 bg-primary rounded-3xl shadow-lg hover:shadow-2xl transition">
            <h3 className="text-2xl font-bold mb-3">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              To empower individuals by creating skincare and cosmetic products
              that enhance natural beauty, boost confidence, and promote healthy
              self-care routines.
            </p>
          </div>

          <div className="p-8 bg-primary rounded-3xl shadow-lg hover:shadow-2xl transition">
            <h3 className="text-2xl font-bold mb-3">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              To become a trusted global beauty brand known for authenticity,
              innovation, and products that truly care for people and the
              planet.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Why Choose BeautyGlow?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
              <h4 className="font-bold text-lg mb-2">Safe & Effective</h4>
              <p className="text-gray-600 text-sm">
                Our products are designed to deliver results without harsh
                chemicals.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
              <h4 className="font-bold text-lg mb-2">Customer First</h4>
              <p className="text-gray-600 text-sm">
                We listen to our customers and evolve based on real needs.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
              <h4 className="font-bold text-lg mb-2">Sustainable Beauty</h4>
              <p className="text-gray-600 text-sm">
                Ethical sourcing and eco-conscious choices guide everything we
                do.
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
