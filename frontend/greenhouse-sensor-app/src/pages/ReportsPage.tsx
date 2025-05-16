// pages/ReportsPage.tsx
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import '../App.css';

const ReportsPage = () => {
  const [selectedReport, setSelectedReport] = useState('temperature');
  
  // Datos de ejemplo
  const tempData = [
    { time: '00:00', value: 22 },
    { time: '04:00', value: 24 },
    { time: '08:00', value: 26 },
    //... más datos
  ];

  const humidityData = [
    { time: '00:00', value: 60 },
    { time: '04:00', value: 65 },
    { time: '08:00', value: 62 },
    //... más datos
  ];

  return (
    <div className="page-container">
      <h2>Reportes</h2>
      <div className="report-selector">
        <button onClick={() => setSelectedReport('temperature')}>Temperatura</button>
        <button onClick={() => setSelectedReport('humidity')}>Humedad</button>
      </div>
      
      <div className="chart-container">
        <LineChart width={800} height={400} data={selectedReport === 'temperature' ? tempData : humidityData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke={selectedReport === 'temperature' ? '#ff7300' : '#0088fe'} />
        </LineChart>
      </div>
    </div>
  );
};

export default ReportsPage;