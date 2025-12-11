import { useState } from "react";
import toast from "react-hot-toast";
import { BsCart3 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const [sideDrawerOpened, setSideDrawerOpened] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  function handleLogout() {
    toast.success("Logout successful");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  }

  return (
    <>
      {/* Top Header */}
      <header className="w-full h-20 sticky top-0 z-40 bg-white/80 backdrop-blur shadow-md flex items-center">
        <div className="w-full max-w-6xl mx-auto flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <GiHamburgerMenu
              className="text-2xl md:hidden cursor-pointer"
              onClick={() => setSideDrawerOpened(true)}
            />
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <img
                src="/logo.png"
                alt="logo"
                className="w-[52px] h-[52px] rounded-full object-cover"
              />
              <span className="hidden sm:inline text-xl font-semibold tracking-wide text-secondary">
                BeautyGlow
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-[16px] font-medium">
            {[
              { to: "/", label: "Home" },
              { to: "/products", label: "Products" },
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact" },
              { to: "/search", label: "Search" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="relative text-secondary hover:text-accent transition group"
              >
                {link.label}
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-accent rounded-full transition-all group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Right: Auth + Cart (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            {token == null ? (
              <Link
                to="/login"
                className="text-sm font-semibold px-4 py-2 rounded-full border border-accent text-accent hover:bg-accent hover:text-white transition"
              >
                Login
              </Link>
            ) : (
              <button
                className="text-sm font-semibold px-4 py-2 rounded-full border border-gray-300 text-secondary hover:bg-gray-100 transition"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}

            <Link
              to="/cart"
              className="relative flex items-center justify-center w-10 h-10 rounded-full bg-primary hover:bg-primary/70 transition text-secondary"
            >
              <BsCart3 className="text-xl" />
              {/* badge example if later you add cart count */}
              {/* <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] px-1.5 py-[1px] rounded-full">
                2
              </span> */}
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Side Drawer */}
      {sideDrawerOpened && (
        <div
          className="fixed inset-0 z-50 flex md:hidden bg-black/50"
          onClick={() => setSideDrawerOpened(false)}
        >
          <div
            className="w-72 max-w-[80%] bg-white h-full shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside drawer
          >
            {/* Drawer Header */}
            <div className="h-20 px-4 flex items-center gap-3 border-b border-gray-100">
              <GiHamburgerMenu
                className="text-2xl cursor-pointer"
                onClick={() => setSideDrawerOpened(false)}
              />
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => {
                  setSideDrawerOpened(false);
                  navigate("/");
                }}
              >
                <img
                  src="/logo.png"
                  alt="logo"
                  className="w-[48px] h-[48px] rounded-full object-cover"
                />
                <span className="text-lg font-semibold text-secondary">
                  BeautyGlow
                </span>
              </div>
            </div>

            {/* Drawer Links */}
            <div className="flex-1 flex flex-col items-start px-6 py-4 gap-4 text-[18px] font-medium">
              <Link
                to="/"
                className="py-1"
                onClick={() => setSideDrawerOpened(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="py-1"
                onClick={() => setSideDrawerOpened(false)}
              >
                Products
              </Link>
              <Link
                to="/about"
                className="py-1"
                onClick={() => setSideDrawerOpened(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="py-1"
                onClick={() => setSideDrawerOpened(false)}
              >
                Contact
              </Link>
              <Link
                to="/search"
                className="py-1"
                onClick={() => setSideDrawerOpened(false)}
              >
                Search
              </Link>

              <div className="h-[1px] w-full bg-gray-200 my-2" />

              {token == null ? (
                <Link
                  to="/login"
                  className="py-1 text-accent"
                  onClick={() => setSideDrawerOpened(false)}
                >
                  Login
                </Link>
              ) : (
                <button
                  className="py-1 text-secondary"
                  onClick={() => {
                    setSideDrawerOpened(false);
                    handleLogout();
                  }}
                >
                  Logout
                </button>
              )}

              <Link
                to="/cart"
                className="mt-3 flex items-center gap-2 py-1"
                onClick={() => setSideDrawerOpened(false)}
              >
                <BsCart3 className="text-xl" />
                <span>Cart</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
