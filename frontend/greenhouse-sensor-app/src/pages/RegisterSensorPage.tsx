import { useState } from 'react';
import TextInput from '../components/TextInput';
import Label from '../components/Label';
import styles from './RegisterSensorPage.module.css';

interface SensorData {
  name: string;
  // Otros campos...
}

const RegisterSensorForm = () => {
  const [sensorData, setSensorData] = useState<SensorData>({ name: '' });

  return (
    <div className={styles.form}>
      <div className={styles.field}>
        <Label htmlFor="sensor-name">Sensor Name</Label>
        <TextInput
          id="sensor-name"
          value={sensorData.name}
          onChange={(value) => setSensorData({ ...sensorData, name: value })}
          placeholder="Ej: Sensor Temp 1"
          required
        />
      </div>
    </div>
  );
};

export default RegisterSensorForm;