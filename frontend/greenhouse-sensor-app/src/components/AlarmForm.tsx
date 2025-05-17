import type { ChangeEvent } from 'react';
import styles from './AlarmForm.module.css';

interface AlarmFormProps {
  newAlarm: { type: string; threshold: number; sensorId: string };
  onChange: (newAlarm: { type: string; threshold: number; sensorId: string }) => void;
  onAdd: () => void;
  sensors: Array<{ id: number; name: string; type: string; location: string; status: string }>;
  disabled: boolean;
}

const AlarmForm = ({ newAlarm, onChange, onAdd, sensors, disabled }: AlarmFormProps) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({ ...newAlarm, [name]: name === 'threshold' ? parseFloat(value) : value });
  };

  return (
    <div className={styles.alarmForm}>
      <div className={styles.field}>
        <label htmlFor="type">Type</label>
        <select
          id="type"
          name="type"
          value={newAlarm.type}
          onChange={handleInputChange}
          disabled={disabled}
        >
          <option value="temperature">Temperature</option>
          <option value="humidity">Humidity</option>
          <option value="light">Light</option>
        </select>
      </div>
      <div className={styles.field}>
        <label htmlFor="sensorId">Sensor</label>
        <select
          id="sensorId"
          name="sensorId"
          value={newAlarm.sensorId}
          onChange={handleInputChange}
          disabled={disabled || sensors.length === 0}
        >
          <option value="">Select a sensor</option>
          {sensors.map(sensor => (
            <option key={sensor.id} value={sensor.id}>
              {sensor.name} ({sensor.location}, {sensor.type})
            </option>
          ))}
        </select>
      </div>
      <div className={styles.field}>
        <label htmlFor="threshold">Threshold</label>
        <input
          type="number"
          id="threshold"
          name="threshold"
          value={newAlarm.threshold}
          onChange={handleInputChange}
          step="0.1"
          required
          disabled={disabled}
        />
      </div>
      <button
        type="button"
        onClick={onAdd}
        disabled={disabled || !newAlarm.sensorId}
        className={styles.button}
      >
        Add Alarm
      </button>
    </div>
  );
};

export default AlarmForm;