// components/SensorForm.tsx
import { useState } from 'react';
import Button from './Button';
import Label from './Label';
import TextInput from './TextInput';
const SensorForm = () => {
  const [sensorData, setSensorData] = useState({
    name: '',
    type: 'temperature',
    location: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para registrar el sensor
    console.log('Sensor registrado:', sensorData);
  };

  return (
    <form onSubmit={handleSubmit} className="sensor-form">
      <Label htmlFor="sensor-name">
        Nombre del Sensor:
        <TextInput
        id="sensor-name"
        value={sensorData.name}
        onChange={(value) => setSensorData({ ...sensorData, name: value })}
        placeholder="Ej: Sensor Temp 1"
        required
        >
          
        </TextInput>
      </Label>
      
      <label>
        Tipo:
        <select 
          value={sensorData.type}
          onChange={(e) => setSensorData({...sensorData, type: e.target.value})}
        >
          <option value="temperature">Temperatura</option>
          <option value="humidity">Humedad</option>
        </select>
      </label>
      
      <label>
        Ubicación:
        <input 
          type="text" 
          value={sensorData.location}
          onChange={(e) => setSensorData({...sensorData, location: e.target.value})}
        />
      </label>
      
      <button type="submit">Registrar Sensor</button>
    </form>
  );
};
export default SensorForm;