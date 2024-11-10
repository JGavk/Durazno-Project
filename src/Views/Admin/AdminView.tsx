
import React from 'react';

interface AdminViewProps {
  onLogout: () => void;
}

const AdminView: React.FC<AdminViewProps> = ({ onLogout }) => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default AdminView;