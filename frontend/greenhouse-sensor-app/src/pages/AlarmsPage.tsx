import { useState, useEffect } from 'react';
import AlarmForm from '../components/AlarmForm';
import AlarmList from '../components/AlarmList';
import apiClient from '../api/apiClient';
import styles from './AlarmsPage.module.css';

type Alarm = {
  id: number;
  type: string;
  threshold: number;
  sensorId: number;
};

type Sensor = {
  id: number;
  name: string;
  type: string;
  location: string;
  status: string;
};

const AlarmsPage = () => {
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [newAlarm, setNewAlarm] = useState({
    type: 'temperature',
    threshold: 0,
    sensorId: '',
  });
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Por favor, inicia sesión para ver los sensores');
          return;
        }

        const [sensorsResponse, alarmsResponse] = await Promise.all([
          apiClient.get('/api/sensors'),
          apiClient.get('/api/alarms'),
        ]);

        const sensorsData = sensorsResponse.data.data || [];
        const alarmsData = alarmsResponse.data.data || [];

        setSensors(sensorsData);
        setAlarms(alarmsData);

        if (!sensorsData.length) {
          setError('No sensors found. Please, register a sensor first.');
        }
      } catch (err: any) {
        console.error('Fetch error:', err);
        setError(
          err.response?.status === 403
            ? 'Expired sesssion. Please log in again.'
            : err.response?.data?.message || 'Error al cargar datos'
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddAlarm = async () => {
    setError('');
    setLoading(true);

    if (!newAlarm.sensorId) {
      setError('Please, select a sensor');
      setLoading(false);
      return;
    }

    try {
      const response = await apiClient.post('/api/alarms', {
        ...newAlarm,
        sensorId: parseInt(newAlarm.sensorId),
      });
      setAlarms([...alarms, response.data.data]);
      setNewAlarm({ type: 'temperature', threshold: 0, sensorId: '' });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al crear alarma');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAlarm = async (id: number) => {
    setError('');
    setLoading(true);

    try {
      await apiClient.delete(`/api/alarms/${id}`);
      setAlarms(alarms.filter((a) => a.id !== id));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al eliminar alarma');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <h2 className={styles.title}>Alarms Settings</h2>
        
        {error && <div className={styles.errorMessage}>{error}</div>}
        
        {loading && <div className={styles.loadingMessage}>Cargando...</div>}
        
        {!loading && sensors.length === 0 && (
          <div className={styles.infoMessage}>
            No sensors found. Please, register a sensor first.
          </div>
        )}

        <AlarmForm
          newAlarm={newAlarm}
          onChange={setNewAlarm}
          onAdd={handleAddAlarm}
          sensors={sensors}
        />
        
        <AlarmList 
          alarms={alarms} 
          onDelete={handleDeleteAlarm} 
        />
      </div>
    </div>
  );
};

export default AlarmsPage;