import React, { useState, useEffect } from 'react';
import './LandingPage.css';
import LoginView from '../Login/LoginView';
import { getUser } from '../services/authRoutes';

const LandingPage: React.FC = () => {
    const [activeSection, setActiveSection] = useState('quienes-somos');

    const handleScrollToSection = (sectionId: string) => {
        setActiveSection(sectionId);
    };

    useEffect (() => {
        getUser().then(data => {
            console.log(data)
        })
    }, [])

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
                <button 
                    className={activeSection === 'login' ? 'active' : ''}
                    onClick={() => handleScrollToSection('login')}
                >
                    Inicia sesión
                </button>
            </div>

            <div className="scroll-content">
                {activeSection === 'quienes-somos' && (
                    <section id="quienes-somos">
                        <h1>Durazno</h1>
                        <p>
                        En Durazno, somos una empresa líder en Colombia dedicada a la venta de caninos de alta calidad. Nos especializamos en ofrecer perros de pedigree y razas cruzadas seleccionadas con los más altos estándares. Nuestro objetivo es conectar a los amantes de los perros con compañeros de vida saludables, felices y de excelente linaje. Con años de experiencia en el mercado, nos enorgullece ser una empresa que prioriza el bienestar de los animales y la satisfacción de nuestros clientes. Desde cachorros hasta perros adultos, en Durazno contamos con un amplio catálogo que se adapta a las preferencias de cada familia, ofreciéndoles una gran variedad de razas y edades. Al registrarte, tendrás acceso exclusivo a nuestro catálogo, donde podrás explorar cada raza en detalle, conocer la historia de cada perro y elegir el compañero perfecto para ti. Nuestro equipo está comprometido con la transparencia y la calidad, por lo que garantizamos que cada uno de nuestros caninos ha sido criado y cuidado con el mayor respeto y cariño. Únete a nuestra comunidad y descubre el mundo de Durazno. Dale clic al botón de abajo y comienza el proceso para encontrar a tu nuevo mejor amigo. ¡Te esperamos con la familia perruna que siempre has soñado!
                        </p>
                        <button className="register-button">Regístrate</button>
                    </section>
                )}

                {activeSection === 'clientes-felices' && (
                    <section id="clientes-felices">
                        <h1>Clientes felices</h1>
                        <p>Nuestros clientes son nuestra mayor satisfacción...</p>
                    </section>
                )}

                {activeSection === 'login' && (
                    <section id="login">
                        <LoginView />
                    </section>
                )}
            </div>
        </div>
    );
};

export default LandingPage;