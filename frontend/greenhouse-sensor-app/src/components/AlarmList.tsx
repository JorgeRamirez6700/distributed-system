import AlarmItem from './AlarmItem';
import styles from './AlarmList.module.css';

interface AlarmListProps {
  alarms: { id: number; type: string; threshold: number }[];
  onDelete: (id: number) => void;
}

const AlarmList = ({ alarms, onDelete }: AlarmListProps) => {
  return (
    <div className={styles.alarmsList}>
      {alarms.length === 0 ? (
        <p className={styles.emptyState}>No hay alarmas configuradas.</p>
      ) : (
        alarms.map((alarm) => (
          <AlarmItem key={alarm.id} alarm={alarm} onDelete={onDelete} />
        ))
      )}
    </div>
  );
};

export default AlarmList;