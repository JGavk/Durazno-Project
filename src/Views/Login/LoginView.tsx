/*import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'*/
import { useState, useEffect } from 'react';
import './LoginView.css';
import { registerUser, loginUser, getOneUser } from '../services/authRoutes';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

function LoginView() {
  const [isLogin, setIsLogin] = useState(true);
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    picture: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
  });
  const navigate = useNavigate(); // Usamos el hook de navegación

  const toggleForm = () => setIsLogin(!isLogin);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

//  const handleRecaptchaChange = (value: string | null) => {
//    setRecaptchaValue(value);
//  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

//    if (!recaptchaValue) {
//      alert('Por favor, completa el CAPTCHA.');
//      return;
//    }
    
    try {
      const response: any = await registerUser({
        picture: '',
        username: formData.username,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        address: formData.address,
        //recaptchaToken: recaptchaValue,
      });
      console.log(response)
      if (response.status == 'ok.') {
        alert(response.message || '?');
        return;
      }
      setShowVerification(true);
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      alert('Hubo un error al registrarse. Por favor, inténtelo de nuevo.');
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response: any = await loginUser({
        email: formData.email,
        password: formData.password,
        
      });

      console.log(response)
      if (response.message || 'User Logged in.') {
        console.log('Inicio de sesión exitoso:', response);
        navigate('/client'); // Redirige al cliente
      } else {
        alert(response.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Hubo un error al iniciar sesión. Por favor, inténtelo de nuevo.');
    }
  };

  const handleVerify = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (verificationCode.length === 4) {
      setIsLogin(true);
      setShowVerification(false);
    } else {
      alert('Por favor, ingrese un código de 4 dígitos');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className={`logo ${isLogin ? 'logo-login' : showVerification ? 'logo-verification' : 'logo-signup'}`}></div>
        <div className="header">
          <h2 className={isLogin ? 'title-login' : 'title-signup'}>
            {isLogin ? 'Iniciar sesión' : showVerification ? '' : 'Regístrate'}
          </h2>
        </div>

        {isLogin ? (
          <form className="form-login" onSubmit={handleLogin} autoComplete="off">
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
        ) : showVerification ? (
          <form className="form-verification" onSubmit={handleVerify} autoComplete="off">
            <label>Ingresa el código de 4 dígitos que hemos enviado a tu correo</label>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              maxLength={4}
              inputMode="numeric"
              pattern="\d*"
              required
            />
            <button type="submit">Verificar</button>
          </form>
        ) : (
          <form className="form-signup" onSubmit={handleSignup} autoComplete="off">
            <label>Nombre de usuario</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Nombre de usuario"
              pattern="[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+"
              maxLength={15}
              required
            />
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="email@ejemplo.com"
              required
            />
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="******"
              minLength={8}
              required
            />
            <label>Confirmar Contraseña</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="******"
              required
            />
            <label>Teléfono</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="1234567890"
              required
            />
            <label>Dirección</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Dirección completa"
              required
            />

            <button type="submit">Registrarse</button>
          </form>
        )}

        <p className={isLogin ? 'login-text' : 'signup-text'}>
          {isLogin ? (
            <>
              ¿No tienes cuenta? <a href="#" onClick={toggleForm}>Regístrate aquí</a>
            </>
          ) : (
            <>
              ¿Ya tienes cuenta? <a href="#" onClick={toggleForm}>Inicia sesión</a>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default LoginView;

