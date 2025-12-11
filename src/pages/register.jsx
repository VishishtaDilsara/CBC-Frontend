import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleRegister() {
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/users",
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        }
      );

      toast.success(response.data.message || "Registration successful");
      navigate("/login");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Registration failed. Please try again."
      );
    }
  }

  return (
    <div className="w-full h-screen bg-[url('/login.jpg')] bg-center bg-cover flex items-center justify-center">
      {/* dark overlay */}
      <div className="w-full h-full bg-black/40 absolute inset-0" />

      <div className="relative z-10 w-full max-w-5xl flex flex-col md:flex-row items-center justify-between px-6">
        {/* Left branding */}
        <div className="hidden md:flex flex-col text-white max-w-md">
          <h1 className="text-4xl font-bold tracking-tight">
            Join <span className="text-accent">BeautyGlow</span>
          </h1>
          <p className="mt-4 text-sm text-gray-200 leading-relaxed">
            Create your account to enjoy a personalized experience, exclusive
            offers, and handpicked cosmetic products tailored just for you.
          </p>
        </div>

        {/* Right register card */}
        <div className="w-full md:w-[420px] bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl px-8 py-10 flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-secondary mb-2">
            Create an account
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Fill in your details to get started.
          </p>

          {/* First Name */}
          <div className="w-full mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full h-11 px-3 rounded-xl border border-gray-300 text-sm 
              bg-white/80 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Last Name */}
          <div className="w-full mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full h-11 px-3 rounded-xl border border-gray-300 text-sm 
              bg-white/80 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Email */}
          <div className="w-full mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 px-3 rounded-xl border border-gray-300 text-sm 
              bg-white/80 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Password */}
          <div className="w-full mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-11 px-3 rounded-xl border border-gray-300 text-sm 
              bg-white/80 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Register Button */}
          <button
            onClick={handleRegister}
            className="w-full h-11 rounded-full bg-accent text-white text-sm font-semibold 
                       shadow-md hover:bg-accent/90 active:scale-95 transition-all duration-200"
          >
            Register
          </button>

          {/* Already have an account?  */}
          <div className="mt-5 text-sm text-gray-600">
            Already have an account?{" "}
            <span
              className="text-accent font-semibold cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Sign in
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
