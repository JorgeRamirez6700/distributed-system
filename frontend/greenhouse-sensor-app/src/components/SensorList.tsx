import type { Sensor } from '../types';
import './SensorList.module.css';

interface SensorListProps {
  sensors: Sensor[];
}

const SensorList = ({ sensors }: SensorListProps) => {
  return (
    <div className="sensor-grid">
      {sensors.map((sensor) => (
        <div key={sensor.id} className="sensor-card">
          <h3>{sensor.name}</h3>
          <p>Tipo: {sensor.type === 'temperature' ? 'Temperatura' : 'Humedad'}</p>
          <p>Ubicación: {sensor.location}</p>
          <div className={`status-indicator ${sensor.status}`}>
            {sensor.status === 'active' ? 'Activo' : 'Inactivo'}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SensorList;