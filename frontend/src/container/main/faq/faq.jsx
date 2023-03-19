import { useState } from "react";

function Faq() {
  const [active, setActive] = useState("q1");

  const handleExpand = (id) => {
    setActive(active === id ? "" : id);
  };

  return (
    <>
      <section className="faq-section">
        <div className="container">
          <div className="imgContainer">
            <div className="faq-content">
              <div className="faq-content__title">
                <h5>FAQ</h5>
                <h2>Frequently Asked Questions</h2>
                <p>
                  Frequently Asked Questions About the Super Parking Booking
                  Process on Our Website: Answers to Common Concerns and
                  Inquiries.
                </p>
              </div>

              <div className="all-questions">
                <div className="faq-box">
                  <div
                    id="q1"
                    onClick={() => handleExpand("q1")}
                    className={`faq-box__question  ${
                      active === "q1" ? "active-question" : ""
                    }`}
                  >
                    <p>
                      1. What sets Super Parking apart from other parking
                      options?
                    </p>
                    <i className="fa-solid fa-angle-down"></i>
                  </div>
                  <div
                    id="q1"
                    onClick={() => handleExpand("q1")}
                    className={`faq-box__answer ${
                      active === "q1" ? "active-answer" : ""
                    }`}
                  >
                    At Super Parking, we strive to provide the best possible
                    parking experience for our customers. Our top priority is
                    the safety and security of your vehicle, which is why we
                    offer 24/7 surveillance and additional security measures. We
                    also pride ourselves on our excellent customer service and
                    affordable rates. With our convenient location and
                    hassle-free booking process, Super Parking is the ideal
                    choice for all your parking needs.
                  </div>
                </div>
                <div className="faq-box">
                  <div
                    id="q2"
                    onClick={() => handleExpand("q2")}
                    className={`faq-box__question ${
                      active === "q2" ? "active-question" : ""
                    }`}
                  >
                    <p>2. How can I reserve the desired parking slot?</p>
                    <i className="fa-solid fa-angle-down"></i>
                  </div>
                  <div
                    id="q2"
                    onClick={() => handleExpand("q2")}
                    className={`faq-box__answer ${
                      active === "q2" ? "active-answer" : ""
                    }`}
                  >
                    To reserve a parking slot with us, simply create an account
                    on our website and fill out our easy reservation form.
                    Select the desired parking slot and complete the booking
                    process. We recommend reserving your slot in advance to
                    ensure availability and to take advantage of any discounts
                    or promotions that may be available.
                  </div>
                </div>
                <div className="faq-box">
                  <div
                    id="q3"
                    onClick={() => handleExpand("q3")}
                    className={`faq-box__question ${
                      active === "q3" ? "active-question" : ""
                    }`}
                  >
                    <p>
                      3. Is it possible to get discounted rates for parking?
                    </p>
                    <i className="fa-solid fa-angle-down"></i>
                  </div>
                  <div
                    id="q3"
                    onClick={() => handleExpand("q3")}
                    className={`faq-box__answer ${
                      active === "q3" ? "active-answer" : ""
                    }`}
                  >
                    Yes, we offer discounted rates for regular customers. Sign
                    up for our loyalty program and enjoy exclusive discounts on
                    parking rates. As a loyal customer, you'll also have access
                    to other perks and benefits, such as priority parking and
                    special promotions. Contact us to learn more about our
                    loyalty program and how you can start saving on parking
                    today.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Faq;
