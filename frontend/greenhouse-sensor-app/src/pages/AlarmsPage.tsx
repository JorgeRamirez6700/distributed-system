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

const AlarmsPage = () => {
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [newAlarm, setNewAlarm] = useState({
    type: 'temperature',
    threshold: 0,
    sensorId: '',
  });
  const [sensors, setSensors] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sensorsResponse, alarmsResponse] = await Promise.all([
          apiClient.get('/api/sensors'),
          apiClient.get('/api/alarms'),
        ]);
        setSensors(sensorsResponse.data.data);
        setAlarms(alarmsResponse.data.data);
      } catch (err: any) {
        setError('Error al cargar datos');
      }
    };
    fetchData();
  }, []);

  const handleAddAlarm = async () => {
    setError('');
    setLoading(true);

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
        <h2 className={styles.title}>Alarm Settings</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <AlarmForm
          newAlarm={newAlarm}
          onChange={setNewAlarm}
          onAdd={handleAddAlarm}
          sensors={sensors}
        />
        <AlarmList alarms={alarms} onDelete={handleDeleteAlarm} />
      </div>
    </div>
  );
};

export default AlarmsPage;