import { BrowserRouter, Routes, Route } from "react-router-dom";
import Parking from "./container/parking";
import Register from "./components/register";
import LoginPage from "./components/login";
import PersistLogin from "./components/PersistLogin";
import "./styles/styles.scss";
import Header from "./container/header/header";
import About from "./components/about";
import ReviewsPage from "./components/reviewspage";
import Team from "./components/team";
import Contact from "./components/contact";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/sign_up" element={<Register />} />
          <Route path="/sign_in" element={<LoginPage />} />
          <Route element={<PersistLogin />}>
            <Route path="/" element={<Parking />} />
            <Route path="/about" element={<About />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
