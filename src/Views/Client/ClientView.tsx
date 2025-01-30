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
  const [showCart, setShowCart] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBreed, setSelectedBreed] = useState("All");
  const [selectedAge, setSelectedAge] = useState("All");
  const [tempBreed, setTempBreed] = useState("All");
  const [tempAge, setTempAge] = useState("All");
  const [contentMarginTop, setContentMarginTop] = useState(0);

  const itemsPerPage = 4;
  const [canines, setCanines] = useState<Canine[]>([]);

  const [userData, setUserData] = useState({
    id: '',
    username: '',
    email: '',
    phone: '',
    address: '',
  });

  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const session = JSON.parse(localStorage.getItem('user') || '{}');
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
        localStorage.clear(); 
        window.location.href = '/Durazno-Project/login/'; 
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
    setShowCart(false);
  };

  const toggleShowCatalog = () => {
    setShowCatalog(true);
    setShowInfo(false);
    setShowCart(false);
  };

  const toggleShowCart = () => {
    setShowCart(true);
    setShowCatalog(false);
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

  const handleMoreInfo = (name: string) => {
    alert(`Más información sobre el cachorro.`);
  };

  const handleRemoveFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((canine) => canine.id !== id));
  };
  

  const [cart, setCart] = useState<Canine[]>([]);
  const [adoptedDogs, setAdoptedDogs] = useState<string[]>([]);
  const handleAdopt = (canine: Canine) => {
    setCart((prevCart) => [...prevCart, canine]);
    setCanines((prevCanines) => prevCanines.filter((c) => c.id !== canine.id));
    setAdoptedDogs((prevAdopted) => [...prevAdopted, canine.name]);
    alert(`Has adoptado a un cachorro. ¡Felicidades!`);
  };
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }
  
    const invoice = `
      *** Factura de Adopción ***
      Usuario: ${userData.username || "No disponible"}
      Email: ${userData.email || "No disponible"}
  
      Caninos Adoptados:
      ${cart.map((dog) => `- Cachorro (${dog.race}, ${dog.age} años)`).join("\n")}
  
      Total: $${cart.reduce((total, dog) => total + dog.price, 0)}
    `;
    alert(invoice);
    setCart([]); 
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
                  <button className="nav-link" onClick={toggleShowCart}>
                    Carrito de compras <span className="badge cart-badge">{cart.length}</span>
                  </button>
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
        {adoptedDogs.length > 0 && (
          <div>
            <h3>Caninos Adoptados:</h3>
            <ul>
              {adoptedDogs.map((index) => (
                <li key={index}>Adoptaste a un canino</li>
              ))}
            </ul>
          </div>
        )}
            </p>
          </div>
        )}
        
        {showCart && (
          <div className="container mt-5">
            <h2 className="text-center mb-4">Carrito de Compras</h2>
              {cart.length === 0 ? (
            <p className="text-center">El carrito está vacío.</p>
        ) : (
            <div className="row">
              {cart.map((canine) => (
              <div key={canine.id} className="col-md-4 mb-4">
                <div className="card">
                  <img
                    src={canine.picture}
                    alt={canine.name}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                <div className="card-body">
                <h5 className="card-title">{canine.name}</h5>
                <p>Raza: {canine.race}</p>
                <p>Edad: {canine.age} años</p>
                <p>Precio: ${canine.price}</p>
                <button
                  className="btn btn-danger"
                  onClick={() => handleRemoveFromCart(canine.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
              ))}
          </div>
        )}
        {cart.length > 0 && (
          <div className="text-center mt-4">
            <button className="btn btn-success" onClick={handleCheckout}>
            Comprar Canino(s)
            </button>
          </div>
        )}
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
                      <button className="btn btn-primary" onClick={() => handleAdopt(canine)}>
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




