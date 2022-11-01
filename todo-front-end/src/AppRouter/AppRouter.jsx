import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import App from '../App';
const AppRouter = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;
