import Navbar from "../../component/Navbar/Navbar";
import "./home.css";
import Carousel from "../../component/Carousel/Carousel";
import ResturantsCards from "../../component/ResturantsCards/ResturantsCards";
import OfferCarousel from "../../component/Carousel/OfferCarousel";

export default function Home() {
  console.log("home")
  return(
    <div className="custhomediv">
      <Navbar />

      <div className="home-container">
        <OfferCarousel title={"Best offers for you"} />
        <Carousel title={"Best Restaurants for you"} />
        <Carousel title={"Best Dishes for you"} />
        <ResturantsCards />
      </div>
    </div>
  );
}
