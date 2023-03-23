import Plan from "../container/main/plan/plan";
import Footer from "../container/footer/footer";
import AboutMain from "../images/about/about-main.png";
import Box1 from "../images/about/icon1.png";
import Box2 from "../images/about/icon2.png";
import Box3 from "../images/about/icon3.png";
import Banner from "../container/main/banner/banner";

function About() {
  return (
    <>
      <section className="about-page">
        <div className="container">
          <div className="about-main">
            <img
              className="about-main__img"
              src={AboutMain}
              alt="car-renting"
            />
            <div className="about-main__text">
              <h3>About our Company</h3>
              <h2>Super Parking — your go-to for unbeatable parking deals</h2>
              <p>
                Rent your dream parking slot at unbeatable prices with unlimited
                hours and flexible options. Our friendly operators provide
                assistance, while our anti-theft tips ensure your vehicle's
                safety. Book your slot easily online, and enjoy exclusive
                discounts by signing up for our loyalty program. Trust us for
                stress-free, reliable, and affordable parking solutions.
              </p>
              <div className="about-main__text__icons">
                <div className="about-main__text__icons__box">
                  <img src={Box1} alt="car-icon" />
                  <span>
                    <h4>4</h4>
                    <p>Vehicle Types</p>
                  </span>
                </div>
                <div className="about-main__text__icons__box">
                  <img src={Box2} alt="car-icon" />
                  <span>
                    <h4>&gt; 25</h4>
                    <p>Parking Slots</p>
                  </span>
                </div>
                <div className="about-main__text__icons__box">
                  <img src={Box3} alt="car-icon" className="last-fk" />
                  <span>
                    <h4>24 / 7</h4>
                    <p>Technical Support</p>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Plan />
        </div>
      </section>
      <Banner />
      <Footer />
    </>
  );
}

export default About;
