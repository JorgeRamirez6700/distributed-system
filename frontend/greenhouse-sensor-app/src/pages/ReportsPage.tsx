import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import apiClient from '../api/apiClient';
import '../App.css';

const ReportsPage = () => {
  const [selectedReport, setSelectedReport] = useState('temperature');
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await apiClient.get(`/api/reports/type/${selectedReport}`);
        setData(response.data.data.map((report: { timestamp: string | number | Date; value: any; }) => ({
          time: new Date(report.timestamp).toLocaleTimeString(),
          value: report.value,
        })));
      } catch (err) {
        console.error('Error fetching reports:', err);
      }
    };
    fetchReports();
  }, [selectedReport]);

  return (
    <div className="page-container">
      <h2>Reportes</h2>
      <div className="report-selector">
        <button onClick={() => setSelectedReport('temperature')}>Temperatura</button>
        <button onClick={() => setSelectedReport('humidity')}>Humedad</button>
        <button onClick={() => setSelectedReport('light')}>Luz</button>
      </div>
      
      <div className="chart-container">
        <LineChart width={800} height={400} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke={selectedReport === 'temperature' ? '#ff7300' : selectedReport === 'humidity' ? '#0088fe' : '#00ff00'} />
        </LineChart>
      </div>
    </div>
  );
};

export default ReportsPage;