import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/admin/Dashboard";
import Header from "../pages/admin/Header";
// import NotFound from "../components/NotFound";

export default function UserNavigator() {
  return (
    <>
      <div className="flex dark:bg-primary bg-white">
        {/* <AdminNav /> */}
        <div className="flex-1 max-w-screen-xl">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            {/* <Route path='*' element={<NotFound />} /> */}
          </Routes>
        </div>
      </div>
    </>
  );
}
