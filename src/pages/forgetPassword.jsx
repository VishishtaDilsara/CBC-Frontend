import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ForgetPasswordPage() {
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  function sendOtp() {
    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/users/send-otp", {
        email: email,
      })
      .then((res) => {
        setOtpSent(true);
        toast.success("OTP sent successfully. Please check your email.");
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error sending OTP. Please try again.");
      });
  }

  function verifyOtp() {
    if (!otp) {
      toast.error("Please enter the OTP.");
      return;
    }
    const otpInNumberFormat = parseInt(otp, 10);
    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in both password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/users/reset-password", {
        email: email,
        otp: otpInNumberFormat,
        newPassword: newPassword,
      })
      .then((res) => {
        toast.success("Password reset successfully. Please login.");
        console.log(res.data);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error resetting password. Please try again.");
      });
  }

  return (
    <div className="w-full h-screen bg-[url('/login.jpg')] bg-center bg-cover flex items-center justify-center">
      {/* dark overlay */}
      <div className="w-full h-full bg-black/40 absolute inset-0" />

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl px-8 py-10 flex flex-col items-center border border-gray-100">
          {!otpSent ? (
            <>
              <h1 className="text-2xl font-semibold text-secondary mb-1">
                Forgot Password
              </h1>
              <p className="text-sm text-gray-500 mb-6 text-center">
                Enter your email address and we&apos;ll send you a one-time code
                to reset your password.
              </p>

              <div className="w-full mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border-2 border-gray-200 text-sm 
                             bg-white/80 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300"
                />
              </div>

              <button
                className="w-full h-11 bg-accent text-white rounded-full mt-2 text-sm font-semibold 
                           hover:bg-accent/90 shadow-md active:scale-95 transition-all duration-200"
                onClick={sendOtp}
              >
                Send OTP
              </button>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-semibold text-secondary mb-1">
                Reset Your Password
              </h1>
              <p className="text-sm text-gray-500 mb-6 text-center">
                We&apos;ve sent an OTP to{" "}
                <span className="font-semibold">{email}</span>. Enter it below
                along with your new password.
              </p>

              {/* OTP */}
              <div className="w-full mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  One-Time Password (OTP)
                </label>
                <input
                  type="text"
                  placeholder="Enter the OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border-2 border-gray-200 text-sm 
                             focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300"
                />
              </div>

              {/* New Password */}
              <div className="w-full mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border-2 border-gray-200 text-sm 
                             focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300"
                />
              </div>

              {/* Confirm Password */}
              <div className="w-full mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border-2 border-gray-200 text-sm 
                             focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300"
                />
              </div>

              <button
                className="w-full h-11 bg-accent text-white rounded-full text-sm font-semibold 
                           hover:bg-accent/90 shadow-md active:scale-95 transition-all duration-200"
                onClick={verifyOtp}
              >
                Verify OTP & Reset Password
              </button>

              <button
                className="w-full h-10 mt-3 text-xs font-semibold text-accent hover:underline"
                onClick={sendOtp}
              >
                Resend OTP
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
