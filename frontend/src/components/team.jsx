import Footer from "../container/footer/footer";
import Banner from "../container/main/banner/banner";
import Member1 from "../images/team/1.png";
import Member2 from "../images/team/2.png";
import Member3 from "../images/team/3.png";

function Team() {
  const team = [
    { imgurl: Member1, full_name: "Adele Jenning", position: "Salesman" },
    { imgurl: Member2, full_name: "Aiken Clem", position: "Business Owner" },
    { imgurl: Member3, full_name: "Monica Crawford", position: "Photographer" },
  ];

  const getMembers = () => {
    return team.map((member, id) => {
      return (
        <div key={id} className="team-container__box">
          <div className="team-container__box__img-div">
            <img src={member.imgurl} alt="team_img" />
          </div>
          <div className="team-container__box__descr">
            <h3>{member.full_name}</h3>
            <p>{member.position}</p>
          </div>
        </div>
      );
    });
  };

  return (
    <section className="team-page">
      <div className="container">
        <div className="team-content">
          <div className="team-content__title">
            <h4>About our Team</h4>
            <h2>Meet the Super Parking Team</h2>
            <p>
              Our team is here to ensure your vehicle is safe and secure while
              parked with us, and we go above and beyond to ensure your
              satisfaction. We understand that planning your vehicle's rest can
              be stressful, which is why we make the process as easy as
              possible. Our website allows you to reserve your dream parking
              slot in just a few clicks, and our friendly operators are always
              available to answer any questions you may have.
            </p>
          </div>
          <div className="team-container">{getMembers()}</div>
        </div>
      </div>
      <Banner />
      <Footer />
    </section>
  );
}

export default Team;
