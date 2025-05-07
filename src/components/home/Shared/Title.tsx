import React from "react";

export default function Title({ title }: { title: string }) {
  return (
    <>
      <h2 className="text-xl md:text-3xl font-medium font-serif border-b-4 border-[#5274b8]">{title}</h2>;
    </>
  );
}
