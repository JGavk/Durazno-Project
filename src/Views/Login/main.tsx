import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import LandingPage from '../Landing/LandingPage';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LandingPage /> 
  </StrictMode>
);