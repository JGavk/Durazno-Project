import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdviser } from '../../services/authRoutes';

const AdviserLogin: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        
        
        let valid = true;
        
        if (!validateEmail(email)) {
            setEmailError('Invalid email address');
            valid = false;
        } else {
            setEmailError('');
        }
        
        if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters');
            valid = false;
        } else {
            setPasswordError('');
        }
        
        if (valid) {
            try {
                const response: any = await loginAdviser({
                    email,
                    password,
                });
                if (response.message == "Login successful") {
                    navigate('/adviser');
                    console.log("Logged In");
                } else {
                    alert(response.response.data.message || 'Login error');
                }
            } catch (error) {
                console.error('Login error:', error);
                alert('Login error, try again.');
            }
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '1rem' }}>
            <h1>Adviser Login</h1>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }}
                    />
                    {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }}
                    />
                    {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                </div>
                <button type="submit" style={{ width: '100%', padding: '0.5rem', backgroundColor: 'blue', color: 'white', border: 'none' }}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default AdviserLogin;
