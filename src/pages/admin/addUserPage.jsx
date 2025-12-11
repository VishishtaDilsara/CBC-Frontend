import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";
import axios from "axios";

export default function AddUserPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("customer");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const navigate = useNavigate();

  async function addUser() {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      return;
    }

    if (!firstName || !lastName || !email || !password) {
      toast.error("Please fill all required fields");
      return;
    }

    let imageUrl;
    try {
      if (profileImage) {
        imageUrl = await mediaUpload(profileImage);
        console.log(imageUrl);
      }

      const userPayload = {
        firstName,
        lastName,
        email,
        password,
        role,
      };

      if (imageUrl) {
        userPayload.img = imageUrl;
      }

      await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/users",
        userPayload,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      toast.success("User added successfully");
      navigate("/admin/users");
    } catch (e) {
      console.error(e);
      toast.error(
        e?.response?.data?.message || "Failed to add user, please try again"
      );
    }
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-primary">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 md:p-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-secondary">Add New User</h1>
          <p className="text-sm text-gray-500 mt-1">
            Fill in the details below to create a new user.
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

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-secondary">
              Password
            </label>
            <input
              type="password"
              placeholder="Initial Password"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="text-xs text-gray-400">
              Share this password with the user so they can log in.
            </span>
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
            <input
              type="file"
              className="w-full rounded-lg border border-dashed border-gray-300 px-3 py-2 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent bg-primary/60"
              onChange={(e) => setProfileImage(e.target.files[0])}
            />
            <span className="text-xs text-gray-400">
              Optional. If not provided, default avatar will be used.
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
            onClick={addUser}
          >
            Add User
          </button>
        </div>
      </div>
    </div>
  );
}
