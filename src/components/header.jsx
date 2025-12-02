import UserData from "./userData";

export default function Header() {
  return (
    <div className="bg-red-500">
      <h1 className="text-[20px] font-bold text-blue-700">
        Crystal Beauty Clear
      </h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
        laboriosam repellendus, soluta temporibus perspiciatis praesentium
        minima, ipsa perferendis suscipit dolorum esse harum nostrum beatae
        provident! Dolorum mollitia reprehenderit dolorem quis.
      </p>
      <UserData />
    </div>
  );
}
