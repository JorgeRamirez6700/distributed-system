import { useState } from 'react';
import SensorList from '../components/SensorList';
import type { Sensor } from '../types';

const HomePage = () => {
  // Ejemplo de datos (deberías obtenerlos de tu estado o API)
  const [sensors] = useState<Sensor[]>([
    {
      id: '1',
      name: 'Sensor Terraza',
      type: 'temperature',
      location: 'Terraza Principal',
      status: 'active'
    }
  ]);

  return (
    <div className="page-container">
      <h1>Sensors Monitoring</h1>
      <SensorList sensors={sensors} />
    </div>
  );
};

export default HomePage;