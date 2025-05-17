import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient';

const RegisterUserPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('user');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await apiClient.post('/auth/register', { user: email, password, type });
      alert('Usuario registrado exitosamente');
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al registrar usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: '1rem', border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Register a new user</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
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

        <label htmlFor="type" style={{ display: 'block', marginBottom: 6 }}>
          Type:
        </label>
        <select
          id="type"
          value={type}
          onChange={e => setType(e.target.value)}
          style={{ width: '100%', padding: 8, marginBottom: 12 }}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit" style={{ padding: '8px 16px' }} disabled={loading}>
          {loading ? 'Cargando...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default RegisterUserPage;