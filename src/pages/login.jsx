import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      const response = await axios.post("http://localhost:3000/users/login", {
        email: email,
        password: password,
      });
      toast.success(response.data.message);
      console.log(response.data.message);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  return (
    <div className="w-full h-screen bg-[url('/login.jpg')] bg-center bg-cover flex  justify-evenly items-center ">
      <div className="w-[50%] h-full "></div>
      <div className="w-[50%] h-full flex justify-center items-center">
        <div className="w-[500px] h-[600px] backdrop-blur-lg rounded-[20px] shadow-xl flex flex-col justify-center items-center">
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            className="w-[300px] h-[50px] border border-[#c3efe9] rounded-[20px] my-5"
          />
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            className="w-[300px] h-[50px] border border-[#c3efe9] rounded-[20px] mb-5"
          />
          <button
            onClick={handleLogin}
            className="w-[300px] cursor-pointer h-[50px] bg-[#c3efe9] rounded-[20px] text-[20px] font-bold text-white my-5"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
