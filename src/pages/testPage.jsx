import { useState } from "react";

export default function TestPage() {
  const [count, setCount] = useState(0);
  //a ==== our variable
  //b ==== function

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[450px] h-[250px] shadow flex justify-center items-center">
        <button
          onClick={() => {
            setCount(count - 1);
          }}
          className="bg-blue-600 text-white font-bold text-center w-[100px] h-10 text-[20px] cursor-pointer"
        >
          -
        </button>
        <span className="text-[40px] font-bold text-center w-[100px] h-10 mx-2.5 flex justify-center items-center">
          {count}
        </span>
        <button
          onClick={() => {
            setCount(count + 1);
          }}
          className="bg-blue-600 text-white font-bold text-center w-[100px] h-10 text-[20px] cursor-pointer"
        >
          +
        </button>
      </div>
    </div>
  );
}
