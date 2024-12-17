import React, { useEffect, useState } from 'react';
import './AdviserView.css';
import { useNavigate } from 'react-router-dom';
import { logoutAdviser, registerCan, getCanes } from '../services/authRoutes';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const AdviserView: React.FC = () => {
  
  interface Caninebd {
    id: number;
    picture: string;
    age: number;
    race: string;
    pedigree: string;
    gender: string;
    color: string;
    vaccines: boolean;
    price: number;
  }
  const navigate = useNavigate();

  const [caninesbd, setCaninesbd] = useState<Caninebd[]>([]);

  const [selectedCanine, setSelectedCanine] = useState<Caninebd | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'update' | 'delete'>('add');
  const [formCanine, setFormCanine] = useState({
    age: '', picture: '', race: '', pedigree: '', gender: '', color: '', vaccines: false, price: ''
  });
  /*
  "picture",
  "age",
  "race",
  "pedigree",
  "gender",
  "color",
  "vaccines",
  "price"
  */
  const handleLogout = async () => {
    try {
      const response = await logoutAdviser();
      if (response.status !== 'ok') throw new Error('Error logging out');
    } catch (error) {
      console.error('Error logging out:', error);
    }
    navigate('/adv/login');
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const csrftoken = sessionStorage.getItem('csrftoken') || '';
        console.log('csrftoken:', csrftoken);

        if (!csrftoken) {
          navigate('/adv/login');
          return;
        }

        const response = await getCanes();
        console.log('response:', response);
        setCaninesbd(response.canines);

      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  const handleAddCanine = async() => {

    try {
      console.log('formCanine:', formCanine);
      const response = await registerCan({
        picture: formCanine.picture,
        age: parseInt(formCanine.age, 10),
        race: formCanine.race,
        pedigree: formCanine.pedigree,
        gender: formCanine.gender,
        color: formCanine.color,
        vaccines: formCanine.vaccines,
        price: parseFloat(formCanine.price),
      });
      if (response.status !== 200){
        alert(response.response.data.error);
        return;
      }
      console.log('response:', response);
      setCaninesbd([...caninesbd, response.newCanine]);
      closeModal();
      alert('Canino registrado exitosamente');
    }
    catch (error) {
      console.error('Error registering canine:', error);
    }
  };

  const handleUpdateCanine = () => {
    if (selectedCanine) {
      const updatedCanines = caninesbd.map((canine) =>
        canine.id  === selectedCanine.id
          ? { ...canine, ...formCanine, age: parseInt(formCanine.age, 10), price: parseFloat(formCanine.price) }
          : canine
      );
      setCaninesbd(updatedCanines);
      closeModal();
    }
  };

  const handleDeleteCanine = () => {
    if (selectedCanine) {
      const updatedCanines = caninesbd.filter((canine) => canine.id !== selectedCanine.id);
      setCaninesbd(updatedCanines);
      closeModal();
    }
  };

  const openModal = (type: 'add' | 'update' | 'delete', canine?: Caninebd) => {
    setModalType(type);
    if (canine) {
      setSelectedCanine(canine);
      setFormCanine({
        age: String(canine.age),
        picture: canine.picture,
        race: canine.race,
        pedigree: canine.pedigree,
        gender: canine.gender,
        color: canine.color,
        vaccines: canine.vaccines,
        price: String(canine.price),
      });
    } else {
      setSelectedCanine(null);
      setFormCanine({
       age: '', picture: '', race: '', pedigree: '', gender: '', color: '', vaccines: false, price: ''
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCanine(null);
    setFormCanine({
      age: '', picture: '', race: '', pedigree: '', gender: '', color: '', vaccines: false, price: ''
    });
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
              <th>Edad</th>
              <th>Género</th>
              <th>Color</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody> 
            {caninesbd.map((canine) => (
              <tr key={canine.id}>
                <td>{canine.id}</td>
                <td>{canine.age}</td>
                <td>{canine.gender}</td>
                <td>{canine.color}</td> 
                <td>{canine.price}</td>
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
                  placeholder="Edad"
                  value={formCanine.age}
                  onChange={(e) => setFormCanine({ ...formCanine, age: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Imagen"
                  value={formCanine.picture}
                  onChange={(e) => setFormCanine({ ...formCanine, picture: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Raza"
                  value={formCanine.race}
                  onChange={(e) => setFormCanine({ ...formCanine, race: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Pedigree"
                  value={formCanine.pedigree}
                  onChange={(e) => setFormCanine({ ...formCanine, pedigree: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Género"
                  value={formCanine.gender}
                  onChange={(e) => setFormCanine({ ...formCanine, gender: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Color"
                  value={formCanine.color}
                  onChange={(e) => setFormCanine({ ...formCanine, color: e.target.value })}
                />
                <label>
                  Vacunas
                  <input
                    type="checkbox"
                    checked={formCanine.vaccines}
                    onChange={(e) => setFormCanine({ ...formCanine, vaccines: e.target.checked })}
                  />
                </label>
                <input
                  type="text"
                  placeholder="Precio"
                  value={formCanine.price}
                  onChange={(e) => setFormCanine({ ...formCanine, price: e.target.value })}
                />
              </>
            )}
            {modalType === 'delete' && <p>¿Seguro que quieres eliminar?</p>}
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

