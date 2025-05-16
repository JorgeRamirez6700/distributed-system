import { useState } from 'react';
import AlarmForm from '../components/AlarmForm';
import AlarmList from '../components/AlarmList';
import styles from './AlarmsPage.module.css';

const AlarmsPage = () => {
  const [alarms, setAlarms] = useState([
    { id: 1, type: 'temperature', threshold: 30 },
    { id: 2, type: 'humidity', threshold: 70 },
  ]);

  const [newAlarm, setNewAlarm] = useState({
    type: 'temperature',
    threshold: 0,
  });

  const handleAddAlarm = () => {
    setAlarms([...alarms, { ...newAlarm, id: Date.now() }]);
    setNewAlarm({ type: 'temperature', threshold: 0 });
  };

  const handleDeleteAlarm = (id: number) => {
    setAlarms(alarms.filter((a) => a.id !== id));
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <h2 className={styles.title}>Alarm Settings</h2>
        <AlarmForm
          newAlarm={newAlarm}
          onChange={setNewAlarm}
          onAdd={handleAddAlarm}
        />
        <AlarmList alarms={alarms} onDelete={handleDeleteAlarm} />
      </div>
    </div>
  );
};

export default AlarmsPage;