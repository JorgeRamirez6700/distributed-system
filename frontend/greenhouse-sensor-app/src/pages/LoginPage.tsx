import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextInput from '../components/TextInput';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      console.log('Login attempt:', { email, password });
      alert('Inicio de sesión exitoso (simulado)');
      navigate('/');
    } else {
      alert('Por favor, completa todos los campos');
    }
  };

  return (
    <div className="page-container">
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label
              htmlFor="email"
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '500',
              }}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label
              htmlFor="password"
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '500',
              }}
            >
              Password
            </label>
            <TextInput 
              value={password} 
              onChange={setPassword}
              required
              id='password'
              placeholder='Password'
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;