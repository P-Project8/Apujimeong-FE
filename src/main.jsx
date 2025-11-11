import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import Layout from './pages/Layout.jsx';
import LandingPage from './pages/LandingPage.jsx';
import MainPage from './pages/MainPage.jsx';
import DiagnosisPage from './pages/DiagnosisPage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/diagnosis" element={<DiagnosisPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
