import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";
import axios from "axios";

export default function EditUserPage() {
  const location = useLocation();
  const user = location.state;

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [profileImage, setProfileImage] = useState(null);

  const navigate = useNavigate();

  async function updateUser() {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      return;
    }

    if (!firstName || !lastName || !email) {
      toast.error("Please fill all required fields");
      return;
    }

    let imageUrl = user.img;

    try {
      if (profileImage) {
        imageUrl = await mediaUpload(profileImage);
      }

      const userPayload = {
        firstName,
        lastName,
        email,
        role,
      };

      if (imageUrl) {
        userPayload.img = imageUrl;
      }

      await axios.put(
        import.meta.env.VITE_BACKEND_URL + "/api/users/" + user._id,
        userPayload,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      toast.success("User updated successfully");
      navigate("/admin/users");
    } catch (e) {
      console.error(e);
      toast.error(
        e?.response?.data?.message || "Failed to update user, please try again"
      );
    }
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-primary">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 md:p-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-secondary">Edit User</h1>
          <p className="text-sm text-gray-500 mt-1">
            Update the details below and save changes.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* First Name */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-secondary">
              First Name
            </label>
            <input
              type="text"
              placeholder="First Name"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-secondary">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Last Name"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-secondary">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Role */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-secondary">Role</label>
            <select
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Profile Picture */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-secondary">
              Profile Picture
            </label>

            {/* Preview current image */}
            {user.img && (
              <div className="mb-2 w-[60px] h-[60px] rounded-md overflow-hidden border border-gray-200">
                <img
                  src={user.img}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <input
              type="file"
              className="w-full rounded-lg border border-dashed border-gray-300 px-3 py-2 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent bg-primary/60"
              onChange={(e) => setProfileImage(e.target.files[0])}
            />
            <span className="text-xs text-gray-400">
              If you don&apos;t upload a new image, the current one will be
              kept.
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="w-full flex justify-end items-center mt-6 gap-3">
          <Link
            to="/admin/users"
            className="px-4 py-2 rounded-full border border-gray-300 text-sm font-semibold text-secondary hover:bg-gray-100 transition"
          >
            Cancel
          </Link>
          <button
            className="px-5 py-2 rounded-full bg-accent text-white text-sm font-semibold hover:bg-accent/90 shadow-md hover:shadow-lg transition cursor-pointer"
            onClick={updateUser}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
