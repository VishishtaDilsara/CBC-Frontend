import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loading from "../../components/loading";
import Modal from "react-modal";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState(0);

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

  const activeOrderData = orders[activeOrder];

  function getStatusBadgeClasses(status) {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      case "Pending":
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  }

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
              {/* Order Details Modal */}
              <Modal
                isOpen={isModalOpen}
                onRequestClose={() => {
                  setIsModalOpen(false);
                }}
                onAfterOpen={() => {}}
                contentLabel="Order Details"
                overlayClassName="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
                className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto outline-none"
              >
                {activeOrderData && (
                  <div className="p-6 space-y-6">
                    {/* Modal Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-xl md:text-2xl font-bold text-secondary">
                          Order #{activeOrderData.orderId}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                          Placed on{" "}
                          {new Date(activeOrderData.date).toLocaleString()}
                        </p>
                      </div>
                      <button
                        onClick={() => setIsModalOpen(false)}
                        className="text-gray-500 hover:text-gray-700 text-xl leading-none"
                      >
                        &times;
                      </button>
                    </div>

                    {/* Status + Totals */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                          Status
                        </span>
                        <span
                          className={`inline-flex items-center mt-2 rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadgeClasses(
                            activeOrderData.status
                          )}`}
                        >
                          {activeOrderData.status}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                          Labelled Total
                        </span>
                        <span className="mt-2 text-secondary font-semibold">
                          Rs. {activeOrderData.labelledTotal}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                          Final Total
                        </span>
                        <span className="mt-2 text-accent font-bold text-lg">
                          Rs. {activeOrderData.total}
                        </span>
                        {activeOrderData.labelledTotal >
                          activeOrderData.total && (
                          <span className="text-xs text-green-600 mt-1">
                            You gave a discount of Rs.{" "}
                            {(
                              activeOrderData.labelledTotal -
                              activeOrderData.total
                            ).toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Customer Info */}
                    <div className="mt-4 border-t border-gray-200 pt-4">
                      <h3 className="text-sm font-semibold text-secondary mb-3">
                        Customer Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="space-y-1">
                          <p className="text-gray-500 text-xs uppercase font-semibold">
                            Name
                          </p>
                          <p className="text-secondary">
                            {activeOrderData.name}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-gray-500 text-xs uppercase font-semibold">
                            Email
                          </p>
                          <p className="text-secondary">
                            {activeOrderData.email}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-gray-500 text-xs uppercase font-semibold">
                            Phone
                          </p>
                          <p className="text-secondary">
                            {activeOrderData.phone}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-gray-500 text-xs uppercase font-semibold">
                            Address
                          </p>
                          <p className="text-secondary">
                            {activeOrderData.address}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Products List */}
                    <div className="mt-4 border-t border-gray-200 pt-4">
                      <h3 className="text-sm font-semibold text-secondary mb-3">
                        Products
                      </h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full text-xs md:text-sm">
                          <thead>
                            <tr className="bg-primary">
                              <th className="py-2 px-3 text-left font-semibold text-gray-600">
                                Product
                              </th>
                              <th className="py-2 px-3 text-left font-semibold text-gray-600">
                                Qty
                              </th>
                              <th className="py-2 px-3 text-left font-semibold text-gray-600">
                                Price (Rs.)
                              </th>
                              <th className="py-2 px-3 text-left font-semibold text-gray-600">
                                Subtotal (Rs.)
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {activeOrderData.products?.map((item, idx) => {
                              const info = item.productInfo || {};
                              const lineTotal =
                                (info.price || 0) * item.quantity;
                              return (
                                <tr
                                  key={item._id || idx}
                                  className="border-b border-gray-100"
                                >
                                  <td className="py-2 px-3">
                                    <div className="flex items-center gap-3">
                                      {info.images && info.images[0] && (
                                        <div className="w-10 h-10 rounded-md overflow-hidden border border-gray-200 flex-shrink-0">
                                          <img
                                            src={info.images[0]}
                                            alt={info.name}
                                            className="w-full h-full object-cover"
                                          />
                                        </div>
                                      )}
                                      <div>
                                        <p className="font-semibold text-secondary">
                                          {info.name}
                                        </p>
                                        <p className="text-[11px] text-gray-500">
                                          ID: {info.productId}
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="py-2 px-3 text-gray-700">
                                    {item.quantity}
                                  </td>
                                  <td className="py-2 px-3 text-gray-700">
                                    {info.price}
                                  </td>
                                  <td className="py-2 px-3 text-gray-900 font-semibold">
                                    {lineTotal.toFixed(2)}
                                  </td>
                                </tr>
                              );
                            })}
                            {(!activeOrderData.products ||
                              activeOrderData.products.length === 0) && (
                              <tr>
                                <td
                                  colSpan={4}
                                  className="py-4 px-3 text-center text-gray-500 text-xs"
                                >
                                  No products found for this order.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Modal Footer */}
                    <div className="flex justify-end mt-4">
                      <button
                        onClick={() => setIsModalOpen(false)}
                        className="px-4 py-2 rounded-full border border-gray-300 text-sm font-semibold text-secondary hover:bg-gray-100 transition"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}

                {!activeOrderData && (
                  <div className="p-6">
                    <p className="text-center text-gray-500 text-sm">
                      Order data not available.
                    </p>
                  </div>
                )}
              </Modal>

              {/* Orders Table */}
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
                      onClick={() => {
                        setActiveOrder(index);
                        setIsModalOpen(true);
                      }}
                      className="border-b border-gray-100 hover:bg-primary/60 transition cursor-pointer"
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
                            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadgeClasses(
                              order.status
                            )}`}
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
