import React, { useEffect, useState } from 'react';
import './AdviserView.css';
import { useNavigate } from 'react-router-dom';
import { logoutAdviser } from '../services/authRoutes';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const AdviserView: React.FC = () => {
  interface Canine {
    id: number;
    name: string;
    breed: string;
    age: number;
  }

  const navigate = useNavigate();

  const [canines, setCanines] = useState<Canine[]>([
    { id: 1, name: 'Rex', breed: 'German Shepherd', age: 5 },
    { id: 2, name: 'Bella', breed: 'Labrador Retriever', age: 3 },
    { id: 3, name: 'Max', breed: 'Bulldog', age: 4 },
  ]);

  const [selectedCanine, setSelectedCanine] = useState<Canine | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'update' | 'delete'>('add');
  const [formCanine, setFormCanine] = useState({ name: '', breed: '', age: '' });

  const handleLogout = async () => {
    try {
      const response = await logoutAdviser();
      if (response.status !== 'ok') throw new Error('Error logging out');
    } catch (error) {
      console.error('Error logging out:', error);
    }
    navigate('/login');
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const csrftoken = sessionStorage.getItem('csrftoken') || '';
        console.log('csrftoken:', csrftoken);
        if (!csrftoken) console.error('No user is logged in');
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  const handleAddCanine = () => {
    const newId = canines.length > 0 ? canines[canines.length - 1].id + 1 : 1;
    const newEntry: Canine = {
      id: newId,
      name: formCanine.name,
      breed: formCanine.breed,
      age: parseInt(formCanine.age, 10),
    };
    setCanines([...canines, newEntry]);
    closeModal();
  };

  const handleUpdateCanine = () => {
    if (selectedCanine) {
      const updatedCanines = canines.map((canine) =>
        canine.id === selectedCanine.id
          ? { ...canine, ...formCanine, age: parseInt(formCanine.age, 10) }
          : canine
      );
      setCanines(updatedCanines);
      closeModal();
    }
  };

  const handleDeleteCanine = () => {
    if (selectedCanine) {
      const updatedCanines = canines.filter((canine) => canine.id !== selectedCanine.id);
      setCanines(updatedCanines);
      closeModal();
    }
  };

  const openModal = (type: 'add' | 'update' | 'delete', canine?: Canine) => {
    setModalType(type);
    if (canine) {
      setSelectedCanine(canine);
      setFormCanine({ name: canine.name, breed: canine.breed, age: String(canine.age) });
    } else {
      setSelectedCanine(null);
      setFormCanine({ name: '', breed: '', age: '' });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCanine(null);
    setFormCanine({ name: '', breed: '', age: '' });
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="bg-dark text-white d-flex flex-column p-3" style={{ width: '250px', height: '100vh' }}>
        <a href="/" className="text-decoration-none text-white mb-4">
          <span className="fs-4 fw-bold" style={{ color: '#f6a000' }}>Sidebar</span>
        </a>
        <ul className="nav flex-column mb-auto">
          <li className="nav-item">
            <button
              className="nav-link active"
              style={{ backgroundColor: '#bf592b', color: 'white' }}
              onClick={() => openModal('add')}
            >
              Agregar Canino
            </button>
          </li>
        </ul>

        <div className="dropdown mt-auto dropup">
          <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown">
            <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle me-2" />
            <strong style={{ color: '#f6a000' }}>Adviser</strong>
          </a>
          <ul className="dropdown-menu text-small shadow">
            <li>
              <button className="dropdown-item" onClick={handleLogout}>
                Salir de sesión
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="p-4" style={{ backgroundColor: '#e8caaa', width: '100%' }}>
        <h1 className="mb-4" style={{ color: '#bf592b' }}>Caninos Disponibles</h1>
        <table className="table table-striped table-hover">
          <thead>
            <tr style={{ color: '#f6a000' }}>
              <th>ID</th>
              <th>Nombre</th>
              <th>Raza</th>
              <th>Edad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {canines.map((canine) => (
              <tr key={canine.id}>
                <td>{canine.id}</td>
                <td>{canine.name}</td>
                <td>{canine.breed}</td>
                <td>{canine.age}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => openModal('update', canine)}>Editar</button>
                  <button className="btn btn-sm btn-danger" onClick={() => openModal('delete', canine)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{modalType === 'add' ? 'Agregar' : modalType === 'update' ? 'Actualizar' : 'Eliminar'} Canino</h3>
            {modalType !== 'delete' && (
              <>
                <input
                  type="text"
                  placeholder="Nombre"
                  value={formCanine.name}
                  onChange={(e) => setFormCanine({ ...formCanine, name: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Raza"
                  value={formCanine.breed}
                  onChange={(e) => setFormCanine({ ...formCanine, breed: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Edad"
                  value={formCanine.age}
                  onChange={(e) => setFormCanine({ ...formCanine, age: e.target.value })}
                />
              </>
            )}
            {modalType === 'delete' && <p>¿Seguro que quieres eliminar a {selectedCanine?.name}?</p>}
            <button onClick={modalType === 'add' ? handleAddCanine : modalType === 'update' ? handleUpdateCanine : handleDeleteCanine} className="btn-add">
              Confirmar
            </button>
            <button onClick={closeModal} className="btn-cancel">
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdviserView;

