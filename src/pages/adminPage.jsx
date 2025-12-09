import { Link, Route, Routes, useLocation } from "react-router-dom";

import AddProductPage from "./admin/addProductPage";
import AdminProductsPage from "./admin/productsPage";
import EditProductPage from "./admin/editProductPage";

export default function AdminPage() {
  const location = useLocation();
  const path = location.pathname;
  function getClass(name) {
    if (path.includes(name)) {
      return "bg-accent text-white";
    } else {
      return "text-accent";
    }
  }
  return (
    <div className="w-full h-screen flex">
      <div className="h-full w-[300px] text-accent font-bold px-4 text-xl gap-5 flex flex-col">
        <Link className={getClass("products")} to="/admin/products">
          Products
        </Link>
        <Link className={getClass("users")} to="/admin/users">
          Users
        </Link>
        <Link className={getClass("orders")} to="/admin/orders">
          Orders
        </Link>
      </div>
      <div className="h-full w-[calc(100%-300px)] ">
        <Routes path="/*">
          <Route path="/products" element={<AdminProductsPage />} />
          <Route path="/users" element={<h1>Admin Users Page</h1>} />
          <Route path="/orders" element={<h1>Admin Orders Page</h1>} />
          <Route path="/add-product" element={<AddProductPage />} />
          <Route path="/edit-product" element={<EditProductPage />} />
        </Routes>
      </div>
    </div>
  );
}
