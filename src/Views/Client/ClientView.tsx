import React from 'react';

interface ClientViewProps {
  onLogout: () => void;
}

const ClientView: React.FC< ClientViewProps> = ({ onLogout }) => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default  ClientView;