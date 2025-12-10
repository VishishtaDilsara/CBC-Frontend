import { Link, Route, Routes, useLocation } from "react-router-dom";

import AddProductPage from "./admin/addProductPage";
import AdminProductsPage from "./admin/productsPage";
import EditProductPage from "./admin/editProductPage";
import AdminOrdersPage from "./admin/adminOrdersPage";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../components/loading";

export default function AdminPage() {
  const location = useLocation();
  const path = location.pathname;
  const [status, setStatus] = useState("loading");

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
          </aside>

          {/* Content Area */}
          <main className="flex-1 p-8 overflow-y-auto">
            <Routes>
              <Route path="/products" element={<AdminProductsPage />} />
              <Route
                path="/users"
                element={
                  <h1 className="text-3xl font-bold">Admin Users Page</h1>
                }
              />
              <Route path="/orders" element={<AdminOrdersPage />} />
              <Route path="/add-product" element={<AddProductPage />} />
              <Route path="/edit-product" element={<EditProductPage />} />
            </Routes>
          </main>
        </>
      )}
    </div>
  );
}
