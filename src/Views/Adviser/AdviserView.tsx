import React from 'react';
import './AdviserView.css';

const AdviserView = () => {
  interface Canine {
    id: number;
    name: string;
    breed: string;
    age: number;
  }

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