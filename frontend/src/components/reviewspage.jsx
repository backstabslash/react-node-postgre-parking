import Footer from "../container/footer/footer";
import Banner from "../container/main/banner/banner";
import Reviews from "../container/main/reviews/reviews";

function ReviewsPage() {
  return (
    <>
      <section className="reviews-page">
        <Reviews paddingTop={10} />
        <Banner />
        <Footer />
      </section>
    </>
  );
}

export default ReviewsPage;
