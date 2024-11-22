import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../Landing/LandingPage';
import LoginView from '../Login/LoginView';
import ClientView from '../Client/ClientView';
import AdviserView from '../Adviser/AdviserView';
import AdviserLogin from './Adviser/AdviserLogin';

function App() {
  return (
    <Router basename="/Durazno-Project">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/client" element={<ClientView />} />
        <Route path='/adviser' element={<AdviserView />} />
        <Route path="/adv/login" element={<AdviserLogin />} />
        <Route
          path="/clientes-felices"
          element={
            <div>
              <h1>Clientes felices</h1>
              <p>Contenido de clientes felices</p>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;