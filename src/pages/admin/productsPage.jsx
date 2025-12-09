import { useEffect, useState } from "react";
import { sampleProducts } from "../../assets/sampleData";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

export default function AdminProductsPage() {
  const [products, setProducts] = useState(sampleProducts);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading === true) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
        .then((res) => {
          console.log(res.data);
          setProducts(res.data);
          setIsLoading(false);
        });
    }
  }, [isLoading]);

  function deleteProduct(productId) {
    const token = localStorage.getItem("token");
    if (token == null) {
      toast.error("Please login first");
      return;
    }
    axios
      .delete(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(() => {
        toast.success("Product Deleted successfully");
        setIsLoading(true);
      })
      .catch((e) => {
        toast.error(e?.response?.data?.message || "Something went wrong");
      });
  }

  return (
    <div className="w-full h-full max-h-full flex flex-col bg-primary">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-secondary">
            Products Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            View, edit, and manage all products in your store.
          </p>
        </div>

        <Link
          to="/admin/add-product"
          className="inline-flex items-center gap-2 bg-accent text-white font-semibold py-2.5 px-5 rounded-full shadow-md hover:shadow-lg hover:bg-accent/90 transition"
        >
          <span className="text-lg leading-none">+</span>
          <span>Add Product</span>
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {isLoading ? (
          <div className="w-full h-full flex justify-center items-center">
            <div className="w-[70px] h-[70px] border-[5px] border-gray-300 border-t-accent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm md:text-base">
                <thead>
                  <tr className="bg-secondary text-white">
                    <th className="py-3 px-4 text-left font-semibold">
                      Product ID
                    </th>
                    <th className="py-3 px-4 text-left font-semibold">Name</th>
                    <th className="py-3 px-4 text-left font-semibold">Image</th>
                    <th className="py-3 px-4 text-left font-semibold">
                      Labelled Price
                    </th>
                    <th className="py-3 px-4 text-left font-semibold">Price</th>
                    <th className="py-3 px-4 text-left font-semibold">Stock</th>
                    <th className="py-3 px-4 text-center font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 hover:bg-primary/60 transition"
                    >
                      <td className="py-3 px-4 text-gray-700">
                        {item.productId}
                      </td>
                      <td className="py-3 px-4 text-secondary font-medium">
                        {item.name}
                      </td>
                      <td className="py-3 px-4">
                        <div className="w-[50px] h-[50px] rounded-md overflow-hidden border border-gray-200">
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        Rs. {item.labelledPrice}
                      </td>
                      <td className="py-3 px-4 text-gray-900 font-semibold">
                        Rs. {item.price}
                      </td>
                      <td className="py-3 px-4 text-gray-700">{item.stock}</td>
                      <td className="py-3 px-4">
                        <div className="flex justify-center items-center gap-3">
                          <button
                            type="button"
                            onClick={() => deleteProduct(item.productId)}
                            className="p-2 rounded-full bg-red-50 hover:bg-red-100 transition"
                          >
                            <FaTrash className="text-red-500 text-[18px]" />
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              navigate("/admin/edit-product", { state: item })
                            }
                            className="p-2 rounded-full bg-accent/10 hover:bg-accent/20 transition"
                          >
                            <FaEdit className="text-accent text-[18px]" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {products.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        className="py-6 text-center text-gray-500"
                      >
                        No products found. Click{" "}
                        <span className="font-semibold text-accent">
                          &quot;Add Product&quot;
                        </span>{" "}
                        to create one.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
