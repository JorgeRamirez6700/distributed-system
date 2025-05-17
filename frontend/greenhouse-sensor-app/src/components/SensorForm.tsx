import { useState } from 'react';
import apiClient from '../api/apiClient';
import styles from './SensorForm.module.css';

interface SensorData {
  name: string;
  type: string;
  location: string;
  status: string;
}

const SensorForm = () => {
  const [sensorData, setSensorData] = useState<SensorData>({
    name: '',
    type: 'temperature',
    location: '',
    status: 'active',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Basic validation
    if (!sensorData.name || !sensorData.location) {
      setError('Por favor, completa todos los campos requeridos');
      setLoading(false);
      return;
    }

    try {
      const response = await apiClient.post('/api/sensors', sensorData);
      setSuccess('Sensor register successfully');
      setSensorData({ name: '', type: 'temperature', location: '', status: 'active' });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error registering sensor');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSensorData({ ...sensorData, [name]: value });
  };

  return (
 <div className={styles.container}>
  <h2 className={styles.title}>Sensor Register</h2>
  {error && <p className={`${styles.message} ${styles.errorMessage}`}>{error}</p>}
  {success && <p className={`${styles.message} ${styles.successMessage}`}>{success}</p>}
  <form onSubmit={handleSubmit} className="space-y-4">
    <div className={styles.formGroup}>
      <label htmlFor="name" className={styles.label}>Sensor Name</label>
      <input
        id="name"
        name="name"
        type="text"
        value={sensorData.name}
        onChange={handleInputChange}
        placeholder="Sensor Temp 1"
        required
        className={styles.input}
      />
    </div>
    <div className={styles.formGroup}>
      <label htmlFor="type" className={styles.label}>Tipo</label>
      <select
        id="type"
        name="type"
        value={sensorData.type}
        onChange={handleInputChange}
        className={styles.select}
      >
        <option value="temperature">Temperature</option>
        <option value="humidity">Humidity</option>
        <option value="light">Light</option>
      </select>
    </div>
    <div className={styles.formGroup}>
      <label htmlFor="location" className={styles.label}>Ubication</label>
      <input
        id="location"
        name="location"
        type="text"
        value={sensorData.location}
        onChange={handleInputChange}
        placeholder="Front Yard"
        required
        className={styles.input}
      />
    </div>
    <div className={styles.formGroup}>
      <label htmlFor="status" className={styles.label}>Status</label>
      <select
        id="status"
        name="status"
        value={sensorData.status}
        onChange={handleInputChange}
        className={styles.select}
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>
    <button
      type="submit"
      disabled={loading}
      className={styles.button}
    >
      {loading ? 'Registering...' : 'Register Sensor'}
    </button>
  </form>
</div>
  );
};

export default SensorForm;