import { BsCart3 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="w-full h-[80px] shadow-2xl flex justify-center relative">
      <GiHamburgerMenu className="h-full mx-4 text-3xl md:hidden absolute left-2" />
      <img
        onClick={() => {
          navigate("/");
        }}
        src="/logo.png"
        alt="logo"
        className="w-[70px] h-[70px]  top-0 left-0 m-2 object-cover cursor-pointer"
      />
      <div className="w-[calc(100%-160px)] hidden md:flex h-full flex justify-center items-center">
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
      <div className="w-[80px] hidden md:flex flex justify-center items-center">
        <Link to="/cart" className=" text-[20px] font-bold mx-2">
          <BsCart3 />
        </Link>
      </div>
    </header>
  );
}
