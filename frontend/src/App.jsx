import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Parking from "./container/parking";
import Register from "./components/register/register";
import LoginPage from "./components/login/login";
import PersistLogin from "./components/PersistLogin";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route exact path="/sign_up" element={<Register />} />
          <Route exact path="/sign_in" element={<LoginPage />} />
          <Route element={<PersistLogin />}>
            <Route exact path="/" element={<Parking />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
