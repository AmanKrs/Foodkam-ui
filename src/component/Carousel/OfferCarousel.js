import offer1 from "../../assets/offer1.webp";
import offer2 from "../../assets/offer2.webp";
import { useRef } from "react";
import "./carousel.css";

export default function OfferCarousel(props) {
 
  const cardmove = useRef();
  const prev = () => {
    cardmove.current.scrollBy({
      top: 100,
      left: -100,
      behavior: "smooth",
    });
  };
  const next = () => {
    cardmove.current.scrollBy({
      top: 100,
      left: 100,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="custOffer">
        <h1>{props.title}</h1>
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
            <div className="carousel-list-offer" ref={cardmove}>
              <div className="carousel-box">
                <img src={offer1} className="offerImg" />
              </div>
              <div className="carousel-box">
                <img src={offer2} className="offerImg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
