import React from 'react';

interface AdviserViewProps {
  onLogout: () => void;
}

const AdviserView: React.FC<AdviserViewProps> = ({ onLogout }) => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default AdviserView;