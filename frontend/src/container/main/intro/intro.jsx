import { Link } from "react-router-dom";
import BgShape from "../../../images/intro/bg.png";
import Car from "../../../images/intro/car.png";
import { useEffect, useState } from "react";

function Intro() {
  const [goUp, setGoUp] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: (0, 0), behavior: "smooth" });
  };

  const bookBtn = () => {
    document
      .querySelector("#booking-section")
      .scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const onPageScroll = () => {
      if (window.pageYOffset > 600) {
        setGoUp(true);
      } else {
        setGoUp(false);
      }
    };
    window.addEventListener("scroll", onPageScroll);

    return () => {
      window.removeEventListener("scroll", onPageScroll);
    };
  }, []);
  return (
    <>
      <section id="home" className="intro-section">
        <div className="container">
          <img className="bg-shape" src={BgShape} alt="bg-shape" />
          <div className="intro-content">
            <div className="intro-content__text">
              <h4>Plan your vehicles rest now</h4>
              <h1>
                Save <span>big</span> with our parking
              </h1>
              <p>
                Rent the parking slot of your dreams. Unbeatable prices,
                <br></br>unlimited hours, flexible slot options and much more.
              </p>
              <div className="intro-content__text__btns">
                <Link
                  onClick={bookBtn}
                  className="intro-content__text__btns__book-ride"
                  to="/"
                >
                  New Booking &nbsp;{" "}
                  <i className="fa-solid fa-circle-check"></i>
                </Link>
                <Link
                  className="intro-content__text__btns__learn-more"
                  to="/about"
                >
                  Learn More &nbsp; <i className="fa-solid fa-angle-right"></i>
                </Link>
              </div>
            </div>

            <img src={Car} alt="car-img" className="intro-content__car-img" />
          </div>
        </div>

        <div
          onClick={scrollToTop}
          className={`scroll-up ${goUp ? "show-scroll" : ""}`}
        >
          <i className="fa-solid fa-angle-up"></i>
        </div>
      </section>
    </>
  );
}

export default Intro;
