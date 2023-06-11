import Plan from "../container/main/plan/plan";
import Footer from "../container/footer/footer";
import Banner from "../container/main/banner/banner";
import Faq from "../container/main/faq/faq";

function About() {
  return (
    <>
      <section className="about-page">
        <div className="container">
          <Plan />
          <Faq bg={true} />
        </div>
      </section>
      <Banner />
      <Footer />
    </>
  );
}

export default About;
