import Button from './Button';
import styles from './AlarmItem.module.css';

interface AlarmItemProps {
  alarm: { id: number; type: string; threshold: number };
  onDelete: (id: number) => void;
  disabled: boolean;
}

const AlarmItem = ({ alarm, onDelete }: AlarmItemProps) => {
  return (
    <div className={styles.alarmItem}>
      <span>{alarm.type.toUpperCase()}: {alarm.threshold}</span>
      <Button onClick={() => onDelete(alarm.id)}>
        Delete
      </Button>
    </div>
  );
};

export default AlarmItem;