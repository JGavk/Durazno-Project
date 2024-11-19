import React, { useEffect, useState } from 'react';
import { getUserById, logoutUser } from '../services/authRoutes';

const ClientView: React.FC = () => {

  const [userData, setUserData] = useState({
    username: '',
    email: '',
    phone: '',
    address: '',
  });


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const session = JSON.parse(sessionStorage.getItem('user') || '{}');
        console.log('User Session:', session);

  
        const response = await getUserById(session.user.id);
        console.log('User', response);

        if (response.status === 'ok') {
          setUserData(response.user); 
        } else {
          console.error('Error to obtain user data');
        }
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
        alert('Session closed.');
        sessionStorage.clear(); 
        window.location.href = '/Durazno-Project/login'; 
      } else {
        alert('Logout failed: ' + result.message);
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Información de la Cuenta</h2>
      {/*  */}
      <div>
        <label>Nombre de Usuario:</label>
        <p>{userData.username || 'None'}</p>
      </div>
      <div>
        <label>Email:</label>
        <p>{userData.email || 'None'}</p>
      </div>
      <div>
        <label>Teléfono:</label>
        <p>{userData.phone || 'None'}</p>
      </div>
      <div>
        <label>Dirección:</label>
        <p>{userData.address || 'None'}</p>
      </div>

      <button onClick={handleLogout} style={{ marginTop: "20px", padding: "10px", cursor: "pointer" }}>
        Cerrar Sesión
      </button>
    </div>
  );
};

export default ClientView;