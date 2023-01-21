import React, { useEffect, useState } from "react";

import "../css/Banner.css";
import { Link, useNavigate } from "react-router-dom";
import { GoThreeBars } from "react-icons/go";

function Banner() {
  //   const [movie, setMovie] = useState([]);
  //   const navigate = useNavigate();
  //   const { authInfo } = useAuth();
  //   const { isLoggedIn } = authInfo;

  //   const handleSearchSubmit = (query) => {
  //     navigate("/movie/search?title=" + query);
  //   };

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <div>
      <section className="header">
        <header
          className="banner"
          style={{
            backgroundSize: "cover",
            backgroundImage: `./image/banner.jpeg`,
            backgroundPosition: "center center",
          }}
        >
          <div className="banner__contents">
            <h1 className="banner__title">
              ROYAL KATD
              {/* {movie?.title || movie?.name || movie?.original_name} */}
            </h1>
            <div className="banner__buttons">
              <button
                className="banner__button"
                //   onClick={() => navigate("/allPost")}
              >
                Posts
              </button>

              <button
                className="banner__button"
                //   onClick={() => navigate("/series")}
              >
                Series
              </button>
            </div>
            <h1 className="banner__description">
              {/* {truncate(movie?.overview, 150)} */}
              <p>Company Mission Statement goes here</p>
            </h1>
          </div>

          <div className="banner__fadeButton" />
        </header>
      </section>
      <div className="pt-12 ">
        {/* <AppSearchForm
          placeholder="Search..."
          inputClassName="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-full transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none hover:bg-blue "
          onSubmit={handleSearchSubmit}
        /> */}
      </div>
    </div>
  );
}

export default Banner;
