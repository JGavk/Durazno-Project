import React from 'react';
import { useEffect } from 'react';
import { getUserById } from '../services/authRoutes';

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
  
  //if (!username || !email) {
    //return <p>No hay datos disponibles. Por favor, inicia sesión nuevamente.</p>;
  //}

  return (
    <div style={{ padding: "20px" }}>
      <h2>Información de la Cuenta</h2>
      
    </div>
  );
};

export default ClientView;