import Select from './Select';
import NumberInput from './NumberInput';
import Button from './Button';
import Label from './Label';
import styles from './AlarmForm.module.css';

interface AlarmFormProps {
  newAlarm: { type: string; threshold: number };
  onChange: (alarm: { type: string; threshold: number }) => void;
  onAdd: () => void;
}

const AlarmForm = ({ newAlarm, onChange, onAdd }: AlarmFormProps) => {
  const options = [
    { value: 'temperature', label: 'Temperature' },
    { value: 'humidity', label: 'Humidity' },
  ];

  return (
    <div className={styles.alarmForm}>
      <div className={styles.field}>
        <Label htmlFor="alarm-type">Alarm Type</Label>
        <Select
          value={newAlarm.type}
          onChange={(value) => onChange({ ...newAlarm, type: value })}
          options={options}
          id="alarm-type"
        />
      </div>
      <div className={styles.field}>
        <Label htmlFor="alarm-threshold">Umbral</Label>
        <NumberInput
          value={newAlarm.threshold}
          onChange={(value) => onChange({ ...newAlarm, threshold: value })}
          id="alarm-threshold"
          placeholder="Umbral"
        />
      </div>
      <div className={styles.buttonContainer}>
        <Button onClick={onAdd}>Add Alarm</Button>
      </div>
    </div>
  );
};

export default AlarmForm;