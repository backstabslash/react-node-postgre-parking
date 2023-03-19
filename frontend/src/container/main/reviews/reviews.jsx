import Profile1 from "../../../images/reviews/pfp1.jpg";
import Profile2 from "../../../images/reviews/pfp2.jpg";

function Reviews() {
  const reviews = [
    {
      review:
        '"We had a wonderful experience using this parking service. The booking process was effortless, and the rates were very reasonable. We appreciated the excellent customer service and the peace of mind knowing our vehicle was secure."',
      name: "backstabslash",
      city: "Odessa",
      pfpurl: Profile1,
    },
    {
      review:
        '"Amazing experience! Quick booking, great rates, and secure parking. Friendly customer service was the cherry on top. Highly recommend this top-notch parking service!"',
      name: "nervouswaltz",
      city: "Tallinn",
      pfpurl: Profile2,
    },
  ];

  const getReviews = () => {
    return reviews.map((review) => {
      return (
        <div className="all-reviews__box">
          <span className="quotes-icon">
            <i className="fa-solid fa-quote-right"></i>
          </span>
          <p>{review.review}</p>
          <div className="all-reviews__box__name">
            <div className="all-reviews__box__name__profile">
              <img src={review.pfpurl} alt="user_img" />
              <span>
                <h4>{review.name}</h4>
                <p>{review.city}</p>
              </span>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <section className="reviews-section">
        <div className="container">
          <div className="reviews-content">
            <div className="reviews-content__title">
              <h4>Reviewed by People</h4>
              <h2>Our Clients About Us</h2>
              <p>
                Discover the positive impact we've made on the our clients by
                reading through their reviews. Our clients have experienced our
                service and results, and they're eager to share their positive
                experiences with you.
              </p>
            </div>
            <div className="all-reviews">{getReviews()}</div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Reviews;
