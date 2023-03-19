import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Parking from "./container/parking";
import Register from "./components/register";
import LoginPage from "./components/login";
import PersistLogin from "./components/PersistLogin";
import "./styles/styles.scss";
import Header from "./container/header/header";

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
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
