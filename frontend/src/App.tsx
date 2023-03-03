import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Parking from "./container/parking";
import Register from "./components/register/register";
import LoginPage from "./components/login/login";
import PersistLogin from "./components/PersistLogin";

import { StateProvider } from "./components/context/stateprovider";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/sign_up" element={<Register />} />
          <Route path="/sign_in" element={<LoginPage />} />
          <Route element={<PersistLogin />}>
            <Route element={<StateProvider />}>
              <Route path="/" element={<Parking />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
