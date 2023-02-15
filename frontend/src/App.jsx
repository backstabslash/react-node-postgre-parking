import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Parking from './container/parking'
import Register from './components/register/register';
import LoginPage from './components/login/login';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route exact path="/sign_up" element={<Register />} />
          <Route exact path="/" element={<Parking />} />
          <Route exact path="/sign_in" element={<LoginPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
