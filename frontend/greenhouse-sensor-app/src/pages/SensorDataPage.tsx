import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import DataChart from '../components/DataChart';
import apiClient from '../api/apiClient';

const SensorDataPage = () => {
  const [realTimeData, setRealTimeData] = useState<Array<{ timestamp: string; value: number }>>([]);
  const [sensors, setSensors] = useState([]);
  const [selectedSensor, setSelectedSensor] = useState('');

  useEffect(() => {
    const fetchSensors = async () => {
      try {
        const response = await apiClient.get('/api/sensors');
        setSensors(response.data.data);
        if (response.data.data.length > 0) {
          setSelectedSensor(response.data.data[0].id);
        }
      } catch (err) {
        console.error('Error fetching sensors:', err);
      }
    };
    fetchSensors();

    const socket = io('http://localhost:3000');
    socket.on('connect', () => {
      console.log('Connected to WebSocket');
    });

    socket.on('realtimeData', (data) => {
      if (data.sensorId === parseInt(selectedSensor)) {
        setRealTimeData(prev => [...prev.slice(-9), {
          timestamp: new Date(data.timestamp).toLocaleTimeString(),
          value: data.value,
        }]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [selectedSensor]);

  useEffect(() => {
    if (selectedSensor) {
      const socket = io('http://localhost:3000');
      socket.emit('subscribeToSensor', selectedSensor);
      return () => {
        socket.disconnect();
      };
    }
  }, [selectedSensor]);

  return (
    <div className="page-container">
      <h1>Real Time Data</h1>
      <div>
        <label htmlFor="sensor-select">Select Sensor:</label>
        <select
          id="sensor-select"
          value={selectedSensor}
          onChange={(e) => setSelectedSensor(e.target.value)}
        >
          <option value="">Select a sensor</option>
          {sensors.map(sensor => (
            <option key={sensor.id} value={sensor.id}>{sensor.name}</option>
          ))}
        </select>
      </div>
      <DataChart data={realTimeData} type="temperature" />
    </div>
  );
};

export default SensorDataPage;