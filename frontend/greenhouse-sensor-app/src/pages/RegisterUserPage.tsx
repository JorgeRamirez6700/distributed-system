import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextInput from '../components/TextInput';

const RegisterUserPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      alert(`Registered User(Simulado):\nEmail: ${email}`);
    
      setEmail('');
      setPassword('');
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: '1rem', border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Register a new user</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email" style={{ display: 'block', marginBottom: 6 }}>
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ width: '100%', padding: 8, marginBottom: 12 }}
          required
        />

        <label htmlFor="password" style={{ display: 'block', marginBottom: 6 }}>
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ width: '100%', padding: 8, marginBottom: 12 }}
          required
        />

        <button type="submit" style={{ padding: '8px 16px' }}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default RegisterUserPage;