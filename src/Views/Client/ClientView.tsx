import React from 'react';
import { useLocation } from 'react-router-dom';

const ClientView: React.FC = () => {
  const location = useLocation();
  const { username, email, phone, address } = location.state || {};

  if (!username || !email) {
    return <p>No hay datos disponibles. Por favor, inicia sesión nuevamente.</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Información de la Cuenta</h2>
      <p><strong>Nombre de Usuario:</strong> {username}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Teléfono:</strong> {phone}</p>
      <p><strong>Dirección:</strong> {address}</p>
    </div>
  );
};

export default ClientView;