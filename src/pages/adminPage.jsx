import { Link, Route, Routes } from "react-router-dom";
import AdminProductsPage from "./admin/adminProductsPage";

export default function AdminPage() {
  return (
    <div className="w-full h-screen flex">
      <div className="h-full w-[300px] flex flex-col">
        <Link to="/admin/products">Products</Link>
        <Link to="/admin/users">Users</Link>
        <Link to="/admin/orders">Orders</Link>
      </div>
      <div className="h-full w-[calc(100%-300px)] ">
        <Routes path="/*">
          <Route path="/products" element={<AdminProductsPage />} />
          <Route path="/users" element={<h1>Admin Users Page</h1>} />
          <Route path="/orders" element={<h1>Admin Orders Page</h1>} />
          <Route path="/*" element={<h1>Admin 404: Page Not Found</h1>} />
        </Routes>
      </div>
    </div>
  );
}
