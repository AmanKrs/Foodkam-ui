import React, { useEffect, useRef, useState } from "react";
import burger from "../../assets/Foods/Burger.webp"
import northIN from "../../assets/northIN.avif"
export default function Carousel() {
  const cardmove = useRef();
  const prev = () => {
    cardmove.current.scrollBy({
      top: 100,
      left: -200,
      behavior: "smooth",
    });
  };
  const next = () => {
    cardmove.current.scrollBy({
      top: 100,
      left: 200,
      behavior: "smooth",
    });
  };
  return (
    <>
      <h1>Best offers for you</h1>
      <div className="carousel-head">
        <div className="carousel-container">
          <div className="carousel-btn-div">
            <button className="carousel-btn" onClick={prev}>
              &#8249;
            </button>
            <button className="carousel-btn" onClick={next}>
              &#8250;
            </button>
          </div>

          <div className="carousel-list" ref={cardmove}>
            <div className="carousel-box"><img src={northIN} className="carouselImg"/></div>
            <div className="carousel-box"><img src={burger} className="carouselImg"/></div>
            <div className="carousel-box"><img src={northIN} className="carouselImg"/></div>
            <div className="carousel-box"><img src={burger} className="carouselImg"/></div>
            <div className="carousel-box"><img src={northIN} className="carouselImg"/></div>
            <div className="carousel-box"><img src={burger} className="carouselImg"/></div>
            <div className="carousel-box"><img src={northIN} className="carouselImg"/></div>
            <div className="carousel-box"><img src={burger} className="carouselImg"/></div>
          </div>
        </div>
      </div>
    </>
  );
}
