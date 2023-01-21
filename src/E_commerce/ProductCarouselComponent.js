import React from "react";
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "../css/carousel.css";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

// const contentStyle = {
//   height: "300px",
//   color: "#fff",
//   lineHeight: "160px",
//   textAlign: "center",
//   background: "#364d79",
//   backgroundRepeat: "no-repeat",
//   backgroundPosition: "center center",
//   objectFit: "cover",
// };

const ProductCarouselComponent = ({ bestSellers }) => {
  const cursorP = {
    cursor: "pointer",
  };

  return bestSellers.length > 0 ? (
    <Carousel>
      {bestSellers.map((item, idx) => (
        <Carousel.Item key={idx}>
          <img
            crossOrigin="anonymous"
            className="d-block w-100"
            style={{ height: "300px", objectFit: "cover" }}
            src={item.images ? item.images[0].path : null}
            alt="First slide"
          />
          <Carousel.Caption>
            <Link style={cursorP} to={`/product-details/${item._id}`}>
              <h3>
                <span className=" text-yellow-500">Bestseller</span> in {item.category} Category
              </h3>
            </Link>
            <p>{item.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  ) : null;
};

export default ProductCarouselComponent;
