import React from "react";

export default function Navbar() {
  return (
    <div className="border-b border-gray-200 flex gap-8 items-center px-4 py-3 top-0 inset-x-0 text-primary bg-white">
      <div className="text-2xl font-bold">MuKNU</div>
      <div className="flex gap-4 items-center">
        <a>지도</a>
        <a>정보</a>
      </div>
    </div>
  );
}
