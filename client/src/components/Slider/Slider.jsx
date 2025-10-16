import "./slider.scss";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";
import { useState } from "react";
function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const data = [
    "/images/slider1.jpg",
    "/images/slider2.jpeg",
    "/images/slider3.webp",
    "/images/slider4.jpg",
    "/images/slider5.jpg",
    "/images/slider6.jpeg",
    "/images/slider7.jpeg",
    "/images/slider8.jpeg",
    "/images/slider9.jpeg",
    "/images/slider10.jpeg",
  ];

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? data.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="slider">
      <div
        className="container"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {data.map((img, index) => (
          <img key={index} src={img} alt={`slider-${index}`} />
        ))}
      </div>

      <div className="icons">
        <div className="icon" onClick={prevSlide}>
          <WestOutlinedIcon className="mui-icons" />
        </div>
        <div className="icon" onClick={nextSlide}>
          <EastOutlinedIcon className="mui-icons" />
        </div>
      </div>
    </div>
  );
}

export default Slider;
