import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="w-full h-[80px] shadow-2xl flex">
      <img
        onClick={() => {
          navigate("/");
        }}
        src="/logo.png"
        alt="logo"
        className="w-[70px] h-[70px]  top-0 left-0 m-2 object-cover cursor-pointer"
      />
      <div className="w-[calc(100%-160px)] h-full flex justify-center items-center">
        <Link to="/" className=" text-[20px] font-bold mx-2">
          Home
        </Link>
        <Link to="/products" className=" text-[20px] font-bold mx-2">
          Products
        </Link>
        <Link to="/about" className=" text-[20px] font-bold mx-2">
          About
        </Link>
        <Link to="/contact" className=" text-[20px] font-bold mx-2">
          Contact
        </Link>
      </div>
      <div className="w-[80px]"></div>
    </header>
  );
}
