import { useState } from 'react';
import './RegisterView.css';
import { registerUser } from '../services/authRoutes';
import { useNavigate } from 'react-router-dom';


function SignupView() {
  const [formData, setFormData] = useState({
    picture: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
  });
  const navigate = useNavigate(); 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    
    try {
      const response: any = await registerUser({
        picture: '',
        username: formData.username,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        address: formData.address,
      });
      console.log(response)
      if (response.status == 200) {
        navigate('/');
        return;
      }
      
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      alert('Hubo un error al registrarse. Por favor, inténtelo de nuevo.');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="header">
          <h2 className="title-signup">Regístrate</h2>
        </div>
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
      </div>
    </div>
  );
}

export default SignupView;