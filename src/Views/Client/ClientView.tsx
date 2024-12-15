import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./ClientView.css";

interface Canine {
  id: number;
  name: string;
  breed: string;
  age: number;
}

const mockCanines: Canine[] = [
  { id: 1, name: "Rex", breed: "German Shepherd", age: 5 },
  { id: 2, name: "Bella", breed: "Labrador Retriever", age: 3 },
  { id: 3, name: "Max", breed: "Bulldog", age: 4 },
  { id: 4, name: "Daisy", breed: "Poodle", age: 2 },
  { id: 5, name: "Charlie", breed: "Beagle", age: 3 },
  { id: 6, name: "Molly", breed: "Golden Retriever", age: 6 },
  { id: 7, name: "Buddy", breed: "Boxer", age: 4 },
  { id: 8, name: "Luna", breed: "Husky", age: 5 },
];

const ClientView: React.FC = () => {
  const location = useLocation();
  const { username, email, phone, address } = location.state || {};

  const [showInfo, setShowInfo] = useState(false);
  const [showCatalog, setShowCatalog] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBreed, setSelectedBreed] = useState("All");
  const [selectedAge, setSelectedAge] = useState("All");
  const [tempBreed, setTempBreed] = useState("All");
  const [tempAge, setTempAge] = useState("All");
  const [contentMarginTop, setContentMarginTop] = useState(0);

  const itemsPerPage = 4;

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

  const filteredCanines = mockCanines.filter((canine) => {
    const breedMatch = selectedBreed === "All" || canine.breed === selectedBreed;
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
          <a className="navbar-brand"> Durazno </a>
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
                <a
                  className={`nav-link ${showCatalog}`}
                  href="#catalog"
                  onClick={toggleShowCatalog}
                >
                  Catálogo
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Carrito de compras
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Atención al cliente
                </a>
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
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={toggleShowInfo}
                    >
                      Ver cuenta
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
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
        <div className="info-container" style={{ marginTop: contentMarginTop }}>
          <h2>Información de la Cuenta</h2>
          <p>
            <strong>Nombre de Usuario:</strong> {username || "No disponible"}
          </p>
          <p>
            <strong>Email:</strong> {email || "No disponible"}
          </p>
          <p>
            <strong>Teléfono:</strong> {phone || "No disponible"}
          </p>
          <p>
            <strong>Dirección:</strong> {address || "No disponible"}
          </p>
        </div>
      )}

      {showCatalog && (
        <div id="catalog" className="container mt-5" style={{ marginTop: contentMarginTop }}>
          <h2 className="text-center mb-4">Catálogo de Caninos</h2>

          <div className="row mb-4">
            <div className="col-md-6">
              <label htmlFor="breedFilter" className="form-label">
                Filtrar por Raza
              </label>
              <select
                id="breedFilter"
                className="form-select"
                value={tempBreed}
                onChange={handleTempBreedChange}
              >
                <option value="All">Todas</option>
                {[...new Set(mockCanines.map((c) => c.breed))].map((breed) => (
                  <option key={breed} value={breed}>
                    {breed}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="ageFilter" className="form-label">
                Filtrar por Edad
              </label>
              <select
                id="ageFilter"
                className="form-select"
                value={tempAge}
                onChange={handleTempAgeChange}
              >
                <option value="All">Todas</option>
                {[...new Set(mockCanines.map((c) => c.age))].map((age) => (
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

          <div className="row justify-content-center">
            {displayedCanines.map((canine) => (
              <div key={canine.id} className="col-md-6 col-lg-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <img
                    src={`https://via.placeholder.com/150?text=${canine.name}`}
                    className="card-img-top"
                    alt={`Imagen de ${canine.name}`}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{canine.name}</h5>
                    <p className="card-text">
                      Este canino es un <strong>{canine.breed}</strong> y tiene{" "}
                      <strong>{canine.age}</strong> años.
                    </p>
                    <div className="card-buttons">
                      <button
                        className="btn btn-primary"
                        onClick={() => handleAdopt(canine.name)}
                      >
                        Adoptar
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={() => handleMoreInfo(canine.name)}
                      >
                        Más información
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pagination-container">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
      </div>
    </>
  );
};

export default ClientView;








