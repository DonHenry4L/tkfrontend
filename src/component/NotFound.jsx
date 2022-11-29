import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="">
      <div className="flex items-center justify-center min-h-screen bg-indigo-500  bg-fixed bg-cover bg-bottom error-bg">
        <div className="">
          <div className="row">
            <div className="col-sm-8 offset-sm-2 text-gray-50 text-center -mt-52">
              <div className="relative ">
                <h1 className="relative text-9xl tracking-tighter-less text-shadow font-sans font-bold error">
                  <span>4</span>
                  <span>0</span>
                  <span>4</span>
                </h1>
                <div className="error-bg-animation"></div>
                <span className="absolute top-0 -ml-12 text-gray-300 font-semibold -mt-4">
                  Oops!
                </span>
              </div>
              <div className="bg-blue-500 w-full rounded">
                <h5 className="text-gray-300 font-semibold -mr-10 mt-4 font-semi-bold">
                  Page not found
                </h5>
                <p className="text-gray-100 mt-2 mb-6">
                  we are sorry, but the page you requested was not found
                </p>
              </div>
              <Link
                to="/"
                className="bg-green-400  px-5 py-3 text-sm shadow-sm font-medium tracking-wider text-gray-50 rounded-full hover:shadow-lg"
              >
                Go to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
