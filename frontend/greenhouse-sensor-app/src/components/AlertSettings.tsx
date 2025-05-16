import { useState } from 'react';
import type { Alarm } from '../types';

interface AlarmSettingsProps {
  alarms: Alarm[];
  onAdd: (alarm: Alarm) => void;
  onDelete: (id: string) => void;
}

const AlarmSettings = ({ alarms, onAdd, onDelete }: AlarmSettingsProps) => {
  const [newAlarm, setNewAlarm] = useState<Omit<Alarm, 'id'>>({
    type: 'temperature',
    threshold: 0,
    condition: 'greater'
  });

  const handleAdd = () => {
    onAdd({ ...newAlarm, id: Date.now().toString() });
    setNewAlarm({ ...newAlarm, threshold: 0 });
  };

  return (
    <div className="alarm-settings">
      <div className="alarm-form">
        <select
          value={newAlarm.type}
          onChange={(e) => setNewAlarm({ ...newAlarm, type: e.target.value as Alarm['type'] })}
        >
          <option value="temperature">Temperatura</option>
          <option value="humidity">Humedad</option>
        </select>

        <select
          value={newAlarm.condition}
          onChange={(e) => setNewAlarm({ ...newAlarm, condition: e.target.value as Alarm['condition'] })}
        >
          <option value="greater">Mayor que</option>
          <option value="less">Menor que</option>
        </select>

        <input
          type="number"
          value={newAlarm.threshold}
          onChange={(e) => setNewAlarm({ ...newAlarm, threshold: Number(e.target.value) })}
        />

        <button onClick={handleAdd} className="add-btn">
          Agregar Alarma
        </button>
      </div>

      <div className="alarms-list">
        {alarms.map((alarm) => (
          <div key={alarm.id} className="alarm-item">
            <span>
              {alarm.type.toUpperCase()} - Alerta cuando {alarm.condition === 'greater' ? '>' : '<'} {alarm.threshold}
              {alarm.type === 'temperature' ? '°C' : '%'}
            </span>
            <button onClick={() => onDelete(alarm.id)} className="delete-btn">
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlarmSettings;