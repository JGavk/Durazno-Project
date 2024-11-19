import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './LandingPage.css';
import { getUsers } from '../services/authRoutes';

const LandingPage: React.FC = () => {
    const navigate = useNavigate(); // Crear el hook de navegación
    const [activeSection, setActiveSection] = useState('quienes-somos');

    const handleScrollToSection = (sectionId: string) => {
        setActiveSection(sectionId);
    };

    // Redirigir al login cuando el usuario haga click en "Inicia sesión"
    const handleLoginClick = () => {
        navigate('/login');
    };

    // Redirigir al login cuando el usuario haga click en "Regístrate"
    const handleRegisterClick = () => {
        navigate('/login');
    };

    useEffect(() => {
        getUsers().then(data => {
            console.log(data);
        });
    }, []);

    return (
        <div className="landing-container">
            <div className="menu-bar">
                <button 
                    className={activeSection === 'quienes-somos' ? 'active' : ''}
                    onClick={() => handleScrollToSection('quienes-somos')}
                >
                    Quienes somos
                </button>
                <button 
                    className={activeSection === 'clientes-felices' ? 'active' : ''}
                    onClick={() => handleScrollToSection('clientes-felices')}
                >
                    Clientes felices
                </button>
                {/* Redirige al login al hacer clic en este botón */}
                <button onClick={handleLoginClick}>Inicia sesión</button>
            </div>

            <div className="scroll-content">
                {activeSection === 'quienes-somos' && (
                    <section id="quienes-somos">
                        <h1>Durazno</h1>
                        <p>
                            En Durazno, somos una empresa líder en Colombia dedicada a la venta de caninos de alta calidad. ...
                        </p>
                        <button className="register-button" onClick={handleRegisterClick}>
                            Inicia Sesión
                        </button>
                    </section>
                )}

                {activeSection === 'clientes-felices' && (
                    <section id="clientes-felices">
                        <h1>Clientes felices</h1>
                        <p>Nuestros clientes son nuestra mayor satisfacción...</p>
                    </section>
                )}
            </div>
        </div>
    );
};

export default LandingPage;
