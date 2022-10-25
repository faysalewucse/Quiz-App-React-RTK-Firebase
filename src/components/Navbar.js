import gravatarUrl from "gravatar-url";
import React from "react";

export default function Navbar() {
  return (
    <div className="bg-indigo-600 h-16 w-full flex justify-between items-center px-20 shadow-lg">
      <h1 className="text-white text-2xl font-bold">
        <span className="text-3xl bg-white text-black px-2 rounded-md">Q</span>
        uiz
      </h1>
      <img
        className="object-cover w-10 h-10 rounded-full border-2 border-black"
        src={gravatarUrl("faysal.ewucse@gmail.com", {
          size: 80,
        })}
        alt="Faysal Ahmad"
      />
    </div>
  );
}
