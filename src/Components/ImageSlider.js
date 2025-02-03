import React from "react";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// Custom Arrow components
const NextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-[#14b8a6] p-2 rounded-full shadow-lg cursor-pointer z-10"
  >
    <FaArrowRight />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-[#14b8a6] p-2 rounded-full shadow-lg cursor-pointer z-10"
  >
    <FaArrowLeft />
  </div>
);

const ImageSlider = () => {
  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  // Example image data
  const images = [
    "https://images.pexels.com/photos/28539583/pexels-photo-28539583/free-photo-of-majestic-mountain-peaks-at-sunrise.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://via.placeholder.com/1200x600?text=Slide+2",
    "https://via.placeholder.com/1200x600?text=Slide+3",
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mt-10">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full rounded-lg shadow-lg"
            />
            <div className="absolute bottom-4 left-4 text-white text-xl font-semibold bg-[#14b8a6] bg-opacity-70 px-4 py-2 rounded-lg">
              Slide {index + 1}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
