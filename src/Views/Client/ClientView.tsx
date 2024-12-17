import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./ClientView.css";
import { getUserById, logoutUser, getCans } from '../services/authRoutes';

interface Canine {
  id: number;
  name: string;
  race: string;
  age: number;
  gender: string;
  color: string;  
  picture: string;  
  price: number;  
}

const ClientView: React.FC = () => {
  const location = useLocation();
  const [showInfo, setShowInfo] = useState(false);
  const [showCatalog, setShowCatalog] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBreed, setSelectedBreed] = useState("All");
  const [selectedAge, setSelectedAge] = useState("All");
  const [tempBreed, setTempBreed] = useState("All");
  const [tempAge, setTempAge] = useState("All");
  const [contentMarginTop, setContentMarginTop] = useState(0);

  const itemsPerPage = 4;
  const [canines, setCanines] = useState<Canine[]>([]);

  const [userData, setUserData] = useState({
    username: '',
    email: '',
    phone: '',
    address: '',
  });

  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const session = JSON.parse(sessionStorage.getItem('user') || '{}');
        console.log("User Session:", session);
        const response = await getUserById(session.user.id);
        console.log('User', response);
        if (response.status === 'ok') {
          setUserData(response.user); 
        } else {
          console.error('Error to obtain user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);


  useEffect(() => {
    const fetchCanines = async () => {
      try {
        const data = await getCans(); 
        if (data.canines && Array.isArray(data.canines)) {
          setCanines(data.canines); 
        } else {
          console.error("Error: Canines data is not an array");
        }
      } catch (error) {
        console.error("Error fetching canines:", error);
      }
    };
  
    fetchCanines();
  }, []);

  const handleLogout = async () => {
    try {
      const result = await logoutUser();
      if (result.status === 'ok') {
        sessionStorage.clear(); 
        window.location.href = '/login'; 
      } else {
        alert('Logout error ' + result.message);
      }
    } catch (error) {
      console.error('Logout error', error);
    }
  };

  useEffect(() => {
    const navbar = document.querySelector(".navbar");
    if (navbar) {
      setContentMarginTop(navbar.clientHeight);
    }
  }, []);

  const toggleShowInfo = () => {
    setShowInfo(true);
    setShowCatalog(false);
  };

  const toggleShowCatalog = () => {
    setShowCatalog(true);
    setShowInfo(false);
  };

  const handleTempBreedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTempBreed(e.target.value);
  };

  const handleTempAgeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTempAge(e.target.value);
  };

  const applyFilters = () => {
    setSelectedBreed(tempBreed);
    setSelectedAge(tempAge);
    setCurrentPage(1);
  };

  const filteredCanines = canines.filter((canine) => {
    const breedMatch = selectedBreed === "All" || canine.race === selectedBreed;
    const ageMatch = selectedAge === "All" || canine.age === parseInt(selectedAge);
    return breedMatch && ageMatch;
  });

  const totalPages = Math.ceil(filteredCanines.length / itemsPerPage);
  const displayedCanines = filteredCanines.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleAdopt = (name: string) => {
    alert(`Has adoptado a ${name}. ¡Felicidades!`);
  };

  const handleMoreInfo = (name: string) => {
    alert(`Más información sobre ${name}.`);
  };

  return (
    <>
      <div className="client-container" style={{ marginTop: contentMarginTop }}>
        <nav className="navbar navbar-expand-lg navbar-light bg-light w-100 fixed-top">
          <div className="container-fluid">
            <a className="icon-style"> Durazno </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                  <button className="nav-link" onClick={toggleShowCatalog}>
                    Catálogo
                  </button>
                </li>
                <li className="nav-item">
                  <button className="nav-link">Carrito de compras</button>
                </li>
                <li className="nav-item">
                  <button className="nav-link">Atención al cliente</button>
                </li>
              </ul>
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Tu cuenta
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#" onClick={toggleShowInfo}>
                        Ver cuenta
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#" onClick={handleLogout}>
                        Salir de sesión
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
  
        {showInfo && (
          <div className="info-container">
            <h2>Información de la Cuenta</h2>
            <p>
              <strong>Nombre de Usuario:</strong> {userData.username || "No disponible"}
            </p>
            <p>
              <strong>Email:</strong> {userData.email || "No disponible"}
            </p>
            <p>
              <strong>Teléfono:</strong> {userData.phone || "No disponible"}
            </p>
            <p>
              <strong>Dirección:</strong> {userData.address || "No disponible"}
            </p>
          </div>
        )}
  
        {showCatalog && (
          <div className="container mt-5">
            <h2 className="text-center mb-4">Catálogo de Caninos</h2>
  
            <div className="row mb-4">
              <div className="col-md-6">
                <label className="form-label">Filtrar por Raza</label>
                <select
                  className="form-select"
                  value={tempBreed}
                  onChange={handleTempBreedChange}
                >
                  <option value="All">Todas</option>
                  {[...new Set(canines.map((c) => c.race))].map((breed) => (
                    <option key={breed} value={breed}>
                      {breed}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Filtrar por Edad</label>
                <select
                  className="form-select"
                  value={tempAge}
                  onChange={handleTempAgeChange}
                >
                  <option value="All">Todas</option>
                  {[...new Set(canines.map((c) => c.age))].map((age) => (
                    <option key={age} value={age}>
                      {age}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12 text-center mt-3">
                <button className="btn btn-primary" onClick={applyFilters}>
                  Aplicar filtros
                </button>
              </div>
            </div>
  
            <div className="row">
              {displayedCanines.map((canine) => (
                <div key={canine.id} className="col-md-4 mb-4">
                  <div className="card">
                    <img
                      src={canine.picture}
                      alt={canine.race}
                      className="card-img-top"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{canine.name}</h5>
                      <p>Raza: {canine.race}</p>
                      <p>Edad: {canine.age} años</p>
                      <p>Género: {canine.gender}</p>
                      <p>Color: {canine.color}</p>
                      <p>Precio: ${canine.price}</p>
                      <button className="btn btn-primary" onClick={() => handleAdopt(canine.name)}>
                        Adoptar
                      </button>
                      <button className="btn btn-info ms-2" onClick={() => handleMoreInfo(canine.name)}>
                        Más Información
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
  
            <nav>
              <ul className="pagination justify-content-center">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <li
                    key={index}
                    className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                  >
                    <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </>
  );
}
export default ClientView;






