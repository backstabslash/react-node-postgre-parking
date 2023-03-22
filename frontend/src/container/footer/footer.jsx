function Footer() {
  return (
    <>
      <footer>
        <div className="container">
          <div className="footer-content">
            <ul className="footer-content__1">
              <li>
                <span>Super</span> Parking
              </li>
              <li>
                We offer secure and affordable parking solutions with excellent
                customer service. Our 24/7 surveillance ensures the safety of
                your vehicle.
              </li>
              <li>
                <a href="tel:123456789">
                  <i className="fa-solid fa-phone"></i> &nbsp; (123) 456-789
                </a>
              </li>

              <li>
                <a
                  href="mailto: 
                carrental@gmail.com"
                >
                  <i className="fa-solid fa-envelope"></i>
                  &nbsp; superparking@gmail.com
                </a>
              </li>
            </ul>

            <ul className="footer-content__2">
              <li>Company</li>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/reviews">Reviews</a>
              </li>
              <li>
                <a href="/team">Team</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>

            <ul className="footer-content__2">
              <li>
                Working <span>Hours</span>
              </li>
              <li>From 7:00 AM to 12:00 PM on weekdays</li>
              <li>From 7:00 AM to 7:00 PM on weekends</li>
              <li>Tech support is available 24/7</li>
            </ul>

            <ul className="footer-content__2">
              <li>Subscription</li>
              <li>
                <p>
                  Subscribe to our newsletter and stay updated with the latest
                  news and exclusive offers!
                </p>
              </li>
              <li>
                <input type="email" placeholder="Your Email Address"></input>
              </li>
              <li>
                <button className="submit-email">Submit</button>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
