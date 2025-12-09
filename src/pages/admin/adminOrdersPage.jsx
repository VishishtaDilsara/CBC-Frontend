import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loading from "../../components/loading";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first");
        return;
      }
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/orders", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          setOrders(res.data);
          console.log(res.data);
          setIsLoading(false);
        })
        .catch((e) => {
          toast.error(e?.response?.data?.message || "Something went wrong");
          setIsLoading(false);
        });
    }
  }, [isLoading]);

  return (
    <div className="w-full h-full flex flex-col bg-primary">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-secondary">Orders</h1>
          <p className="text-sm text-gray-500 mt-1">
            Review all customer orders and their current status.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {isLoading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Loading />
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm md:text-base">
                <thead>
                  <tr className="bg-secondary text-white">
                    <th className="py-3 px-4 text-left font-semibold">
                      Order ID
                    </th>
                    <th className="py-3 px-4 text-left font-semibold">Name</th>
                    <th className="py-3 px-4 text-left font-semibold">Email</th>
                    <th className="py-3 px-4 text-left font-semibold">
                      Address
                    </th>
                    <th className="py-3 px-4 text-left font-semibold">Phone</th>
                    <th className="py-3 px-4 text-left font-semibold">
                      Total (Rs.)
                    </th>
                    <th className="py-3 px-4 text-left font-semibold">Date</th>
                    <th className="py-3 px-4 text-center font-semibold">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 hover:bg-primary/60 transition"
                    >
                      <td className="py-3 px-4 text-gray-700">
                        {order.orderId}
                      </td>
                      <td className="py-3 px-4 text-secondary font-medium">
                        {order.name}
                      </td>
                      <td className="py-3 px-4 text-gray-700">{order.email}</td>
                      <td className="py-3 px-4 text-gray-700">
                        {order.address}
                      </td>
                      <td className="py-3 px-4 text-gray-700">{order.phone}</td>
                      <td className="py-3 px-4 text-gray-900 font-semibold">
                        {order.total}
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        {new Date(order.date).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex justify-center">
                          <span
                            className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold
                            bg-accent/10 text-accent"
                          >
                            {order.status}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {orders.length === 0 && (
                    <tr>
                      <td
                        colSpan={8}
                        className="py-6 text-center text-gray-500"
                      >
                        No orders found.
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
