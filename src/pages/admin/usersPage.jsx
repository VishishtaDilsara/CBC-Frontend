import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [deleteUserLabel, setDeleteUserLabel] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/users/all")
        .then((res) => {
          setUsers(res.data || []);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to load users");
          setIsLoading(false);
        });
    }
  }, [isLoading]);

  function openDeleteModal(user) {
    setDeleteUserId(user._id);
    setDeleteUserLabel(
      user.email || `${user.firstName || ""} ${user.lastName || ""}`.trim()
    );
    setShowDeleteConfirm(true);
  }

  function closeDeleteModal() {
    setShowDeleteConfirm(false);
    setDeleteUserId(null);
    setDeleteUserLabel("");
  }

  async function deleteUser(userId) {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      return;
    }

    try {
      await axios.delete(
        import.meta.env.VITE_BACKEND_URL + "/api/users/" + userId,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      toast.success("User deleted successfully");
      closeDeleteModal();
      setIsLoading(true);
    } catch (e) {
      console.error(e);
      toast.error(e?.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <div className="w-full h-full max-h-full flex flex-col bg-primary">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-secondary">
            Users Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            View, edit, and manage all users.
          </p>
        </div>

        <Link
          to="/admin/add-user"
          className="inline-flex items-center gap-2 bg-accent text-white font-semibold py-2.5 px-5 rounded-full shadow-md hover:shadow-lg hover:bg-accent/90 transition"
        >
          <span className="text-lg leading-none">+</span>
          <span>Add User</span>
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
                    <th className="py-3 px-4 text-left font-semibold">Email</th>
                    <th className="py-3 px-4 text-left font-semibold">
                      First Name
                    </th>
                    <th className="py-3 px-4 text-left font-semibold">
                      Last Name
                    </th>
                    <th className="py-3 px-4 text-left font-semibold">Image</th>
                    <th className="py-3 px-4 text-left font-semibold">Role</th>
                    <th className="py-3 px-4 text-center font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((item) => (
                    <tr
                      key={item._id}
                      className="border-b border-gray-100 hover:bg-primary/60 transition"
                    >
                      <td className="py-3 px-4 text-gray-700">{item.email}</td>

                      <td className="py-3 px-4 text-secondary font-medium">
                        {item.firstName}
                      </td>

                      <td className="py-3 px-4 text-secondary font-medium">
                        {item.lastName}
                      </td>

                      <td className="py-3 px-4">
                        <div className="w-[50px] h-[50px] rounded-md overflow-hidden border border-gray-200">
                          <img
                            src={item.img}
                            alt={`${item.firstName} ${item.lastName}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </td>

                      <td className="py-3 px-4 text-secondary font-medium">
                        {item.role}
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex justify-center items-center gap-3">
                          <button
                            type="button"
                            onClick={() => openDeleteModal(item)}
                            className="p-2 rounded-full bg-red-50 hover:bg-red-100 transition"
                          >
                            <FaTrash className="text-red-500 text-[18px]" />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              navigate("/admin/edit-user", { state: item })
                            }
                            className="p-2 rounded-full bg-accent/10 hover:bg-accent/20 transition"
                          >
                            <FaEdit className="text-accent text-[18px]" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {users.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="py-6 text-center text-gray-500"
                      >
                        No users found. Click{" "}
                        <span className="font-semibold text-accent">
                          &quot;Add User&quot;
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

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={closeDeleteModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg w-[340px] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Confirm Delete
            </h2>

            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-800">
                {deleteUserLabel || "this user"}
              </span>
              ?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 rounded-md border text-gray-600 hover:bg-gray-100 transition"
              >
                No
              </button>

              <button
                onClick={() => deleteUser(deleteUserId)}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
