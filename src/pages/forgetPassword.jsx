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
    <div className="w-full h-screen flex justify-center items-center bg-[url('/login.jpg')] bg-center bg-cover ">
      {otpSent ? (
        <div className="w-[400px] h-[500px] bg-white shadow-2xl rounded-xl flex flex-col justify-center items-center p-4 gap-2">
          <input
            type="text"
            placeholder="Enter your OTP"
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value);
            }}
            className="w-[300px] h-[40px] border-2 border-gray-200 rounded-lg px-2 focus:outline-none focus:border-secondary transition-all duration-300"
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
            className="w-[300px] h-[40px] border-2 border-gray-200 rounded-lg px-2 focus:outline-none focus:border-secondary transition-all duration-300"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            className="w-[300px] h-[40px] border-2 border-gray-200 rounded-lg px-2 focus:outline-none focus:border-secondary transition-all duration-300"
          />
          <button
            className="w-[300px] h-[40px] bg-accent text-white rounded-lg mt-4 hover:bg-secondary transition-all duration-300"
            onClick={verifyOtp}
          >
            Verify OTP
          </button>
          <button
            className="w-[300px] h-[40px] bg-accent text-white rounded-lg mt-4 hover:bg-secondary transition-all duration-300"
            onClick={sendOtp}
          >
            Resend OTP
          </button>
        </div>
      ) : (
        <div className="w-[400px] h-[500px] bg-white shadow-2xl rounded-xl flex flex-col justify-center items-center p-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="w-[300px] h-[40px] border-2 border-gray-200 rounded-lg px-2 focus:outline-none focus:border-secondary transition-all duration-300"
          />
          <button
            className="w-[300px] h-[40px] bg-accent text-white rounded-lg mt-4 hover:bg-secondary transition-all duration-300"
            onClick={sendOtp}
          >
            Send OTP
          </button>
        </div>
      )}
    </div>
  );
}
