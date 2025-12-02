import UserData from "./userData";

export default function Header() {
  return (
    <div className="bg-blue-800">
      <a href="/" className="text-white font-bold px-4">
        Home
      </a>
      <a href="/login" className="text-white font-bold px-4">
        Login
      </a>
      <a href="/signup" className="text-white font-bold px-4">
        Sign Up
      </a>
      <UserData />
    </div>
  );
}
