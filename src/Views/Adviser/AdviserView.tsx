import React from 'react';
import './AdviserView.css';
import { useEffect } from 'react';
import { getUserById } from '../services/authRoutes';


const AdviserView = () => {
  interface Canine {
    id: number;
    name: string;
    breed: string;
    age: number;
  }
  useEffect(() => {
    const fetchUserData = async () => {

      try {
        const session = JSON.parse(sessionStorage.getItem('user') || '{}');

        if (!session.user || !session.user.id) {
          console.error('No user is logged in');
          return(
            window.location.href = '/Durazno-Project/login'
          );
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