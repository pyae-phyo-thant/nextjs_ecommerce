import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import slide_1 from "../../assets/images/slide-1.jpeg";
import slide_2 from "../../assets/images/slide-2.jpeg";
import slide_3 from "../../assets/images/slide-3.jpeg";

const LandSlide = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <Slider {...settings}>
        <div>
          <Image src={slide_1} />
        </div>
        <div>
          <Image src={slide_2} />
        </div>
        <div>
          <Image src={slide_3} />
        </div>
      </Slider>
    </>
  );
};

export default LandSlide;
