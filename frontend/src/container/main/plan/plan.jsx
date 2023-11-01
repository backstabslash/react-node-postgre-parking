import SlotsVariety from "../../../images/plan/icon1.png";
import ContactOperator from "../../../images/plan/icon2.png";
import VehicleSafety from "../../../images/plan/icon3.png";

function Plan() {
  return (
    <>
      <section className="plan-section">
        <div className="container">
          <div className="plan-container">
            <div className="plan-container__title">
              <h3>Plan your vehicles rest now</h3>
              <h2>Quick & easy vehicle parking</h2>
            </div>

            <div className="plan-container__boxes">
              <div className="plan-container__boxes__box">
                <div className="plan-container__boxes__box__top">
                  <img src={SlotsVariety} alt="SlotsVariety" />
                  <h3>Slots Variety</h3>
                </div>
                <p>
                  Whatever your needs may be, we have the perfect slot for you,
                  choose from our vast selection of slots.
                </p>
              </div>

              <div className="plan-container__boxes__box">
                <div className="plan-container__boxes__box__top">
                  <img src={ContactOperator} alt="ContactOperator" />
                  <h3>Contact Operator</h3>
                </div>
                <p>
                  Our friendly operators are always available to assist you with
                  any inquiries or issues you may have.
                </p>
              </div>

              <div className="plan-container__boxes__box">
                <div className="plan-container__boxes__box__top">
                  <img src={VehicleSafety} alt="VehicleSafety" />
                  <h3>Vehicle Safety</h3>
                </div>
                <p>
                  Secure your parked vehicle with our anti-theft tips and
                  solutions, including well-lit parking and more.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Plan;
