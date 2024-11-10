import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import LandingPage from '../Landing/LandingPage'; // Importa el componente de la Landing Page
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LandingPage /> {/* Cambia LoginView por LandingPage */}
  </StrictMode>
);
