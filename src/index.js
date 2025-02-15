import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './pages/home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div style={{color: 'red'}}>
        {/* header */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="dashboard" element={<Home />} />
          <Route path='registration' element={<>registration</>} />
          <Route path='login' element={<>login</>} />
        </Routes>
        {/* footer */}
      </div>
    </BrowserRouter>
  </React.StrictMode>

);
