/*import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'*/
import { useState } from 'react';
import './LoginView.css';
import { loginUser } from '../services/authRoutes';
import { useNavigate } from 'react-router-dom';

function LoginView() {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate(); 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response: any = await loginUser({
        email: formData.email,
        password: formData.password,
        
      });
      console.log(response);
      if (response.status === 'ok') {
        alert('Inicio de sesión exitoso');
  
        navigate('/client'); 
      } else {
        alert(response.response.data.message || 'Login error');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login error, try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className= "logo logo-login"></div>
        <div className="header">
          <h2 className= "title-login">Iniciar sesión</h2>
        </div>

        <form className="form-login" onSubmit={handleLogin}  autoComplete="off">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="yeimc@gmail.com"
            required
          />
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="******"
            required
          />
          <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>
          <button type="submit">Iniciar sesión</button>
        </form>
        <p className= 'login-text'>
              ¿No tienes cuenta? <a href='/Durazno-Project/register'>Regístrate aquí</a>
              <br />
              ¿Eres Asesor <a href='adv/login'>Inicia sesión aquí</a>
        </p>
      </div>
    </div>
  );
}

export default LoginView;
