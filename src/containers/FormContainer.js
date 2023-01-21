import React from "react";

export default function FormContainer({ children }) {
  return (
    <div className="fixed inset-0 dark:bg-primary bg-white flex justify-center items-center md:w-full">
      {children}
    </div>
  );
}
