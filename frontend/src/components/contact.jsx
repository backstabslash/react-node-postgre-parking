import Footer from "../container/footer/footer";
import Banner from "../container/main/banner/banner";

function Contact() {
  return (
    <>
      <section className="contact-page">
        <div className="container">
          <div className="contact-div">
            <div className="contact-div__text">
              <h2>Get in Touch</h2>
              <p>
                If you have any inquiries or need assistance with your booking,
                our friendly operators are always available to help. Contact us
                through our website, and we'll be happy to assist you every step
                of the way. Trust Super Parking for a reliable, affordable, and
                stress-free parking experience.
              </p>
              <a href="/">
                <i className="fa-solid fa-phone"></i>&nbsp; (123) 456-7869
              </a>
              <a href="/">
                <i className="fa-solid fa-envelope"></i>&nbsp;
                superparking@gmail.com
              </a>
            </div>
            <div className="contact-div__form">
              <form>
                <label>
                  Full Name <b>*</b>
                </label>
                <input type="text" placeholder="e.g. Astrid Macy"></input>

                <label>
                  Email <b>*</b>
                </label>
                <input type="email" placeholder="youremail@example.com"></input>

                <label>
                  Tell us your thoughts <b>*</b>
                </label>
                <textarea placeholder="Enter your message here..."></textarea>

                <button type="submit" onClick={(e) => e.preventDefault()}>
                  <i className="fa-solid fa-envelope-open-text"></i>&nbsp; Send
                  Message
                </button>
              </form>
            </div>
          </div>
        </div>
        <Banner />
        <Footer />
      </section>
    </>
  );
}

export default Contact;
