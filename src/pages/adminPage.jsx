import { Link, Route, Routes, useLocation } from "react-router-dom";

import AddProductPage from "./admin/addProductPage";
import AdminProductsPage from "./admin/productsPage";
import EditProductPage from "./admin/editProductPage";
import AdminOrdersPage from "./admin/adminOrdersPage";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../components/loading";
import UsersPage from "./admin/usersPage";
import AddUserPage from "./admin/addUserPage";
import EditUserPage from "./admin/editUserPage";

export default function AdminPage() {
  const location = useLocation();
  const path = location.pathname;
  const [status, setStatus] = useState("loading");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      setStatus("unauthenticated");
      window.location.href = "/login";
    } else {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/users/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          if (res.data.role === "admin") {
            setStatus("authenticated");
          } else {
            toast.error("You are not authorized to access this page");
            setStatus("unauthenticated");
            window.location.href = "/login";
          }
        })
        .catch((err) => {
          toast.error("Error fetching user details");
          console.log(err);
          setStatus("unauthenticated");
          window.location.href = "/login";
        });
    }
  }, [status]);

  function getClass(name) {
    const isActive = path.includes(name);
    return `
      flex items-center rounded-md px-4 py-3 font-semibold transition
      ${isActive ? "bg-accent text-white" : "text-accent hover:bg-accent/10"}
    `;
  }

  function handleLogout() {
    toast.success("Logout successful");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  }

  return (
    <div className="w-full h-screen flex bg-gray-50">
      {status == "loading" || status == "unauthenticated" ? (
        <Loading />
      ) : (
        <>
          {/* Sidebar */}
          <aside className="h-full w-[260px] bg-white shadow-md py-8 flex flex-col gap-4">
            <h1 className="text-2xl font-bold text-accent px-4 mb-6">
              Admin Panel
            </h1>

            <Link className={getClass("products")} to="/admin/products">
              Products
            </Link>

            <Link className={getClass("users")} to="/admin/users">
              Users
            </Link>

            <Link className={getClass("orders")} to="/admin/orders">
              Orders
            </Link>

            <Link className={getClass("add-product")} to="/admin/add-product">
              Add Product
            </Link>
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="
    mt-auto mx-4 
    flex items-center justify-center
    rounded-md px-4 py-3
    font-semibold text-red-600
    border border-red-200
    hover:bg-red-50 hover:border-red-300
    transition
  "
            >
              Logout
            </button>
          </aside>
          {showLogoutConfirm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <div className="bg-white rounded-lg shadow-lg w-[320px] p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Confirm Logout
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                  Are you sure you want to log out?
                </p>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowLogoutConfirm(false)}
                    className="px-4 py-2 rounded-md border text-gray-600 hover:bg-gray-100 transition"
                  >
                    No
                  </button>

                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
                  >
                    Yes, Logout
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Content Area */}
          <main className="flex-1 p-8 overflow-y-auto">
            <Routes>
              <Route path="/products" element={<AdminProductsPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/orders" element={<AdminOrdersPage />} />
              <Route path="/add-product" element={<AddProductPage />} />
              <Route path="/edit-product" element={<EditProductPage />} />
              <Route path="/edit-user" element={<EditUserPage />} />
              <Route path="/add-user" element={<AddUserPage />} />
            </Routes>
          </main>
        </>
      )}
    </div>
  );
}
