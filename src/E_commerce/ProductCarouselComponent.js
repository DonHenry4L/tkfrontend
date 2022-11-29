import React from "react";
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "../css/carousel.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
const contentStyle = {
  height: "300px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  objectFit: "cover",
};
const ProductCarouselComponent = () => (
  <Carousel
    autoPlay
    Responsive
    emulateTouch
    infiniteLoop
    showStatus={false}
    stopOnHover
    swipeable
    useKeyboardArrows={true}
    className="carousel"
    showIndicators={false}
  >
    <div>
      <div style={contentStyle}>
        <img src="./pic/banner.jpg" alt="" crossOrigin="anonymous" />
        <Link to="/product-details">
          <h3 className="legend">Best Seller On Laptop Category</h3>
        </Link>
      </div>
      <p className="legend2">Dell Inspiron 15 3000 Laptop, 15.6 inch HD</p>
    </div>
    <div>
      <div style={contentStyle}>
        <img src="./pic/pic__2.jpg" alt="" crossOrigin="anonymous" />
        <Link to="/product-details">
          <h3 className="legend">Best Seller in Books Category</h3>
        </Link>
      </div>
      <p className="legend2">
        World of Eric Carle, Hear Bear Roar 30-Button Animal Sound Book
      </p>
    </div>
    <div>
      <div style={contentStyle}>
        <img src="./pic/pic__11.jpg" alt="" crossOrigin="anonymous" />
        <Link to="/product-details">
          <h3 className="legend">Best Seller in Camera Category</h3>
        </Link>
      </div>
      <p className="legend2">
        4k Camcorder Video Camera 60FPS 48MP Vlogging Camera for YouTube Wifi
        16X Digital Camera
      </p>
    </div>
  </Carousel>
);
export default ProductCarouselComponent;
