import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(true); // trigger reload
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
                            onClick={() => deleteUser(item._id)}
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
    </div>
  );
}
