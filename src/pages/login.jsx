import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { GrGoogle } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    onSuccess: (response) => {
      const accessToken = response.access_token;
      axios
        .post(import.meta.env.VITE_BACKEND_URL + "/api/users/login/google", {
          accessToken: accessToken,
        })
        .then((res) => {
          toast.success("login Successfull");
          const token = res.data.token;
          localStorage.setItem("token", token);
          if (res.data.role === "admin") {
            navigate("/admin/products");
          } else {
            navigate("/");
          }
        });
    },
  });

  async function handleLogin() {
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/users/login",
        {
          email: email,
          password: password,
        }
      );
      toast.success(response.data.message);
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      if (response.data.role === "admin") {
        navigate("/admin/products");
      } else {
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="w-full h-screen bg-[url('/login.jpg')] bg-cover bg-center flex items-center justify-center">
      {/* overlay */}
      <div className="w-full h-full bg-black/40 absolute inset-0" />

      {/* content */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col md:flex-row items-center justify-between px-6">
        {/* Left text / branding (optional) */}
        <div className="hidden md:flex flex-col text-white max-w-md">
          <h1 className="text-4xl font-bold tracking-tight">
            Welcome back to <span className="text-accent">BeautyGlow</span>
          </h1>
          <p className="mt-4 text-sm text-gray-200 leading-relaxed">
            Sign in to continue your journey with premium skincare and cosmetics
            crafted to make you feel confident, radiant, and effortlessly
            beautiful.
          </p>
        </div>

        {/* Right: Login card */}
        <div className="w-full md:w-[420px] bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl px-8 py-10 flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-secondary mb-2">
            Sign in
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Enter your details to access your account.
          </p>

          {/* Email */}
          <div className="w-full mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              placeholder="you@example.com"
              className="w-full h-11 px-3 rounded-xl border border-gray-300 text-sm
                         bg-white/80 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
            />
          </div>

          {/* Password */}
          <div className="w-full mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              placeholder="••••••••"
              className="w-full h-11 px-3 rounded-xl border border-gray-300 text-sm
                         bg-white/80 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
            />
          </div>
          <div className="w-full flex justify-end mb-6">
            <span
              className="text-xs text-accent font-semibold cursor-pointer hover:underline"
              onClick={() => navigate("/forget")}
            >
              Forgot Password?
            </span>
          </div>

          {/* Login button */}
          <button
            onClick={handleLogin}
            className="w-full h-11 rounded-full bg-accent text-white text-sm font-semibold 
                       cursor-pointer mb-4 shadow-md hover:bg-accent/90 active:scale-95 
                       transition-all duration-200"
          >
            Login
          </button>

          {/* Divider */}
          <div className="w-full flex items-center my-3">
            <div className="flex-1 h-[1px] bg-gray-200" />
            <span className="px-3 text-xs text-gray-400">or continue with</span>
            <div className="flex-1 h-[1px] bg-gray-200" />
          </div>

          {/* Google login */}
          <button
            onClick={googleLogin}
            className="w-full h-11 rounded-full border border-gray-300 bg-white/90 
                       text-sm font-semibold text-gray-700 flex items-center justify-center gap-2 
                       cursor-pointer hover:bg-gray-50 active:scale-95 transition-all duration-200"
          >
            <GrGoogle className="text-red-500" />
            Login with Google
          </button>
          {/* New Here? Create Account */}
          <div className="mt-6 text-sm text-gray-600">
            New here?{" "}
            <span
              className="text-accent font-semibold cursor-pointer hover:underline"
              onClick={() => navigate("/signup")}
            >
              Create an account
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
