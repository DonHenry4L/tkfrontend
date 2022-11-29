import React from "react";

export default function Container({ children, className }) {
  return (
    <div className={"text-white max-w-screen-xl mx-auto px-2 " + className}>
      {children}
    </div>
  );
}
