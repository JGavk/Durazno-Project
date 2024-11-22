import React from 'react';
import './AdviserView.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutAdviser } from '../services/authRoutes';

const AdviserView = () => {
  interface Canine {
    id: number;
    name: string;
    breed: string;
    age: number;
  }
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await logoutAdviser();
      if (response.status !== 'ok') {
        throw new Error('Error logging out');
      }
      const csrftoken = sessionStorage.getItem('csrftoken') || '';
      console.log('csrftoken:', csrftoken);

    } catch (error) {
      console.error('Error logging out:', error);
    }
    // Redirigir a la página de inicio de sesión
    navigate('/login');
  };
  
  useEffect(() => {
    const fetchUserData = async () => {

      try {
        const csrftoken = sessionStorage.getItem('csrftoken') || '';
        console.log('csrftoken:', csrftoken);

        if (!csrftoken) {
          console.error('No user is logged in');
        }

      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const mockCanines: Canine[] = [
      { id: 1, name: 'Rex', breed: 'German Shepherd', age: 5 },
      { id: 2, name: 'Bella', breed: 'Labrador Retriever', age: 3 },
      { id: 3, name: 'Max', breed: 'Bulldog', age: 4 },
  ];
    return (
        <div>
            <h1>Manage Canines</h1>
            <button onClick={handleLogout}>Log Out</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Breed</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>
                    {mockCanines.map((canine) => (
                        <tr key={canine.id}>
                            <td>{canine.id}</td>
                            <td>{canine.name}</td>
                            <td>{canine.breed}</td>
                            <td>{canine.age}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdviserView;