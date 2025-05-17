import { useState } from 'react';
import TextInput from '../components/TextInput';
import Label from '../components/Label';
import styles from './RegisterSensorPage.module.css';
import SensorForm from '../components/SensorForm';

interface SensorData {
  name: string;
  // Otros campos...
}

const RegisterSensorForm = () => {
  const [sensorData, setSensorData] = useState<SensorData>({ name: '' });

  return (
    <div className={styles.form}>
      <div className={styles.field}>
        <SensorForm/>
      </div>
    </div>
  );
};

export default RegisterSensorForm;