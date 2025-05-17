import { useState, useEffect } from 'react';
import SensorList from '../components/SensorList';
import apiClient from '../api/apiClient';
import type { Sensor } from '../types';

const HomePage = () => {
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSensors = async () => {
      try {
        const response = await apiClient.get('/api/sensors');
        setSensors(response.data.data);
      } catch (err: any) {
        setError('Error al cargar sensores');
      }
    };
    fetchSensors();
  }, []);

  return (
    <div className="page-container">
      <h1>Sensors Monitoring</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <SensorList sensors={sensors} />
    </div>
  );
};

export default HomePage;