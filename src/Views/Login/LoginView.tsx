/*import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'*/
import { useState } from 'react';
import './LoginView.css';
import { registerUser} from '../services/authRoutes';

function LoginView() {
  const [isLogin, setIsLogin] = useState(true);
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };



  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = {
      picture: '',
      username: formData.get('username'),
      email: formData.get('email'),
      password: formData.get('password'),
      phone: formData.get('phone'),
      address: formData.get('address'),
    };
    
    var confirmPassword = formData.get('confirmPassword');
  
    try {
      if (userData.password !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return;
      }

      const response = await registerUser(userData);
      console.log(response);
      if (response.success) {
        console.log('User registered:', response.data);
        setShowVerification(true);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Hubo un error al registrarse. Por favor, inténtelo de nuevo.');
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
          <form autoComplete="off">
            <input type="text" style={{ display: 'none' }}/> 
            <label>Email</label>
            <input type="email" placeholder="yeimc@gmail.com" required />
            <label>Contraseña</label>
            <input type="password" placeholder="******" required />
            <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>
            <button type="submit">Iniciar sesión</button>
          </form>
        ) : showVerification ? (
          <form className="form-verification" onSubmit={handleVerify} autoComplete="off">
            <label>Ingresa el código de 4 dígitos que hemos enviado a tu correo</label>
            <input
              type="text"
              value={verificationCode}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setVerificationCode(e.target.value)}
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
              placeholder="Nombre de usuario"
              pattern="[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+"
              title="El nombre de usuario solo debe contener letras"
              required
            />

            <label>Email</label>
            <input type="email" name="email" placeholder="email@ejemplo.com" required />

            <label>Contraseña</label>
            <input type="password" name="password" placeholder="******" required />

            <label>Confirmar Contraseña</label>
            <input type="password" name="confirmPassword" placeholder="******" required />

            <label>Teléfono</label>
            <input
              type="text"
              name="phone"
              placeholder="1234567890"
              pattern="[0-9]{10}"
              title="Formato: 1234567890"
              required
            />

            <label>Dirección</label>
            <input
              type="text"
              name="address"
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