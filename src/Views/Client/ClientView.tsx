import React from 'react';
import { useEffect } from 'react';
import { getUserById, logoutUser } from '../services/authRoutes';

const ClientView: React.FC = () => {
  //const [userData, setUserData] = useState({ username: '', email: '', phone: '', address: '' });
  //const { username, email, phone, address } = userData;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const session = JSON.parse(sessionStorage.getItem('user') || '{}');
        console.log("User Session:", session);
        const response = await getUserById(session.user.id);
        console.log("Usuario", response);
        //setUserData(user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);
  
  const handleLogout = async () => {
    try {
      const result = await logoutUser();
      if (result.status === 'ok') {
        alert('Sesión cerrada exitosamente.');
        sessionStorage.clear(); // Limpia la sesión en el frontend
        window.location.href = '/login'; // Redirige al usuario a la página de login
      } else {
        alert('Error al cerrar sesión: ' + result.message);
      }
    } catch (error) {
      console.error('Error al intentar cerrar sesión:', error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Información de la Cuenta</h2>
      <button onClick={handleLogout} style={{ marginTop: "20px", padding: "10px", cursor: "pointer" }}>
        Cerrar Sesión
      </button>
    </div>
  );
};

export default ClientView;